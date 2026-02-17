import errorMessages from "@/data/error-messages";

export function validateSAID(id: any) {
  let type = id.substr(0, 1);
  let sum = 0;
  const _idLength = 10;
  const _type1 = "1";
  const _type2 = "2";
  id = id.trim();
  if (
    isNaN(parseInt(id)) ||
    id.length !== _idLength ||
    (type !== _type2 && type !== _type1)
  ) {
    return -1;
  }
  for (let num = 0; num < 10; num++) {
    const digit = Number(id[num]);
    if (num % 2 === 0) {
      const doubled = digit * 2;
      const ZFOdd = `00${doubled}`.slice(-2);
      sum += Number(ZFOdd[0]) + Number(ZFOdd[1]);
    } else {
      sum += digit;
    }
  }
  return sum % 10 !== 0 ? -1 : type;
}

export function validateLanguage(input: any) {
  // Regular expressions to match Arabic and English characters
  const arabicRegex = /[\u0600-\u06FF]/;
  const englishRegex = /[a-zA-Z]/;
  let char;

  for (let i = 0; i < input.length; i++) {
    char = input.charAt(i);

    if (arabicRegex.test(char)) {
      return "ar";
    }

    if (englishRegex.test(char)) {
      return "en";
    }
  }

  return "Unknown";
}

export function maskPhoneNumber(phoneNumber: string) {
  // Remove non-digit characters from the phone number
  const digitsOnly = phoneNumber?.replace(/\D/g, "");
  let maskedDigits, firstFourDigits, lastFourDigits;

  // Check if the phone number has at least four digits
  if (digitsOnly?.length >= 4) {
    firstFourDigits = digitsOnly.slice(0, 4);
    maskedDigits = "*".repeat(digitsOnly.length - 8);
    lastFourDigits = digitsOnly.slice(-4);
    return firstFourDigits + maskedDigits + lastFourDigits;
  }

  // If the phone number has less than four digits, return it as is
  return phoneNumber;
}

export function validateCardnumber(inputtxt: any) {
  const cardno = /^(?:3[47][0-9]{13})$/;
  if (inputtxt.value.match(cardno)) {
    return true;
  } else {
    alert("Not a valid Amercican Express credit card number!");
    return false;
  }
}

export function validatePhoneSAnumber(No: any) {
  const saNoRegex = /^(?:\+?966|0)?(?:\d{9}|\d{10})$/;
  return saNoRegex.test(No);
}

export function validateIBAN(No: string) {
  const ibanRegex = /^\d{2}[A-Z\d]{14}$/;
  const next4digitsRegex = /^\d{4}./;
  const maxLengthRegex = /^\d{16}$/;

  const isValid = ibanRegex.test(No);
  const nextDigitsVaild = next4digitsRegex.test(No);
  const maxLengthVaild = maxLengthRegex.test(No);

  return {
    isValid,
    nextDigitsVaild,
    maxLengthVaild,
  };
}

export function validateNumericInput(value: any) {
  value = value.replace(/\D/g, ""); // Replace non-digit characters with an empty string
  return value;
}

export const absLenght = (value: any): number =>
  value
    .split("")
    .map((item: any) => parseInt(item))
    .filter((item: any) => !isNaN(item)).length;

export function replaceFalsyValues(obj: { [key: string]: any }) {
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === "object") {
      replaceFalsyValues(obj[key]);
    } else if (!obj[key]) {
      obj[key] = "error";
    }
  }
  return obj;
}

export const validateName = (name: string) => {
  const validCharactersRegex = /[\D]/;

  return validCharactersRegex.test(name.trim());
};

// Form validations

export const errorCheck = (name: string, value: string) => {
  if (value === "") {
    return "هذا الحقل مطلوب";
  } else {
    const msg = errorMessages.find((msg) => name.includes(msg.name))?.message;

    console.log("msg:", msg);
    if (name.includes("name")) {
      if (validateName(value)) return "";
      else return msg;
    }
    if (name.includes("phone")) {
      if (validatePhoneSAnumber(value)) return "";
      else return msg;
    }
    if (name.includes("id")) {
      if (validateSAID(value) !== -1) return "";
      else return msg;
    }
  }
};
export const validatityCheck = (name: string, value: string) => {
  if (value !== "") {
    if (name.includes("name")) {
      return validateName(value);
    }
    if (name.includes("phone")) {
      return validatePhoneSAnumber(value);
    }
    if (name.includes("id")) {
      return validateSAID(value) === -1 ? false : true;
    }

    true;
  } else return false;
};
export const assignErrMsgs = (data: { [key: string]: FormDataEntryValue }) => {
  console.log(data);

  const error: { [key: string]: any } = {};

  Object.entries(data)
    .filter(([_, value]) => !value)
    .map(([key, value]) => {
      error[key] = errorCheck(key, value as string);
    });
  console.log(error);

  if (data?.plate === "----_----" || `${data?.plate}`.includes("undefined"))
    error.plate = "هذا الحقل مطلوب";
  // if (`${data?.plate}`.length < 15) error.plate = "أكتب رقم اللوحة كاملا";

  return error;
};

export function getMobilePlatform() {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "Desktop";
}
