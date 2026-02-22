import { adminLoading, loading } from "@/real-time/context/signals";
import { useSignals } from "@preact/signals-react/runtime";
import { ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import "./Main.css";
import { Button } from "@mui/material";

function Main({
  children,
  variant = "standard",
  button,
}: {
  children: ReactNode;
  variant?: "filled" | "standard" | "al-rajhi";
  button?: {
    text: string;
    disabled?: boolean;
    onClick?: (e: React.FormEventHandler<HTMLButtonElement>) => void;
    onSubmit?: (e: React.FormEventHandler<HTMLButtonElement>) => void;
  };
}) {
  useSignals();

  const formBoxClasses = {
    standard: "sm:min-w-[550px] sm:p-10 sm:border-2",
    filled: "max-w-lg p-8 border-2",
    "al-rajhi": "",
  };

  return (
    // justify-between
    <section
      className={`main flex sm:justify-center sm:items-center w-full flex-wrap h-full px-3 py-6 ${variant === "al-rajhi" ? "bg-white" : ""}`}
      style={{ flexDirection: "column" }}
    >
      {/* <DiMeteor /> */}
      {/* <div> */}
      <img
        src="/assets/images/new/logo.svg"
        alt="logo"
        className="mb-6"
        height="40px"
      />
      <div
        className={` sm:min-w-[550px] sm:w-fit w-full relative overflow-hidden rounded-xl ${formBoxClasses[variant]}`}
        // style={{ height: "calc(100dvh - 1.5rem - 39.6px - 3rem)" }}
      >
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
        {children}
        {button?.text && (
          <div className="hidden sm:block bol text-end">
            <Button
              variant="contained"
              disabled={button.disabled}
              onClick={button.onClick as any}
              onSubmit={button.onSubmit as any}
              type="submit"
              sx={{
                backgroundColor: "#1e2746",
              }}
            >
              {button.text}
            </Button>
          </div>
        )}
      </div>
      {/* </div> */}
      {button?.text && (
        <div className="fixed bottom-[3rem] right-0 w-full px-3 sm:hidden">
          <Button
            fullWidth
            variant="contained"
            disabled={button.disabled}
            onClick={button.onClick as any}
            onSubmit={button.onSubmit as any}
            type="submit"
            size="large"
            sx={{
              backgroundColor: "#1e2746",
            }}
          >
            {button.text}
          </Button>
        </div>
      )}
      {/* {isChat.value && isChatAvailable.value && (
          <div className="h-[500px] w-[400px] shadow-xl p-3 bg-white border fixed top-16 right-10 border-gray-300  rounded-xl">
            <Chat />
          </div>
        )}
        {isChatAvailable.value && (
          <div
            className={`fixed hover:scale-95 transition-all right-10 bottom-10 p-2 text-3xl aspect-square rounded-full cursor-pointer  text-white ${
              isChat.value ? "bg-main" : " bg-gray-600"
            }`}
            onClick={() => (isChat.value = !isChat.value)}
          >
            <IoMdChatbubbles />
            {isNewMessage.value > 0 && (
              <div className="absolute text-[10px] font-bold -top-1 right-0 w-4 h-4  rounded-full flex justify-center items-center text-white bg-orange-500">
                {isNewMessage.value}
              </div>
            )}
          </div>
        )} */}
    </section>
  );
}

export default Main;
