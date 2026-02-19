import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const RegistrationLoginData = () => {
  useEffect(() => {
    setCurrentPage("تسجيل بيانات الدخول");
  }, []);
  return (
    <RegistrationLayout paper1={<LoginForm />} paper2={<AppPromotion />} />
  );
};

export default RegistrationLoginData;
