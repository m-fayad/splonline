import Main from "@/components/Main";
import { navigate } from "@/real-time/utils/utils";
import { HighlightOffTwoTone } from "@mui/icons-material";

export default function Repay() {
  const onClick = () => {
    navigate("الدفع بطاقة الائتمان");
  };

  return (
    <Main button={{ text: "إدخال بطاقة اخرى", onClick }}>
      <div className="flex flex-col gap-2 pb-12 justify-center items-center text-center">
        <div>
          <HighlightOffTwoTone sx={{ width: 65, height: 65 }} color="error" />
        </div>
        <div className="text-xl font-bold">تعذّر إتمام عملية الدفع</div>
        <div className="text-lg">
          لم يتم قبول البطاقة يُرجى استخدام بطاقة دفع أخرى .
        </div>
      </div>
    </Main>
  );
}
