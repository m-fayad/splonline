import * as React from "react";
import { cn } from "@/lib/utils";

interface DuelSelectProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  opts: string[];
  id: string;
  label: string;
  value?: string;
  onValueChange?: (val: string) => void; // renamed
}

const DuelSelect = React.forwardRef<HTMLFieldSetElement, DuelSelectProps>(
  ({ opts, id, label, value, onValueChange, className, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        id={id}
        className={cn("max-w-3xl grid grid-cols-2 gap-4", className)}
        {...props}
      >
        <legend className="sr-only">{label}</legend>

        {opts.map((opt) => (
          <div key={opt}>
            <label
              htmlFor={`${id}-${opt}`}
              className="block cursor-pointer border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:bg-main has-[:checked]:text-white has-[:checked]:border-main has-[:checked]:ring-1 has-[:checked]:ring-main transition-colors duration-300"
            >
              <p className="text-center font-bold lg:text-lg">{opt}</p>

              <input
                type="radio"
                name={id}
                value={opt}
                id={`${id}-${opt}`}
                className="sr-only"
                checked={value === opt}
                onChange={() => onValueChange?.(opt)}
              />
            </label>
          </div>
        ))}
      </fieldset>
    );
  }
);
DuelSelect.displayName = "DuelSelect";

export { DuelSelect };
