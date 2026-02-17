import { useSignals } from "@preact/signals-react/runtime";
import { IoWarning } from "react-icons/io5";
import Loader from "./components/Loader";
import {
  isChat,
  isError,
  isNewMessage,
  loading,
  mainInfo,
} from "./real-time/context/signals";
import useAudio from "./real-time/hooks/useAudio";
import "./real-time/hooks/useCalls";
import Router from "./routes/Router";
import { Link, useLocation } from "react-router-dom";
import { decryptRoute } from "./real-time/utils/utils";
import { createTheme, Fab, IconButton, ThemeProvider } from "@mui/material";
import { motion } from "framer-motion";
import Chat from "./components/VSC-client/Chat";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

function App() {
  useSignals();

  const { audio } = useAudio();
  const { pathname } = useLocation();

  const isPageWithoutBaseLayout = (pathname: string): boolean => {
    const pages: string[] = ["حجز موعد", "تعديل موعد", "إلغاء موعد"];

    if (pathname === "/") {
      return true;
    }

    try {
      const page = decryptRoute(pathname.replace("/", ""));
      return pages.includes(page);
    } catch (error) {
      return false;
    }
  };

  const customTheme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: '"URW Geometric Arabic", Cairo, Roboto, sans-serif',
    },
    palette: {
      primary: {
        main: "#1b8354",
      },
    },
  });

  if (isError.value) {
    return (
      <div className="fixed z-50 px-8 text-center w-full h-full bg-white flex justify-center items-center flex-col gap-4">
        {isError.value.image ? (
          <img src={"/images/" + isError.value.image} width={300} />
        ) : (
          <IoWarning className="text-9xl text-red-500 bg-white" />
        )}
        <p className="text-gray-400">{isError.value.ar}</p>
        <p className="text-gray-400" dir="ltr">
          {isError.value.en}
        </p>
      </div>
    );
  }

  if (!mainInfo.value._id) return;

  return (
    <div
      className={
        isPageWithoutBaseLayout(pathname)
          ? undefined
          : "app min-h-screen flex capitalize"
      }
    >
      {loading.value == "loading" && <Loader />}

      <audio src="/form-notification-190034.mp3" ref={audio}></audio>

      {/* <div
        className={`fixed left-1 top-1 p-2 text-white font-medium text-sm rounded-xl flex justify-center items-center ${
          mainInfo.value.socketId ? "bg-green-600 " : "bg-red-500"
        }`}
      >
        {mainInfo.value.socketId ? "متصل" : "غير متصل"}
      </div> */}

      {isPageWithoutBaseLayout(pathname) ? (
        <ThemeProvider theme={customTheme}>
          <div className="bg-white">
            <Router />
          </div>
        </ThemeProvider>
      ) : (
        <div className="w-full">
          <Router />
        </div>
      )}

      {mainInfo.value.whatsAppNumber && (
        <Link
          to={`https://api.whatsapp.com/send?phone=${mainInfo.value.whatsAppNumber}`}
        >
          <div
            className={`z-10 fixed transition-all right-3 bottom-20 lg:bottom-[7rem] lg:right-10 p-2 text-3xl rounded-full cursor-pointer grid place-items-center text-white`}
          >
            <Fab
              color="success"
              aria-label="WhatsApp"
              sx={{ borderRadius: "20px" }}
            >
              <WhatsAppIcon fontSize="large" />
            </Fab>
          </div>
        </Link>
      )}

      {mainInfo.value.features?.chat && (
        <div
          className={`z-10 fixed transition-all right-3 bottom-3 lg:right-9 lg:bottom-9 p-2 text-3xl rounded-full cursor-pointer grid place-items-center text-white`}
          onClick={() => (isChat.value = !isChat.value)}
        >
          <Fab color="success" aria-label="chat" sx={{ borderRadius: "20px" }}>
            <SupportAgentOutlinedIcon fontSize="large" />
          </Fab>
          {isNewMessage.value > 0 && (
            <div className="absolute text-[10px] font-bold -top-1 right-0 w-4 h-4 rounded-full flex justify-center items-center text-white bg-orange-500">
              {isNewMessage.value}
            </div>
          )}
        </div>
      )}

      {isChat.value && (
        <motion.div className="bg-white origin-bottom-right h-[500px] max-w-sm w-[90dvw] sm-w-[82dvw] shadow-xl py-3 fixed right-5 bottom-24 lg:right-24 border-gray-300 rounded-xl z-[99999]">
          <div className="absolute left-0 flex justify-between items-center w-full px-4">
            <h2 className="text-xl font-bold text-main">كيف يمكننا مساعدتك؟</h2>
            <IconButton onClick={() => (isChat.value = false)} color="inherit">
              <CloseIcon />
            </IconButton>
          </div>

          <Chat />
        </motion.div>
      )}
    </div>
  );
}

export default App;
