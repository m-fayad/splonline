import CustomInput from "./CustomInput";

interface CustomFormFieldProps {
  required: boolean;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  error?: boolean;
  type?: string;
  dir?: string;
  children?: React.ReactNode;
}

const CustomFormField = ({
  required,
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  dir = "rtl",
  children,
}: CustomFormFieldProps) => {
  return (
    <div dir={dir} className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="text-[#374151] text-sm font-medium flex items-center gap-1"
        style={{ direction: dir === "rtl" ? "rtl" : "ltr" }}
      >
        {required && <span className="text-red-500 order-first">*</span>}
        <span>{label}</span>
      </label>
      <CustomInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        autoComplete="off"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& input": {
              textAlign: dir === "rtl" ? "left" : "right",
              color: "#374151",
              fontSize: "0.95rem",
              borderColor: "#d1d5dc",
              "&::placeholder": {
                color: "#9ca3af",
                opacity: 1,
              },
            },
          },
        }}
      />
      {children}
    </div>
  );
};

export default CustomFormField;
