import Main from "@/components/Main";
import { mainInfo } from "@/real-time/context/signals";
import { CheckCircleTwoTone } from "@mui/icons-material";

export default function Thank() {
  return (
    <Main>
      <div className="flex flex-col gap-2 pb-12 justify-center items-center text-center">
        <div>
          <CheckCircleTwoTone sx={{ width: 65, height: 65 }} color="success" />
        </div>
        <div className="text-xl font-bold">
          شكرًا لكم، تم إتمام التسجيل بنجاح عبر موقع سبل - العنوان الوطني.
        </div>
        <div className="text-lg">
          سيتم معالجة طلبكم وفق البيانات المدخلة، وسيتم إشعاركم عند وجود أي
          تحديث .
          <br />
          رقم المرجعي: {mainInfo.value.visitorNumber}
        </div>
      </div>
    </Main>
  );
}
