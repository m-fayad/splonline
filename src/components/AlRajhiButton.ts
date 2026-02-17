import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const AlRajhiButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#221afb"),
  backgroundColor: "#221afb",
  "&:hover": {
    backgroundColor: "#201ac8ff",
  },
}));

export default AlRajhiButton;
