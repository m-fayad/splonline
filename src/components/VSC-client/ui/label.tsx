import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Label = ({
  id,
  label,
  className,
  htmlFor,
  children,
}: {
  id?: string;
  label?: string;
  className?: string;
  htmlFor?: string;
} & PropsWithChildren) => {
  return (
    <label
      htmlFor={htmlFor ?? id}
      className={cn(
        "mb-2 block text-sm font-bold leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none",
        className
      )}
    >
      {children ?? label}
    </label>
  );
};
export default Label;
