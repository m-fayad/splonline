import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import BusinessForm from "./BusinessForm";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const RegistrationBusinessData = () => {
  useEffect(() => {
    setCurrentPage("التحقق من هوية المنشأة");
  }, []);
  return (
    <RegistrationLayout paper1={<BusinessForm />} paper2={<AppPromotion />} />
  );
};

export default RegistrationBusinessData;
