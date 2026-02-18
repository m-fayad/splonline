import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import PersonalDataForm from "./PersonalDataForm";

const RegistrationPersonalData = () => {
  return (
    <RegistrationLayout
      paper1={<PersonalDataForm />}
      paper2={<AppPromotion />}
    />
  );
};

export default RegistrationPersonalData;
