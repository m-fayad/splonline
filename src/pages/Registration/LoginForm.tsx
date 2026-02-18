import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomRadio from "./CustomRadio";
import ErrorDialog from "./ErrorDialog";
import CustomInput from "./CustomInput";

const LoginForm = () => {
  const [captchaIndex, setCaptchaIndex] = useState(1);
  const [accountType, setAccountType] = useState("individual");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: "",
  });
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const toggleCaptcha = () => {
    setCaptchaIndex((prev) => (prev % 5) + 1);
  };

  const handleLogin = () => {
    if (!formData.username || !formData.password || !formData.captcha) {
      setShowErrors(true);
      setShowErrorDialog(true);
    } else {
      console.log("Logging in:", formData);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#153c3f",
          fontSize: { xs: "28px", md: "40px" },
          mt: 6,
          mb: 4,
          lineHeight: 1.2,
        }}
      >
        تسجيل الدخول
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: "#153c3f",
          fontSize: { xs: "20px", md: "28px" },
          mb: 4,
        }}
      >
        الرجاء اختيار نوع الحساب
      </Typography>

      <FormControl component="fieldset" fullWidth sx={{ mb: 6 }}>
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
                  fontWeight: "bold",
                  color: "#373737",
                  fontSize: "1.1rem",
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
                  fontWeight: "bold",
                  color: "#373737",
                  fontSize: "1.1rem",
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
                  fontWeight: "bold",
                  color: "#373737",
                  fontSize: "1.1rem",
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
          fontSize: "28px",
          mb: 2,
        }}
      >
        بيانات التسجيل
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          mb: { xs: 4, md: 10 },
        }}
      >
        <CustomInput
          placeholder="اسم المستخدم / رقم الهوية / رقم الإقامة"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          error={showErrors && !formData.username}
        />
        <CustomInput
          type="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={showErrors && !formData.password}
        />

        <Box sx={{ display: "flex", gap: 2, alignItems: "stretch" }}>
          <IconButton
            onClick={toggleCaptcha}
            sx={{
              bgcolor: "#f3f4f6",
              borderRadius: "4px",
              border: "1px solid #d1d5db",
              color: "#00c8e1",
              "&:hover": { bgcolor: "#e5e7eb" },
              width: "56px",
            }}
          >
            <RefreshIcon sx={{ transform: "scaleX(-1)" }} />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#f3f4f6",
              borderRadius: "4px",
              px: 2,
              border: "1px solid #d1d5db",
            }}
          >
            <img
              src={`/assets/images/new/captcha${captchaIndex === 3 ? "3" : `-${captchaIndex}`}.png`}
              alt="captcha"
              style={{ height: "40px", objectFit: "contain" }}
            />
          </Box>

          <CustomInput
            sx={{ flex: 1 }}
            placeholder="الرمز المرئي"
            value={formData.captcha}
            onChange={(e) =>
              setFormData({ ...formData, captcha: e.target.value })
            }
            error={showErrors && !formData.captcha}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            width: { xs: "100%", md: "fit-content" },
            bgcolor: "#00c8e1",
            color: "#373737",
            fontWeight: "bold",
            fontSize: "1.1rem",
            px: 6,
            py: 1.5,
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": { bgcolor: "#00b2c9", boxShadow: "none" },
          }}
        >
          تسجيل الدخول
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          mt: 4,
          mb: 8,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "fit-content" },
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#136e82",
            gap: 1,
          }}
        >
          <ArrowForwardIcon
            sx={{ fontSize: "1.2rem", transform: "scaleX(-1)" }}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            نسيت اسم المستخدم
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#136e82",
            gap: 1,
          }}
        >
          <ArrowForwardIcon
            sx={{ fontSize: "1.2rem", transform: "scaleX(-1)" }}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            نسيت كلمة المرور
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 6 }} />

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#153c3f",
            mb: 2,
            fontSize: "26px",
          }}
        >
          النفاذ الوطني الموحد
        </Typography>
        <Typography
          sx={{
            color: "#4b5563",
            mb: 6,
            lineHeight: 1.8,
            fontSize: "16px",
          }}
        >
          عزيزنا العميل.. يمكنك الدخول عن طريق اسم المستخدم وكلمة المرور
          المستخدمة في منصة النفاذ الوطني الموحد .. لكي تستفيد من الخدمات
          الإلكترونية المقدمة من مؤسسة البريد السعودي سُبُل ..
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <img
            src="/assets/images/new/NIC_logo.svg"
            alt="NIC Logo"
            style={{ width: "240px" }}
          />

          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#136e82",
              color: "#136e82",
              fontWeight: "bold",
              fontSize: "1.1rem",
              py: 1.5,
              borderRadius: "4px",
              borderWidth: "1px",
              "&:hover": {
                borderColor: "#105e70",
                bgcolor: "rgba(19, 110, 130, 0.04)",
                borderWidth: "1px",
              },
            }}
          >
            تسجيل الدخول
          </Button>
        </Box>
      </Box>
      <ErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </Box>
  );
};

export default LoginForm;
