import { cn } from "@/lib/utils";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    {
      name: "الأفراد",
      href: "/",
    },
    {
      name: "الأعمال",
      href: "/enterprise",
    },
  ];
  // sendDataToServer({
  //   data: {},
  //   current: mainInfo.value.page || "الصفحة الرئيسية",
  //   nextPage: nextPage,
  //   waitingForAdminResponse: false,
  //   navigate,
  // });

  return (
    <header>
      <nav className="border-b-4 border-b-[#136e82] bg-[#153c3f]">
        <div className="md:container flex items-center h-10 md:h-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  `px-4 md:px-6 h-full flex items-center transition-colors text-sm`,
                  {
                    "text-white bg-[#146e82] font-semibold": isActive,
                    "text-white/50 hover:text-white hover:bg-[#146e82]/50":
                      !isActive,
                  },
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="bg-white container flex justify-between gap-4 items-center">
        <img src="/assets/images/new/logo.svg" alt="logo" />

        <div className="flex items-center">
          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              border: { md: "2px solid #146e82" },
              borderRadius: "0",
              padding: ".6rem 1.5rem",
              "&:hover": {
                backgroundColor: "#146e82",
                color: "white",
              },
            }}
            onClick={() => navigate("/registration-login")}
          >
            دخول
          </Button>

          <div
            className="md:hidden h-6 w-[1px] bg-[#146e82]/20"
            aria-hidden="true"
          />

          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              padding: ".6rem 1.5rem",
              "&:hover": {
                backgroundColor: "rgba(20, 110, 130, 0.04)",
              },
            }}
            onClick={() => navigate("/registration-login")}
          >
            تسجيل
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
