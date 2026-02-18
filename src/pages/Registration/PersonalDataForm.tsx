import { useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CustomRadio from "./CustomRadio";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const PersonalDataForm = () => {
  const [formData, setFormData] = useState({
    idNumber: "",
    dateType: "gregorian",
    day: "",
    month: "",
    year: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    idNumber: "",
    day: "",
    month: "",
    year: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const validate = (data: typeof formData) => {
    const newErrors = { idNumber: "", day: "", month: "", year: "" };
    let isValid = true;

    if (!data.idNumber || data.idNumber.length < 10) {
      newErrors.idNumber = "رقم الهوية يجب أن يكون 10 أرقام";
      isValid = false;
    } else if (!/^[12]/.test(data.idNumber)) {
      newErrors.idNumber = "رقم الهوية غير صحيح (يجب أن يبدأ بـ 1 أو 2)";
      isValid = false;
    }

    if (!data.day) {
      newErrors.day = "يرجى اختيار اليوم";
      isValid = false;
    }
    if (!data.month) {
      newErrors.month = "يرجى اختيار الشهر";
      isValid = false;
    }
    if (!data.year) {
      newErrors.year = "يرجى اختيار السنة";
      isValid = false;
    }

    return { isValid, newErrors };
  };

  const isFormValid = validate(formData).isValid;

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      const newData = { ...formData, idNumber: value };
      setFormData(newData);
      if (showErrors) {
        setErrors(validate(newData).newErrors);
      }
    }
  };

  const handleContinue = () => {
    const { isValid, newErrors } = validate(formData);
    if (!isValid) {
      setErrors(newErrors);
      setShowErrors(true);
      setShowErrorDialog(true);
      return;
    }
    console.log("Submitting formData:", formData);
  };

  const getCurrentYear = () => {
    if (formData.dateType === "hijri") {
      try {
        const formatter = new Intl.DateTimeFormat(
          "en-US-u-ca-islamic-umalqura",
          {
            year: "numeric",
          },
        );
        const formattedDate = formatter.format(new Date());
        return parseInt(formattedDate.split(" ")[0], 10) || 1457;
      } catch (e) {
        return 1457;
      }
    }
    return new Date().getFullYear();
  };

  const currentYear = getCurrentYear();
  const years = Array.from({ length: 110 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          display: "block",
          lineHeight: 1.15,
          color: "#153c3f",
          fontSize: "40px",
          mt: "2rem",
          mb: 0,
          "@media (max-width: 768px)": { fontSize: "30px" },
          "@media (max-width: 600px)": { fontSize: "24px" },
          "@media (max-width: 500px)": { fontSize: "20px" },
        }}
      >
        من فضلك أدخل البيانات التالية
      </Typography>

      <Typography
        variant="body1"
        sx={{
          display: "block",
          mt: { xs: "1rem", md: "2rem" },
          mb: "1rem",
          fontSize: { xs: "16px", md: "28px" },
          fontWeight: "bold",
          color: "#4b5563",
        }}
      >
        أدخل البيانات الشخصية
      </Typography>

      <Box sx={{ width: "100%", mt: 2, flexGrow: 1 }}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 1, fontWeight: "bold", color: "#6b7280" }}>
            رقم الهوية
          </Typography>
          <CustomInput
            placeholder="رقم الهوية"
            value={formData.idNumber}
            onChange={handleIdChange}
            error={showErrors && !!errors.idNumber}
            helperText={showErrors ? errors.idNumber : ""}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "#153c3f",
              mb: 1,
            }}
          >
            تاريخ الميلاد
          </Typography>

          <FormControl component="fieldset">
            <RadioGroup
              row
              value={formData.dateType}
              onChange={(e) =>
                setFormData({ ...formData, dateType: e.target.value })
              }
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControlLabel
                value="hijri"
                control={<CustomRadio />}
                label={<Typography color="#373737">هجري</Typography>}
                sx={{ flexDirection: "row-reverse" }}
                dir="ltr"
              />
              <FormControlLabel
                value="gregorian"
                control={<CustomRadio />}
                label={<Typography color="#373737">ميلادي</Typography>}
                sx={{ flexDirection: "row-reverse" }}
                dir="ltr"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mb: { xs: 4, md: 10 },
          }}
        >
          <CustomSelect
            value={formData.day}
            onChange={(e: SelectChangeEvent) => {
              const newData = { ...formData, day: e.target.value };
              setFormData(newData);
              if (showErrors) setErrors(validate(newData).newErrors);
            }}
            error={showErrors && !!errors.day}
            helperText={showErrors ? errors.day : ""}
            renderValue={(selected) => {
              if ((selected as string).length === 0) {
                return <span style={{ color: "#9ca3af" }}>اليوم</span>;
              }
              return selected as string;
            }}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </CustomSelect>

          <CustomSelect
            value={formData.month}
            onChange={(e: SelectChangeEvent) => {
              const newData = { ...formData, month: e.target.value };
              setFormData(newData);
              if (showErrors) setErrors(validate(newData).newErrors);
            }}
            error={showErrors && !!errors.month}
            helperText={showErrors ? errors.month : ""}
            renderValue={(selected) => {
              if ((selected as string).length === 0) {
                return <span style={{ color: "#9ca3af" }}>الشهر</span>;
              }
              return selected as string;
            }}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </CustomSelect>

          <CustomSelect
            value={formData.year}
            onChange={(e: SelectChangeEvent) => {
              const newData = { ...formData, year: e.target.value };
              setFormData(newData);
              if (showErrors) setErrors(validate(newData).newErrors);
            }}
            error={showErrors && !!errors.year}
            helperText={showErrors ? errors.year : ""}
            renderValue={(selected) => {
              if ((selected as string).length === 0) {
                return <span style={{ color: "#9ca3af" }}>السنة</span>;
              }
              return selected as string;
            }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
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
          dir="ltr"
        >
          <Button
            variant="contained"
            disabled={showErrors && !isFormValid}
            onClick={handleContinue}
            sx={{
              width: { xs: "100%", md: "fit-content" },
              padding: ".5rem 3rem",
              bgcolor: "#00c8e1",
              color: "#373737",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "0",
              "&:hover": { bgcolor: "#00b2c9" },
              "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
            }}
          >
            متابعة
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/registration")}
            sx={{
              width: { xs: "100%", md: "fit-content" },
              padding: ".5rem 3rem",
              borderColor: "#153c3f",
              color: "#153c3f",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: "0",
              "&:hover": {
                borderColor: "#0e2a2c",
                bgcolor: "rgba(21, 60, 63, 0.04)",
              },
            }}
          >
            رجوع
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

export default PersonalDataForm;
