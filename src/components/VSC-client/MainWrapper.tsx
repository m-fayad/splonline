import { ReactNode, useEffect } from "react";
import {
  adminLoading,
  loading,
  mainInfo,
  form,
} from "@/real-time/context/signals";
import { Toaster } from "./ui/toaster";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import useScrollTop4Nav from "@/hooks/useScrollTop4Nav";
import { useSignals } from "@preact/signals-react/runtime";
import { Loader } from "lucide-react";

function Main({ children }: { children: ReactNode }) {
  useSignals();
  const { toast } = useToast();
  useEffect(() => {
    if (form.value.includes("Admin Rejected"))
      toast({
        description: "الرجاء التاكد من المعلومات الخاصة بك والمحاولة مرة اخرى",
        action: <ToastAction altText="Goto toast undo">إزالة</ToastAction>,
      });
  }, [form.value, toast]);

  useScrollTop4Nav();

  return (
    <section>
      <Toaster />

      {(adminLoading.value === "wait" || loading.value === "wait") && (
        <div className="fixed z-[99999] cursor-wait left-0 top-0 w-full h-full bg-white bg-opacity-90 flex justify-center items-center flex-col gap-4">
          <Loader className="animate-spin text-main size-10" />
          <span className="text-xs font-medium">
            يرجى الانتظار جاري التأكد من صحه البيانات المدخلة...
          </span>
        </div>
      )}

      <div
        className={`hidden z-[99999] fixed right-0 top-20 p-2 text-white font-medium text-sm rounded-tl-xl rounded-bl-xl justify-center items-center ${
          mainInfo.value ? "bg-green-600 " : "bg-red-500"
        }`}
      >
        {mainInfo.value ? "connected" : "disconnected"}
      </div>

      {children}

      {/* <div
        className={`z-[99999] fixed hover:scale-95 transition-all right-3 bottom-3 lg:right-10 lg:bottom-10 p-2 text-3xl rounded-full cursor-pointer grid place-items-center text-white`}
        onClick={() => (isChat.value = !isChat.value)}
      >
        <div className="bg-main rounded-full p-2">
          <img
            src="/assets/animated-chat.svg"
            alt="chat icon"
            className="h-10 mx-auto"
          />
        </div>
        {isNewMessage.value > 0 && (
          <div className="absolute text-[10px] font-bold -top-1 right-0 w-4 h-4 rounded-full flex justify-center items-center text-white bg-orange-500">
            {isNewMessage.value}
          </div>
        )}
      </div>

      {isChat.value && (
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-gray-200 origin-bottom-right h-[500px] max-w-sm w-[82dvw] shadow-xl p-3 border fixed bottom-20 right-10 lg:bottom-24 lg:right-24 border-gray-300  rounded-xl z-[99999]"
        >
          <div
            onClick={() => (isChat.value = false)}
            className="absolute left-3 top-3 rounded-full bg-main p-3 shadow-md grid place-items-center cursor-pointer"
          >
            <X className="w-4 h-4 text-primary-foreground/75" />
          </div>
          <h2 className="absolute text-xl font-bold left-1/2 -translate-x-1/2 top-5 text-main">
            خدمة العملاء
          </h2>

          <Chat />
        </motion.div>
      )} */}
    </section>
  );
}

export default Main;
