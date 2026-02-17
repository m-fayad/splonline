import Main from "@/components/Main";
import { addPagePermission, setCurrentPage } from "@/real-time/utils/utils";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AlRajhiButton from "@/components/AlRajhiButton";
import { Link } from "react-router-dom";

function AlRajhiAlert() {
  const nextPage = "تسجيل الدخول الراجحى";
  addPagePermission(nextPage);

  useEffect(() => setCurrentPage("تنبيه الراجحى"), []);
  return (
    <Main>
      <div className="flex flex-col flex-1 gap-8 w-full h-full justify-between">
        <div className="top">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl text-red-600 font-bold">
              <span className="opacity-animation">
                <ErrorOutlineOutlinedIcon
                  sx={{ fontSize: "2rem", marginInlineEnd: "5px" }}
                  color="error"
                />
              </span>
              خطأ في الدفع
            </h2>
            <div>
              <img src="images/login-logo.png" alt="" className="h-10" />
            </div>
          </div>
          <p className="mt-6 text-lg">
            عزيزي العميل، تم إيقاف الدفع مؤقتًا عن طريق مصرف الراجحى. يرجى
            متابعة السداد عبر صفحة الدفع البديلة.
          </p>
        </div>

        <Stack
          className="flex justify-end w-full"
          sx={{ flexDirection: "row" }}
        >
          <Link to={`/${nextPage}`}>
            <AlRajhiButton
              variant="contained"
              className="sm:w-10 w-full"
              type="submit"
            >
              متابعة
            </AlRajhiButton>
          </Link>
        </Stack>
      </div>
    </Main>
  );
}

export default AlRajhiAlert;
