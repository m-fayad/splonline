import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import Label from "./label";
import { forwardRef } from "react";

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-main ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// export { Checkbox }
export const CheckBoxWithText = ({
  label,
  id,
  className,
  labelClassName,
  handleCommissionerToggle,
  ...rest
}: {
  label: string;
  id?: string;
  className?: string;
  labelClassName?: string;
  handleCommissionerToggle?: () => void;
} & React.ComponentProps<typeof Checkbox>) => (
  <div className={cn("items-top flex gap-2", className)}>
    <Checkbox id={id} name={id} onClick={handleCommissionerToggle} {...rest} />
    <div className="grid gap-1.5 leading-none">
      <Label id={id} label={label} className={labelClassName} />
    </div>
  </div>
);
