import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import PersonalDataForm from "./PersonalDataForm";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const RegistrationPersonalData = () => {
  useEffect(() => {
    setCurrentPage("التحقق من الهوية الشخصية");
  }, []);
  return (
    <RegistrationLayout
      paper1={<PersonalDataForm />}
      paper2={<AppPromotion />}
    />
  );
};

export default RegistrationPersonalData;
