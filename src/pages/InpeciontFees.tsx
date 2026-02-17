import Footer from "@/components/VSC-client/Footer/Footer";
import Main from "@/components/VSC-client/MainWrapper";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/VSC-client/ui/label";
import { vehicleType } from "@/data/selects-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RiyalIcon from "@/components/riyal-icon";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { setCurrentPage } from "@/real-time/utils/utils";
import { useEffect } from "react";

interface InspectionFee {
  vehicleType: string;
  initialInspection: {
    total: number;
    base: number;
    vat: number;
  };
  reInspection: {
    total: number;
    base: number;
    vat: number;
  };
}

interface FormData {
  "vehicle-type": string;
}

export const inspectionFees: InspectionFee[] = [
  {
    vehicleType: "سيارة خاصة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "سيارات الأجرة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "سيارات التأجير",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "مركبة نقل خفيفة خاصة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "مركبة نقل خفيفة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "الدراجات ثنائية العجلات",
    initialInspection: { total: 51.75, base: 45.0, vat: 6.75 },
    reInspection: { total: 17.25, base: 15.0, vat: 2.25 },
  },
  {
    vehicleType: "دراجة ثلاثية او رباعية العجلات",
    initialInspection: { total: 57.5, base: 50.0, vat: 7.5 },
    reInspection: { total: 19.55, base: 17.0, vat: 2.55 },
  },
  {
    vehicleType: "حافلة خفيفة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "حافلة متوسطة",
    initialInspection: { total: 162.15, base: 141.0, vat: 21.15 },
    reInspection: { total: 54.05, base: 47.0, vat: 7.05 },
  },
  {
    vehicleType: "حافلة كبيرة",
    initialInspection: { total: 235.75, base: 205.0, vat: 30.75 },
    reInspection: { total: 78.2, base: 68.0, vat: 10.2 },
  },
  {
    vehicleType: "نقل متوسط",
    initialInspection: { total: 162.15, base: 141.0, vat: 21.15 },
    reInspection: { total: 54.05, base: 47.0, vat: 7.05 },
  },
  {
    vehicleType: "نقل ثقيل",
    initialInspection: { total: 235.75, base: 205.0, vat: 30.75 },
    reInspection: { total: 78.2, base: 68.0, vat: 10.2 },
  },
  {
    vehicleType: "مقطورة خفيفة خاصة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "نصف مقطورة خفيفة خاصة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "نصف مقطورة خفيفة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "نصف مقطورة ثقيلة",
    initialInspection: { total: 211.6, base: 184.0, vat: 27.6 },
    reInspection: { total: 70.15, base: 61.0, vat: 9.15 },
  },
  {
    vehicleType: "مقطورة خفيفة",
    initialInspection: { total: 115.0, base: 100.0, vat: 15.0 },
    reInspection: { total: 37.95, base: 33.0, vat: 4.95 },
  },
  {
    vehicleType: "مقطورة ثقيلة",
    initialInspection: { total: 211.6, base: 184.0, vat: 27.6 },
    reInspection: { total: 70.15, base: 61.0, vat: 9.15 },
  },
  {
    vehicleType: "مركبات أشغال عامة",
    initialInspection: { total: 235.75, base: 205.0, vat: 30.75 },
    reInspection: { total: 78.2, base: 68.0, vat: 10.2 },
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
};

const currentPageName = "معرفة المقابل المالي";

const InpeciontFees = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    defaultValues: { "vehicle-type": "سيارة خاصة" },
  });

  const selectedVehicleType = watch("vehicle-type");
  const selectedVehicle = inspectionFees.find(
    (fee) => fee.vehicleType === selectedVehicleType
  );

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  return (
    <Main>
      <Navbar />
      <main className="py-10 lg:py-24 px-4 container">
        <h2 className="text-xl max-lg:text-center lg:text-3xl font-bold">
          المقابل المالي للفحص الدوري
        </h2>
        <p className="text-green-600 max-lg:text-center font-bold mt-2 mb-4 lg:mb-8">
          قائمة برسوم الفحص لكل انواع المركبات
        </p>

        <form className="space-y-2 max-w-md mx-auto">
          <div className="space-y-2">
            <Label
              htmlFor="vehicle-type"
              className="text-foreground font-semibold"
            >
              نوع المركبة
            </Label>
            <Select
              onValueChange={(value) => setValue("vehicle-type", value)}
              defaultValue="سيارة خاصة"
              dir="rtl"
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
        </form>

        <AnimatePresence mode="wait">
          {selectedVehicle && (
            <motion.div
              key={selectedVehicle.vehicleType}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0 },
              }}
              className="mt-8 max-w-4xl mx-auto grid gap-6 md:grid-cols-2"
            >
              <motion.div
                variants={cardVariants as any}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-800">
                      مبلغ الفحص شامل الضريبة
                    </h3>
                    <p className="text-gray-400">
                      نوع المركبة: {selectedVehicle.vehicleType}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-green-600 whitespace-nowrap">
                    {selectedVehicle.initialInspection.total.toFixed(2)}{" "}
                    <RiyalIcon />
                  </p>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>المقابل المالي للفحص الفني الدوري</span>
                    <span>
                      {selectedVehicle.initialInspection.base.toFixed(2)}{" "}
                      <RiyalIcon className="size-3" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة %15</span>
                    <span>
                      {selectedVehicle.initialInspection.vat.toFixed(2)}{" "}
                      <RiyalIcon className="size-3" />
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants as any}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-800">
                      مبلغ إعادة الفحص شامل الضريبة
                    </h3>
                    <p className="text-gray-400">
                      نوع المركبة: {selectedVehicle.vehicleType}
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-green-600 whitespace-nowrap">
                    {selectedVehicle.reInspection.total.toFixed(2)}{" "}
                    <RiyalIcon />
                  </p>
                </div>
                <hr className="my-4 border-gray-200" />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>المقابل المالي لإعادة الفحص الفني الدوري</span>
                    <span>
                      {selectedVehicle.reInspection.base.toFixed(2)}{" "}
                      <RiyalIcon className="size-3" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ضريبة القيمة المضافة %15</span>
                    <span>
                      {selectedVehicle.reInspection.vat.toFixed(2)}{" "}
                      <RiyalIcon className="size-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          className="mx-auto mt-8 flex bg-[#079455] hover:bg-[#079455]/90 w-fit px-4 rounded-md"
          type="button"
          asChild
        >
          <Link
            to={`/apply?vehicle-type=${selectedVehicleType}`}
            title="حجز موعد"
          >
            <img
              width="40"
              height="40"
              src="/assets/images/when-3.svg"
              alt="register appointment"
            />
            حجز موعد
          </Link>
        </Button>
      </main>
      <Footer />
    </Main>
  );
};

export default InpeciontFees;
