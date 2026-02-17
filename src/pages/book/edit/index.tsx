import BookLayout from "../layout";
import EditForm from "./EditForm";

export const metadata = {
  title: "تعديل موعد",
  description:
    "عدل موعد فحص فني دوري لمركبتك عبر خدمة الفحص الفني الدوري من مركز سلامة المركبات",
};

const Edit = () => {
  return (
    <BookLayout>
      <h2 className="text-2xl lg:text-4xl text-main font-semibold mb-10">
        تعديل موعد
      </h2>

      <EditForm />
    </BookLayout>
  );
};
export default Edit;
