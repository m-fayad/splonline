import RegistrationLayout from "../components/RegistrationLayout";
import AppPromotion from "../components/AppPromotion";
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
