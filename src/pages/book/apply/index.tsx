import BookLayout from "../layout";
import ApplyForm from "./ApplyForm";

export const metadata = {
  title: "حجز موعد",
  description:
    "احجز موعد فحص فني دوري لمركبتك عبر خدمة الفحص الفني الدوري من مركز سلامة المركبات",
};

const ApplyPage = () => {
  return (
    <BookLayout>
      <h2 className="text-2xl lg:text-4xl text-main font-semibold mb-10">
        حجز موعد
      </h2>

      <ApplyForm />
    </BookLayout>
  );
};
export default ApplyPage;
