import RegistrationLayout from "../components/RegistrationLayout";
import AppPromotion from "../components/AppPromotion";
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
