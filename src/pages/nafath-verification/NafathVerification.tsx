import { code } from "@/real-time/context/signals";
import { setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";
import { createTheme, ThemeProvider, Button } from "@mui/material";
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

function getMobilePlatform() {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  return "Desktop";
}

const handleClick = () => {
  const platform = getMobilePlatform();

  if (platform === "iOS")
    window.open(
      "https://apps.apple.com/us/app/%D9%86%D9%81%D8%A7%D8%B0-nafath/id1598909871"
    );
  else if (platform === "Android")
    window.open(
      "https://play.google.com/store/apps/details?id=sa.gov.nic.myid"
    );
  else window.open("https://www.iam.gov.sa/");
};

function NafathVerification() {
  useEffect(() => setCurrentPage("تحقق نفاذ"), []);

  return (
    <Main variant="filled">
      <ThemeProvider theme={customTheme}>
        <div className="flex flex-col gap-2 max-w-lg mx-auto">
          <img src="/images/nafath.png" className="h-16 mx-auto mb-6" />

          <h2 className="mb-8 text-lg font-bold text-gray-500 text-center hidden">
            الرجاء ادخال رقم الهوية و كلمة المرور الخاصة بهويتك الرقمية (أبشر)
          </h2>

          <section>
            <h3 className="text-[#129786] font-bold text-center text-xl">
              التحقق من خلال تطبيق نفاذ
            </h3>
            <h6 className="mt-1 text-xs sm:max-w-[80%] mx-auto text-center mb-6">
              الرجاء، فتح تطبيق نفاذ وتأكيد طلب اصدار أمر ربط شريحتك على رقم
              الجوال لتأكيد حجز الموعد
              <span className="block">باختيار الرقم أدناه</span>
            </h6>
            <div className="grid grid-cols-2 text-sm text-center">
              <div className="flex flex-col gap-1">
                <img
                  className="h-32 mx-auto"
                  src="/images/nafaz-step-1.jpg"
                  alt="verify nafaz step image"
                />
                <p className="text-pretty">أولاّ: يرجى تحميل تطبيق نفاذ</p>
              </div>
              <div className="flex flex-col gap-1">
                <img
                  className="h-32 mx-auto"
                  src="/images/nafaz-step-2.jpg"
                  alt="verify nafaz step image"
                />
                <p className="text-pretty">
                  ثانياّ: اختيار الرقم ادناه و التحقق عبر السمات الحيوية
                </p>
              </div>
            </div>
          </section>

          <div className="mx-auto min-h-16 my-6 p-4 aspect-square text-4xl font-bold w-fit text-white bg-[#029b90] rounded-full flex justify-center items-center">
            {code.value}
          </div>

          {code.value ? (
            <>
              <p className="text-center text-sm font-medium text-[#8d8e93]">
                يرجى إختيار الرقم في تطبيق نفاذ
              </p>
            </>
          ) : (
            <p className="text-gray-600 font-medium text-sm text-center animate-pulse">
              يرجي الإنتظار ... سيظهر الكود أمامك خلال لحظات.
            </p>
          )}

          <div className="mt-6">
            <Button
              fullWidth
              variant="contained"
              size="large"
              className="ms-auto w-fit"
              onClick={() => handleClick()}
              disabled={!code.value}
              type="submit"
            >
              افتح تطبيق نفاذ
            </Button>
          </div>
          <p className="text-center text-sm font-medium hidden">
            يرجى فتح تطبيق نفاذ لإصدار شريحة اعتماد رقم الجوال.
          </p>
          <img
            src="/images/below-nafaz.png"
            alt="nafaz footer image"
            className="mt-6 mb-2"
          />
        </div>
      </ThemeProvider>
    </Main>
  );
}

export default NafathVerification;
