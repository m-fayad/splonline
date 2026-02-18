import TextField, { TextFieldProps } from "@mui/material/TextField";

const CustomInput = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "4px",
          bgcolor: "white",
          "& fieldset": {
            borderColor: "#d1d5db",
          },
          "&:hover fieldset": {
            borderColor: "#9ca3af",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00c8e1",
          },
          "&.Mui-error": {
            bgcolor: "rgba(211, 47, 47, 0.05)",
          },
        },
        "& input": {
          padding: "10.5px 14px",
        },
        ...props.sx,
      }}
      slotProps={
        {
          ...props.slotProps,
          formHelperText: {
            ...(props.slotProps?.formHelperText as any),
            sx: {
              mx: 0,
              mt: 0.5,
              ...(props.slotProps?.formHelperText as any)?.sx,
            },
          },
        } as any
      }
    />
  );
};

export default CustomInput;
