import { Input } from "@/components/VSC-client/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputWithAnimationLabelProps {
  id: string;
  type?: string;
  className?: string;
  placeholder?: string;
  label: string;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
  errors: any;
}

function InputWithAnimationLabel({
  id,
  type = "text",
  className,
  placeholder = "",
  label,
  register,
  options,
  errors,
}: InputWithAnimationLabelProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisible = () => setShowPassword(!showPassword);

  return (
    <div>
      <div className="group relative min-w-[300px] max-w-[95dvw]">
        <label
          htmlFor={id}
          className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground"
        >
          <span className="inline-flex bg-[#f5f6fa] px-2">{label}</span>
        </label>

        <Input
          id={id}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          placeholder={placeholder}
          className={cn(className, "focus-visible:ring-[#003cea]")}
          {...register(id, options)}
        />

        {type === "password" &&
          (!showPassword ? (
            <EyeOff
              onClick={togglePasswordVisible}
              className="absolute end-3 top-1/2 -translate-y-1/2 -scale-x-100 text-[#003cea]"
            />
          ) : (
            <Eye
              onClick={togglePasswordVisible}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-[#003cea]"
            />
          ))}
      </div>

      {errors[id]?.message && (
        <span className="text-xs font-medium text-red-500">
          {errors[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default InputWithAnimationLabel;
