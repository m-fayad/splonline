import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const WelcomeDialog = () => {
  const countDownDate = new Date().setHours(23, 59, 59, 0);
  const [timer, setTimer] = useState<string>(
    `${String(
      Math.floor((countDownDate - new Date().getTime()) / 1000 / 60 / 60)
    ).padStart(2, "0")}:${String(
      Math.floor((countDownDate - new Date().getTime()) / 1000 / 60) % 60
    ).padStart(2, "0")}:${String(
      Math.floor((countDownDate - new Date().getTime()) / 1000) % 60
    ).padStart(2, "0")}`
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date().getTime();
      if (now >= countDownDate) {
        setTimer("Time's up!");
      } else {
        setTimer(
          `${String(
            Math.floor((countDownDate - now) / 1000 / 60 / 60)
          ).padStart(2, "0")}:${String(
            Math.floor((countDownDate - now) / 1000 / 60) % 60
          ).padStart(2, "0")}:${String(
            Math.floor((countDownDate - now) / 1000) % 60
          ).padStart(2, "0")}`
        );
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-[90dvw] sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-main text-2xl [text-shadow:2px_2px_20px_rgba(0,0,0,0.2)]">
            <img
              src="/assets/images/welcome-dialog.png"
              alt="welcome dialog image"
              className="w-full max-h-[40dvh]"
            />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 items-center p-4">
          <DialogTitle>سارع قبل نهاية العرض!</DialogTitle>
          <DialogDescription>يتبقى علي إنتهاء العرض</DialogDescription>

          <span
            className={cn(
              "text-3xl text-green-600 mt-4 font-bold",
              timer === "Time's up!" && "text-red-500"
            )}
          >
            {timer}
          </span>
        </div>

        <DialogClose>
          <Button
            className="w-fit bg-gray-500 px-20 rounded-lg shadow-md transition-colors duration-500"
            type="button"
          >
            إغلاق
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
