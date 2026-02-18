import RegistrationLayout from "./RegistrationLayout";
import AppPromotion from "./AppPromotion";
import BusinessForm from "./BusinessForm";

const RegistrationBusinessData = () => {
  return (
    <RegistrationLayout paper1={<BusinessForm />} paper2={<AppPromotion />} />
  );
};

export default RegistrationBusinessData;
