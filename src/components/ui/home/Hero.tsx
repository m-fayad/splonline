import { encryptRoute } from "@/real-time/utils/utils";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[600px] lg:min-h-[540px] md:pb-10 flex flex-col md:items-center overflow-hidden font-['Tajawal']
      border-b-8 border-[#1e2746]"
      dir="rtl"
    >
      {/* Background and Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/assets/images/new/na-bnner-v2.jpg"
          alt="National Address Banner"
          className="w-full h-full max-w-full object-cover md:object-fill object-left"
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(43, 50, 103, 0.2), rgba(9, 134, 160, 0.9) 40%)",
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="px-6 md:px-24 pt-6 md:pt-8 lg:pb-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full text-right">
        {/* Right Content (Start Side) */}
        <div className="flex flex-col justify-center items-start text-white space-y-3 md:space-y-6 lg:pr-8">
          {/* Logo */}
          <div className="mb-2 w-[65%] max-w-[190px]">
            <img
              src="/assets/images/new/logo-ar.svg"
              alt="National Address Logo"
              className="object-contain"
            />
          </div>

          {/* Heading using MUI Typography */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: "20px", lg: "50px" },
              lineHeight: "1.25",
              maxWidth: "32rem",
            }}
          >
            عنوانك هو هويتك المكانية الإلزامية…
          </Typography>

          {/* Subtext using MUI Typography */}
          <Typography
            variant="body1"
            sx={{
              color: "#eff6ff",
              opacity: 0.9,
              fontSize: { xs: "18px", lg: "25px" },
              lineHeight: 1.625,
              maxWidth: "36rem",
              fontFamily: "inherit",
            }}
          >
            العنوان الوطني يضمن وصول شحناتك ومعاملاتك بسرعة وموثوقية. ابتداءً من
            1 يناير 2026 سيصبح استخدامه إلزاميًا لكل فرد وجهة.
          </Typography>
        </div>

        {/* Left Content (Spacer for Desktop Visuals) */}
        <div className="hidden lg:block relative">
          {/* This area is left empty because the background image has the subject here */}
        </div>
      </div>
      {/* Button using MUI Component */}
      <Link to={encryptRoute("تسجيل")}>
        <Button
          variant="contained"
          size="large"
          sx={{
            width: "fit-content",
            backgroundColor: "#1e2746",
            "&:hover": {
              backgroundColor: "#2a365f",
              transform: "translateY(-4px)",
            },
            marginInline: "auto",
            ml: { xs: 4, md: 0 },
            mt: { xs: 2, md: 0 },
            color: "white",
            padding: "1rem 6rem",
            fontSize: "1.125rem",
            fontWeight: "bold",
            transition: "all 0.3s ease-in-out",
            fontFamily: "inherit",
          }}
        >
          سجّل الآن
        </Button>
      </Link>
    </section>
  );
};

export default Hero;
