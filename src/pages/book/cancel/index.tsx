import BookLayout from "../layout";
import CancelForm from "./CancelForm";

export const metadata = {
  title: "إلغاء موعد",
  description:
    "ألغى موعد فحص فني دوري لمركبتك عبر خدمة الفحص الفني الدوري من مركز سلامة المركبات",
};

const Cancel = () => {
  return (
    <BookLayout>
      <h2 className="text-2xl lg:text-4xl text-main font-semibold mb-10">
        إلغاء موعد
      </h2>

      <CancelForm />
    </BookLayout>
  );
};
export default Cancel;
