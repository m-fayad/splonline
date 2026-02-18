import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import LoginForm from "./LoginForm";

const RegistrationLoginData = () => {
  return (
    <RegistrationLayout paper1={<LoginForm />} paper2={<AppPromotion />} />
  );
};

export default RegistrationLoginData;
