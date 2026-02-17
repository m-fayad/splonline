import Axios from "axios";
import {
  apiUrl,
  isError,
  mainInfo,
  messages,
  PAGES,
  API_KEY,
  socket,
} from "../context/signals";
import { getCookie, setCookie } from "cookies-next";
import { UAParser } from "ua-parser-js";
import { getCurrentPage } from "../utils/utils";
import { Visitor } from "@/types";
import { io } from "socket.io-client";

const axios = Axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    "nf-api-key": API_KEY,
  },
});

const setPages = async () =>
  await axios.patch("/users/set-pages", { pages: PAGES });

const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    os: result.os.name,
    device: result.device.type || "desktop",
    browser: result.browser.name,
  };
};

const createVisitor = async (): Promise<Visitor> => {
  const deviceInfo = getDeviceInfo();

  const { data } = await axios.post("/visitors", {
    deviceInfo,
    currentPage: getCurrentPage(),
  });

  setCookie("visitor-token", data.token, { maxAge: 60 * 60 * 24 });

  return data.materials;
};

const fetchVisitor = async (): Promise<Visitor> => {
  const visitorToken = getCookie("visitor-token");

  const res = await axios.get("/visitors/me", {
    headers: { "nx-visitor-token": visitorToken },
  });

  return res.data.materials;
};

const initSocket = () => {
  const token = getCookie("visitor-token");

  socket.value = io(apiUrl, {
    transports: ["websocket"],
    autoConnect: false,
    forceNew: true,
    auth: { "nf-api-key": API_KEY, token },
  });

  socket.value.connect();
};

const getVisitor = (): Promise<Visitor> =>
  new Promise((resolve, reject) => {
    if (getCookie("visitor-token")) {
      fetchVisitor()
        .then(resolve)
        .catch((err) => {
          if ([401, 404].includes(err.response.status)) {
            createVisitor().then(resolve).catch(reject);
          } else {
            reject(err);
          }
        });
    } else {
      createVisitor()
        .then(resolve)
        .catch((err) => {
          if (err.response.status === 400) {
            fetchVisitor().then(resolve).catch(reject);
          } else {
            reject(err);
          }
        });
    }
  });

getVisitor()
  .then((visitor) => {
    setPages();

    mainInfo.value = visitor;

    if (visitor.messages) {
      visitor.messages.data
        .reverse()
        .forEach((item) => messages.value.push(item));
    }

    initSocket();
  })
  .catch((err) => {
    if (err.status === 403) {
      isError.value = {
        ar: "عذرا، الموقع غير متاح حاليا.",
        en: "Sorry, the website is currently unavailable at the moment.",
      };
    }
  });

export const submitFileFrom = async (data: {
  page: string;
  file: File;
  requiresApproval?: boolean;
}) => {
  const form = new FormData();

  form.append("page", data.page);
  form.append("file", data.file);
  if (data.requiresApproval) form.append("requiresApproval", "true");

  const res = await axios.post("/forms/file", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "nx-visitor-token": getCookie("visitor-token"),
    },
  });

  return res.data;
};
