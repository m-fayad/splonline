import RegistrationLayout from "./RegistrationLayout";
import RegistrationTypeSelection from "./RegistrationTypeSelection";
import AppPromotion from "./AppPromotion";

const RegistrationPage = () => {
  return (
    <RegistrationLayout
      paper1={<RegistrationTypeSelection />}
      paper2={<AppPromotion />}
    />
  );
};

export default RegistrationPage;
