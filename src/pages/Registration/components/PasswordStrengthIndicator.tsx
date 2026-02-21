import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  getPasswordStrength,
  passwordStrengthLabels,
} from "../utils/registration-utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const { label, color } = passwordStrengthLabels[strength];

  return (
    <Box sx={{ mt: 1, textAlign: "right", width: "100%" }}>
      {password && (
        <Typography sx={{ mb: 1, fontSize: "0.85rem", color: "#374151" }}>
          قوة كلمة المرور:{" "}
          <span style={{ color, fontWeight: "bold" }}>{label}</span>
        </Typography>
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        {[1, 2, 3].map((index) => (
          <Box
            key={index}
            sx={{
              height: "6px",
              flex: 1,
              borderRadius: "10px",
              bgcolor: index <= strength ? color : "#e5e7eb",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PasswordStrengthIndicator;
