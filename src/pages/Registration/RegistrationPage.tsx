import RegistrationLayout from "./RegistrationLayout";
import RegistrationTypeSelection from "./RegistrationTypeSelection";
import AppPromotion from "./AppPromotion";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const currentPageName = "تسجيل";

const RegistrationPage = () => {
  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);
  return (
    <RegistrationLayout
      paper1={<RegistrationTypeSelection />}
      paper2={<AppPromotion />}
    />
  );
};

export default RegistrationPage;
