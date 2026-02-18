import { ReactNode } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface CustomSelectProps extends SelectProps {
  helperText?: string;
  children?: ReactNode;
}

const CustomSelect = ({
  helperText,
  children,
  ...props
}: CustomSelectProps) => {
  return (
    <FormControl fullWidth error={props.error}>
      <Select
        displayEmpty
        {...props}
        sx={{
          height: "45px",
          bgcolor: "white",
          borderRadius: "4px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d1d5db",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#9ca3af",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00c8e1",
          },
          "&.Mui-error": {
            bgcolor: "rgba(211, 47, 47, 0.05)",
          },
          "& .MuiSelect-select": {
            textAlign: "right",
          },
          ...props.sx,
        }}
      >
        {children}
      </Select>
      {props.error && helperText && (
        <FormHelperText sx={{ mx: 0, mt: 0.5, textAlign: "right" }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
