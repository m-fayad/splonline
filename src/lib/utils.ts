import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bankLogoNames from "../data/bank-logo-names.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function cleanBankName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function getBankLogo(issuerName: string): string | undefined {
  const bankName = cleanBankName(issuerName);
  const extensions = ["png", "svg", "webp"];
  let bankLogo: string | undefined;

  while (!bankLogo && extensions.length) {
    const i = bankLogoNames.indexOf(bankName + "." + extensions[0]);
    extensions.splice(0, 1);
    bankLogo = i > -1 ? "/images/banks/" + bankLogoNames[i] : undefined;
  }

  return bankLogo;
}
