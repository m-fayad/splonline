import { cn } from "@/lib/utils";
import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
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
            console.log(pathname);
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

      <div className="flex justify-between gap-4 items-center">
        <img src="/assets/images/new/logo.svg" alt="logo" />

        <div className="flex items-center">
          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              border: { md: "1px solid #146e82" },
              "&:hover": {
                border: { md: "1px solid #146e82" },
                backgroundColor: "rgba(20, 110, 130, 0.04)",
              },
            }}
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
              "&:hover": {
                backgroundColor: "rgba(20, 110, 130, 0.04)",
              },
            }}
          >
            تسجيل
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
