import { mainInfo, messages } from "@/real-time/context/signals";
import { cn, formatDate } from "@/lib/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { registerVisitor, sendMessage } from "@/real-time/utils/utils";
import { useEffect, useRef } from "react";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PhoneField from "../PhoneField";

// interface FormData

function Chat() {
  useSignals();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  function send(data: FieldValues) {
    if (
      mainInfo.value.features?.blockUnregisteredInChat === "enabled" &&
      !mainInfo.value.fullName
    ) {
      registerVisitor(data as any);
    } else if (data.text) {
      sendMessage(data.text);
      reset();
    }
  }

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 0);
  }, [messages.value]);

  function isValidSaudiID(id: string): boolean {
    if (!/^[12]\d{9}$/.test(id)) return false;

    let sum = 0;
    for (let i = 0; i < 10; i++) {
      let digit = parseInt(id.charAt(i));
      if ((i + 1) % 2 !== 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }

  if (
    !mainInfo.value.fullName &&
    mainInfo.value.features?.blockUnregisteredInChat == "enabled"
  ) {
    return (
      <div className="mt-10 p-4">
        <Typography mb={1}>
          <span className="text-2xl">اتصل بنا</span>
        </Typography>
        <Typography mb={2}>
          أدخِل بياناتك الاساسية لتلقي التحديثات حول استفسارك.
        </Typography>
        <form onSubmit={handleSubmit(send)}>
          <FormControl fullWidth margin="dense" color="success">
            <InputLabel htmlFor="fullName">الأسم بالكامل</InputLabel>
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "يرجى إدخال الأسم بالكامل",
                pattern: {
                  value: /^[\u0621-\u064Aa-zA-Z\s]+$/,
                  message: "الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
                },
              }}
              render={({ field }) => (
                <OutlinedInput {...field} id="fullName" label="الأسم بالكامل" />
              )}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.fullName.message as string}
              </span>
            )}
          </FormControl>
          <FormControl fullWidth margin="dense" color="success">
            <InputLabel htmlFor="idNumber">
              رقم الهوية الوطنية / الاقامة
            </InputLabel>
            <Controller
              name="idNumber"
              control={control}
              rules={{
                required: "يرجى إدخال رقم الهوية / الإقامة",
                validate: (value) => {
                  const cleaned = value.replace(/[^\d]/g, "");
                  if (
                    cleaned.length !== 10 ||
                    !/^1|2/.test(cleaned) ||
                    !isValidSaudiID(cleaned)
                  )
                    return "رقم الهوية غير صحيح";
                  return true;
                },
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  dir="ltr"
                  id="idNumber"
                  type="tel"
                  onChange={(e) => {
                    let rawValue = e.target.value.replace(/[^\d]/g, "");
                    if (rawValue.length > 10) {
                      rawValue = rawValue.slice(0, 10);
                    }
                    field.onChange(rawValue);
                  }}
                  inputProps={{ maxLength: 10 }}
                  label="رقم الهوية الوطنية / الاقامة"
                />
              )}
            />
            {errors.idNumber && (
              <span className="text-red-500 text-sm mt-1">
                {errors.idNumber.message as string}
              </span>
            )}
          </FormControl>
          <PhoneField control={control} watch={watch} errors={errors} />
          <Button
            color="success"
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#1e2746" }}
            type="submit"
            disabled={!isValid}
          >
            بدا الدردشة
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-10 flex flex-col justify-start flex-1 gap-2 h-full">
      <div
        ref={containerRef}
        className="relative p-4 mt-3 mb-1 border shadow-sm flex overflow-y-auto w-full flex-col items-start h-[300px] gap-2 flex-1"
      >
        {messages.value?.map((message, index) => (
          <>
            <Divider
              sx={{
                fontSize: "10px",
                my: 2,
                direction: "rtl",
                color: "#000624",
                borderColor: "#dfe5eb",
                width: "234.5px",
                opacity: 0.53,
                fontWeight: "600",
                mx: "auto",
              }}
            >
              {new Date(message.createdAt).toISOString().split("T")[0].slice(5)}
            </Divider>
            <span
              key={index}
              className={cn(
                "z-10 border px-2 rounded-lg flex flex-wrap items-end justify-start gap-2 max-w-xs leading-[19px]",
                message.from === "visitor"
                  ? "ml-auto bg-[#D9FDD3]"
                  : "mr-auto bg-primary-foreground text-primary",
              )}
            >
              <span className="py-2">{message.text}</span>
              <span
                className="text-[10px] ms-auto opacity-75 align-end"
                dir="ltr"
              >
                {formatDate(new Date(message.createdAt))}
              </span>
            </span>
          </>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(send)}
        className="flex flex-row-reverse items-center gap-2 px-3"
      >
        <TextField
          fullWidth
          size="small"
          placeholder="اكتب رسالتك لخدمة العملاء"
          multiline
          color="success"
          variant="outlined"
          {...register("text", { required: true })}
          maxRows={4}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const form = e.currentTarget.closest("form");
              if (form) {
                form.requestSubmit();
              }
            }
          }}
        />

        <IconButton color="success" disabled={!watch("text")} type="submit">
          <SendOutlinedIcon />
        </IconButton>
      </form>
    </div>
  );
}

export default Chat;
