import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";
import Label from "./label";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
// import { CustomSelectProps } from "@/types/fly.types";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

export function SelectScrollable({
  id,
  className,
  items,
  label,
  placeholder,
  noicons,
  defaultValue,
  disabled,
  formState,
  handleSelectChange,
  setIsKsa,
}: {
  id: string;
  className?: string;
  items: { name: string; value?: string; code?: string; icon?: string }[];
  label: string;
  placeholder?: string;
  noicons?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  formState?: any;
  handleSelectChange: (value: string, id: string) => void;
  setIsKsa?: (value: boolean) => void;
}) {
  const error = formState?.error;
  // console.log(formState?.[id]);
  // console.log(defaultValue);

  const handleChange = (value: string) => {
    handleSelectChange(value, id);
    if (id === "country" && setIsKsa) {
      setIsKsa(value === "السعودية" ? true : false);
    }
  };

  return (
    <div className={cn("grid w-full max-w-sm items-center", className)}>
      <Label id={id} label={label} />

      <Select
        name={id}
        dir="rtl"
        defaultValue={defaultValue}
        value={formState?.[id] || undefined}
        disabled={disabled}
        onValueChange={handleChange}
      >
        <SelectTrigger
          id={id}
          className={cn(
            "h-fit",
            error?.[id] ? "border-red-600" : "",
            id === "registration-type" ? "h-14" : ""
          )}
        >
          <SelectValue placeholder={placeholder || label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>{label}</SelectLabel> */}
            {items?.map((item) => (
              <SelectItem
                key={item.name}
                defaultValue={defaultValue}
                value={(id.includes("code") && item.code) || item.name}
              >
                <div className="flex items-center">
                  {item.icon && !noicons && (
                    <img
                      src={item.icon}
                      alt={item.name}
                      className={cn(
                        "me-2 lg:me-6 h-auto",
                        id === "registration-type" ? "h-10" : "h-5"
                      )}
                    />
                  )}
                  {item.code && !noicons && (
                    <p className="max-lg:text-xs me-1">{item.code}</p>
                  )}
                  <p>{item.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p
        className={cn(
          "text-sm text-red-600 h-4 transition-opacity duration-300",
          error?.[id] ? "opacity-100" : "opacity-0"
        )}
      >
        {error?.[id] === " " ? "هذا الحقل مطلوب!" : error?.[id]}
      </p>
    </div>
  );
}

export const CustomSelect = ({
  className,
  id,
  register,
  errors,
  options = {},
  sels,
  setValue,
  placeholder,
  defaultValue,
}: any & { placeholder?: string }) => (
  <div>
    <Select
      defaultValue={defaultValue}
      onValueChange={(selected) => setValue && setValue(id, selected)}
    >
      <SelectTrigger
        className={cn(
          errors[id] ? "border-red-500" : "border-gray-300 bg-gray-100",
          className
        )}
        style={{ direction: "rtl" }}
      >
        <SelectValue
          className="text-gray-400"
          placeholder={placeholder}
          id={id}
          {...register(id, options)}
        />
      </SelectTrigger>
      <SelectContent className="flex">
        {sels.map((sel: { name: string; code?: string; image?: string }) => (
          <SelectItem
            key={sel.name}
            className="w-full"
            value={sel.name}
            style={{ direction: "rtl" }}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              {sel.image && (
                <div className="bg-main/15 rounded-full">
                  <img
                    className="size-6"
                    src={sel.image}
                    alt={`${sel.name} image`}
                  />
                </div>
              )}
              <p>{sel.name}</p>

              {sel.code && <p>,{sel.code}</p>}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {errors?.[id] && (
      <span
        className={`absolute text-[10px] font-medium top-full text-red-500`}
      >
        {errors[id]?.message?.toString()}
      </span>
    )}
  </div>
);
