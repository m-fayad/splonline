const Footer = () => {
  return (
    <footer className="bg-[#153C3F] text-white pt-8 pb-6">
      {/* Copyright Text */}
      <div className="container flex flex-col md:flex-row items-center gap-4 justify-between">
        <p>©️ 2026 جميع الحقوق محفوظة لمؤسسة البريد السعودي - سُـبل</p>
        <p>
          عند استخدامك هذا الموقع، فإنك توافق على{" "}
          <span className="cursor-pointer text-[#00c8e1]">شروط الخدمة</span> و{" "}
          <span className="cursor-pointer text-[#00c8e1]">سياسة الخصوصية</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
