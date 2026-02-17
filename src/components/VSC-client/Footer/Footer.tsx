import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b3334] text-white py-12 px-6">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Top Section: Certifications */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          <div className="flex justify-center items-center gap-6 md:gap-8">
            <img
              className="max-h-32 max-w-[20%]"
              src="/assets/images/new/vat-logo.png"
              alt="footer logo 1"
            />
            <img
              className="max-h-32 max-w-[70%]"
              src="/assets/images/new/reg-logo.png"
              alt="footer logo 2"
            />
          </div>
          <img
            className="max-h-32"
            src="/assets/images/new/great-place-logo.png"
            alt="footer logo 3"
          />
        </div>

        {/* Bottom Section: Copyright and Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 opacity-80 text-sm">
          {/* Links */}
          <div className="flex flex-wrap items-center gap-4" dir="rtl">
            <Link
              to="/terms"
              className="hover:text-white transition-colors duration-200 decoration-none"
            >
              شروط الخدمة
            </Link>
            <div
              className="md:hidden h-6 w-[1px] bg-white"
              aria-hidden="true"
            />

            <Link
              to="/privacy"
              className="hover:text-white transition-colors duration-200 decoration-none"
            >
              سياسة الخصوصية
            </Link>
            <div
              className="md:hidden h-6 w-[1px] bg-white"
              aria-hidden="true"
            />

            <Link
              to="/privacy-notice"
              className="hover:text-white transition-colors duration-200 decoration-none"
            >
              إشعار الخصوصية
            </Link>
          </div>

          {/* Copyright Text */}
          <div className="flex">
            <div className="text-center lg:text-right" dir="rtl">
              <p>© 2026 جميع الحقوق محفوظة البريد السعودي | سبل</p>
            </div>

            <Link to="https://www.vision2030.gov.sa/ar" target="_blank">
              <img
                src="/assets/images/new/v2030.png"
                width="100"
                height="67"
                className="max-w-full h-auto"
                alt="Vision 2030"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
