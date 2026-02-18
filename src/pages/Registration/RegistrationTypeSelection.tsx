import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import CustomRadio from "./CustomRadio";

const RegistrationTypeSelection = () => {
  const [value, setValue] = useState("individual");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

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
          "@media (max-width: 768px)": {
            fontSize: "30px",
          },
          "@media (max-width: 600px)": {
            fontSize: "24px",
          },
          "@media (max-width: 500px)": {
            fontSize: "20px",
          },
        }}
      >
        إنشاء حساب في الخدمات الإلكترونية
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
        قم بإنشاء حساب على سُبُل اون لاين
      </Typography>

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <RadioGroup
          aria-label="account-type"
          name="account-type"
          value={value}
          onChange={handleChange}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          dir="ltr"
        >
          <FormControlLabel
            value="individual"
            control={<CustomRadio />}
            label={<Typography color="#373737">الأفراد</Typography>}
            sx={{
              margin: 0,
              width: "100%",
              alignItems: "center",
              "& .MuiFormControlLabel-label": {
                width: "100%",
                textAlign: "right",
              },
            }}
            labelPlacement="start"
          />

          <FormControlLabel
            value="business"
            control={<CustomRadio />}
            label={<Typography color="#373737">الاعمال</Typography>}
            sx={{
              margin: 0,
              width: "100%",
              "& .MuiFormControlLabel-label": {
                width: "100%",
                textAlign: "right",
              },
            }}
            labelPlacement="start"
          />

          <FormControlLabel
            value="government"
            disabled
            control={<CustomRadio />}
            label={<Typography color="#373737">الخدمات الحكومية</Typography>}
            sx={{
              margin: 0,
              width: "100%",
              "& .MuiFormControlLabel-label": {
                width: "100%",
                textAlign: "right",
              },
              "&.Mui-disabled": {
                opacity: 0.5,
              },
            }}
            labelPlacement="start"
          />
        </RadioGroup>

        <Typography
          variant="body2"
          sx={{ mt: 2, ml: 1.5, mr: 4, color: "#6b7280", fontSize: "20px" }}
        >
          إذا كنت ترغب في إنشاء حساب حكومي ، يرجى الاتصال بقسم المبيعات الحكومية
        </Typography>
      </FormControl>

      <Button
        variant="contained"
        fullWidth
        disabled={value === "government"}
        sx={{
          mt: { xs: 4, md: 8 },
          width: "fit-content",
          padding: ".5rem 3rem",
          bgcolor: "#00c8e1",
          color: "#373737",
          fontWeight: "bold",
          fontSize: "1.1rem",
          "&:hover": {
            bgcolor: "#00b2c9",
          },
          "&:disabled": {
            bgcolor: "#e5e7eb",
            color: "#9ca3af",
          },
        }}
      >
        متابعة
      </Button>
    </Box>
  );
};

export default RegistrationTypeSelection;
