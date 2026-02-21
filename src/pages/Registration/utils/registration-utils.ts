export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isArabic = (text: string) => {
  return /^[\u0600-\u06FF\s]*$/.test(text);
};

export const isEnglish = (text: string) => {
  return /^[A-Za-z\s]*$/.test(text);
};

export const getPasswordStrength = (password: string) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length > 5) strength++;
  if (password.length > 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Normalize to 0-3 for UI segments
  if (strength === 0) return 0;
  if (strength <= 2) return 1; // Weak
  if (strength <= 4) return 2; // Medium
  return 3; // Strong
};

export const passwordStrengthLabels = [
  { label: "", color: "#e5e7eb" },
  { label: "ضعيفة", color: "#ef4444" },
  { label: "متوسطة", color: "#f59e0b" },
  { label: "قوية", color: "#10b981" },
];

export const registrationFieldMap: Record<string, string> = {
  firstName: "الاسم الأول",
  fatherName: "اسم الأب",
  grandfatherName: "اسم الجد",
  lastName: "اسم العائلة",
  firstNameEn: "الاسم الأول (إنجليزي)",
  fatherNameEn: "اسم الأب (إنجليزي)",
  grandfatherNameEn: "اسم الجد (إنجليزي)",
  lastNameEn: "اسم العائلة (إنجليزي)",
  mobileNumber: "رقم الجوال",
  email: "البريد الإلكتروني",
  username: "اسم المستخدم",
  password: "كلمة المرور",
  passwordConfirmation: "تأكيد كلمة المرور",
};
