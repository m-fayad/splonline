import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

export default function PhoneField({
  control,
  watch,
  errors,
}: {
  control: Control<any>;
  watch: (name: "phone", defaultValue?: string | undefined) => string;
  errors: FieldErrors<any>;
}) {
  const [phoneFocused, setPhoneFocused] = useState(false);

  return (
    <FormControl fullWidth margin="dense" color="success">
      <InputLabel htmlFor="phone" shrink={phoneFocused || !!watch("phone")}>
        رقم الجوال
      </InputLabel>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "يرجى إدخال رقم الجوال",
          validate: (value) => {
            const cleaned = value.replace(/[^\d]/g, "");
            return (
              /^05\d{8}$/.test(cleaned) ||
              "رقم الجوال غير صحيح؛ يجب أن يبدأ بـ05 ويتكون من 10 أرقام"
            );
          },
        }}
        render={({ field }) => (
          <>
            <OutlinedInput
              {...field}
              dir="ltr"
              id="phone"
              type="tel"
              onChange={(e) => {
                let rawValue = e.target.value.replace(/[^\d]/g, "");
                if (rawValue.length > 10) {
                  rawValue = rawValue.slice(0, 10);
                }
                field.onChange(rawValue);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <img
                    src="https://flagcdn.com/sa.svg"
                    alt="flag sa"
                    className="w-8"
                  />
                </InputAdornment>
              }
              label="رقم الجوال"
              notched={phoneFocused || !!watch("phone")}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
            />
          </>
        )}
      />
      {errors.phone && (
        <span className="text-red-500 text-sm mt-1">
          {errors.phone.message as string}
        </span>
      )}
    </FormControl>
  );
}
