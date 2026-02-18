import { ReactNode } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

export type CustomSelectProps = SelectProps<any> & {
  helperText?: string;
  children?: ReactNode;
};

const CustomSelect = (props: CustomSelectProps) => {
  const { helperText, children, ...rest } = props;
  return (
    <FormControl fullWidth error={rest.error}>
      <Select
        displayEmpty
        {...(rest as any)}
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
          ...rest.sx,
        }}
      >
        {children}
      </Select>
      {rest.error && helperText && (
        <FormHelperText sx={{ mx: 0, mt: 0.5 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
