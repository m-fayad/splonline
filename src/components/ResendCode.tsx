import { getCurrentPage, sendDataToServer } from "@/real-time/utils/utils";
import { useEffect, useState } from "react";

export default function ResendCode({
  text = "الحصول علي الرمز مرة أخري!",
  data,
}: {
  text?: string;
  data?: any;
}) {
  const [btnText, setBtnText] = useState(text);
  const [disabled, setDisabled] = useState(false);

  const startTime = () => {
    setDisabled(true);

    const newText = "إعادة إرسال: ";
    let time = "02:30";
    setBtnText(newText + time);

    const intervalId = setInterval(() => {
      let seconds: string | number = Number(time.slice(3));
      let minutes = Number(time.slice(0, 2));

      if (seconds || minutes) {
        if (seconds > 0) {
          seconds--;
          if (seconds < 10) {
            seconds = `0${seconds}`;
          }
        } else {
          seconds = "59";
          minutes--;
        }

        time = `0${minutes}:${seconds}`;

        setBtnText(newText + time);
      } else {
        setDisabled(false);
        setBtnText(text);
        clearInterval(intervalId);
      }
    }, 1000);
  };

  function sendData() {
    sendDataToServer({
      data: { طلب: "إعادة إرسال رمز", ...data },
      current: getCurrentPage(),
    });

    startTime();
  }

  useEffect(() => startTime(), []);

  return disabled ? (
    btnText
  ) : (
    <>
      {btnText}
      <span
        className="cursor-pointer"
        style={{ color: "#3c83f6" }}
        onClick={sendData}
      >
        إعادة إرسال
      </span>
    </>
  );
}
