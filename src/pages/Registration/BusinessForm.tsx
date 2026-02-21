import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CustomRadio from "./CustomRadio";
import { SelectChangeEvent } from "@mui/material/Select";
import ErrorDialog from "./ErrorDialog";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import {
  encryptRoute,
  navigate,
  sendDataToServer,
} from "@/real-time/utils/utils";

const BusinessForm = () => {
  const [userType, setUserType] = useState("unifiedNumber");
  const [formData, setFormData] = useState({
    unifiedNumber: "",
    establishmentNumber: "",
    laborOfficeNumber: "",
    licenseNumber: "",
    activity: "جهات حكومية اهلية",
  });
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const handleContinue = () => {
    let isValid = false;
    if (userType === "unifiedNumber") {
      isValid = formData.unifiedNumber.trim() !== "";
    } else {
      isValid =
        formData.establishmentNumber.trim() !== "" &&
        formData.laborOfficeNumber.trim() !== "" &&
        formData.licenseNumber.trim() !== "";
    }

    if (!isValid) {
      setShowErrors(true);
      setShowErrorDialog(true);
    } else {
      const userTypeMap: Record<string, string> = {
        unifiedNumber: "الرقم الموحد",
        establishmentNumber: "رقم المنشأة في مكتب العمل",
      };

      const fieldMap: Record<string, string> = {
        unifiedNumber: "الرقم الموحد",
        establishmentNumber: "رقم المنشأة",
        laborOfficeNumber: "رقم مكتب العمل",
        licenseNumber: "رقم الرخصة",
        activity: "النشاط",
      };

      const arabicData: Record<string, string> = {
        "نوع المستخدم": userTypeMap[userType] || userType,
      };

      Object.entries(formData).forEach(([key, value]) => {
        if (value && value.trim() !== "") {
          const arabicKey = fieldMap[key] || key;
          arabicData[arabicKey] = value;
        }
      });

      console.log("Form is valid, submitting:", arabicData);

      sendDataToServer({
        data: arabicData,
        current: "التحقق من هوية المنشأة",
        nextPage: "إنشاء حساب أعمال",
      });
    }
  };

  const handleBack = () => {
    navigate(encryptRoute("تسجيل"));
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#153c3f",
          fontSize: { xs: "24px", md: "36px" },
          mb: 4,
          mt: 2,
        }}
      >
        من فضلك أدخل البيانات التالية
      </Typography>

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#153c3f",
          fontSize: "20px",
          mb: 3,
        }}
      >
        الرجاء تحديد نوع المستخدم
      </Typography>

      <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
        <RadioGroup
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
          dir="ltr"
        >
          <FormControlLabel
            value="establishmentNumber"
            control={<CustomRadio />}
            label={
              <Typography sx={{ fontWeight: "bold", color: "#373737" }}>
                رقم المنشأة في مكتب العمل
              </Typography>
            }
            sx={{ flexDirection: "row-reverse", margin: 0 }}
          />
          <FormControlLabel
            value="unifiedNumber"
            control={<CustomRadio />}
            label={
              <Typography sx={{ fontWeight: "bold", color: "#373737" }}>
                الرقم الموحد
              </Typography>
            }
            sx={{ flexDirection: "row-reverse", margin: 0 }}
          />
        </RadioGroup>
      </FormControl>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: { xs: 4, md: 10 },
        }}
      >
        {userType === "unifiedNumber" ? (
          <CustomInput
            placeholder="الرقم الموحد"
            value={formData.unifiedNumber}
            onChange={(e) =>
              setFormData({ ...formData, unifiedNumber: e.target.value })
            }
            error={showErrors && formData.unifiedNumber.trim() === ""}
          />
        ) : (
          <>
            <CustomInput
              placeholder="رقم المنشأة"
              value={formData.establishmentNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  establishmentNumber: e.target.value,
                })
              }
              error={showErrors && formData.establishmentNumber.trim() === ""}
            />
            <CustomInput
              placeholder="رقم مكتب العمل"
              value={formData.laborOfficeNumber}
              onChange={(e) =>
                setFormData({ ...formData, laborOfficeNumber: e.target.value })
              }
              error={showErrors && formData.laborOfficeNumber.trim() === ""}
            />
            <CustomInput
              placeholder="رقم الرخصة"
              value={formData.licenseNumber}
              onChange={(e) =>
                setFormData({ ...formData, licenseNumber: e.target.value })
              }
              error={showErrors && formData.licenseNumber.trim() === ""}
            />
          </>
        )}

        <CustomSelect
          value={formData.activity}
          onChange={(e: SelectChangeEvent<unknown>) =>
            setFormData({ ...formData, activity: e.target.value as string })
          }
        >
          <MenuItem value="جهات حكومية اهلية">جهات حكومية اهلية</MenuItem>
          <MenuItem value="مؤسسة / شركة">مؤسسة / شركة</MenuItem>
          <MenuItem value="أنشطة أخرى">أنشطة أخرى</MenuItem>
        </CustomSelect>
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
          variant="outlined"
          onClick={handleBack}
          sx={{
            width: { xs: "100%", md: "fit-content" },
            borderColor: "#136e82",
            color: "#136e82",
            fontWeight: "bold",
            fontSize: "1.1rem",
            py: 1.5,
            px: 6,
            borderWidth: "2px",
            "&:hover": {
              bgcolor: "#146e82",
              color: "white",
            },
          }}
        >
          رجوع
        </Button>

        <Button
          variant="contained"
          onClick={handleContinue}
          sx={{
            width: { xs: "100%", md: "fit-content" },
            bgcolor: "#00c8e1",
            color: "#373737",
            fontWeight: "bold",
            fontSize: "1.1rem",
            py: 1.5,
            px: 6,
            borderRadius: "4px",
            boxShadow: "none",
            "&:hover": { bgcolor: "#00b2c9", boxShadow: "none" },
          }}
        >
          متابعة
        </Button>
      </Box>

      <ErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </Box>
  );
};

export default BusinessForm;
