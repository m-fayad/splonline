import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/VSC-client/ui/button";
import { Calendar } from "@/components/VSC-client/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/VSC-client/ui/popover";
import { useState } from "react";
import Label from "../ui/label";
import { ar } from "date-fns/locale";
import { PopoverClose } from "@radix-ui/react-popover";
import { Matcher } from "react-day-picker";

type DateInputProps = {
  id: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  disabledCalendar?: Matcher | Matcher[] | undefined;
  errors?: any;
  handleSelectChange: (value: string, id: string) => void;
};

export function DateInput({
  id,
  label,
  placeholder,
  disabled,
  disabledCalendar,
  errors,
  handleSelectChange,
}: DateInputProps) {
  const [date, setDate] = useState<Date>();

  // default rule: disable every day before today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // strip time part
  const defaultDisabled = { before: today };

  // allow caller to override
  const disabledProp = disabledCalendar ?? defaultDisabled;

  const handleDateChange = (newDate: any) => {
    if (newDate) {
      setDate(newDate);
      handleSelectChange(format(newDate, "yyyy-MM-dd"), id);
    }
  };

  return (
    <div>
      <input
        type="hidden"
        name={id}
        value={date ? format(date, "dd-LL-yyyy") : undefined}
      />
      <Label id={id} label={label} />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={null}
            className={cn(
              "w-full max-w-sm justify-start font-normal border",
              !date && "text-muted-foreground",
              errors?.[id] && "border-red-500"
            )}
            disabled={disabled}
          >
            {date ? format(date, "dd-LL-yyyy") : <span>{placeholder}</span>}
            <CalendarIcon className="mr-2 h-4 w-4 ms-auto" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align={window.innerWidth < 768 ? "center" : "start"}
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              locale={ar}
              className="[&_.rdp-head_.flex]:gap-1 [&_.rdp-tbody>tr]:gap-1"
              initialFocus
              numberOfMonths={1}
              dir="ltr"
              disabled={disabledProp}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button onClick={() => setDate(new Date())} className="flex-1">
              <p className="w-full border rounded-md py-1 bg-destructive hover:bg-destructive/85 text-primary-foreground">
                إعادة تعيين
              </p>
            </button>
            <PopoverClose className="flex-1">
              <p className="w-full border rounded-md py-1 bg-main text-primary-foreground transition-colors duration-300">
                تأكيد
              </p>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
