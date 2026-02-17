import { cn } from "@/lib/utils";
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
    <header className="border-b-2 border-b-[#136e82] bg-[#153c3f] h-10 flex items-center">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              `px-4 h-full flex items-center transition-colors text-sm`,
              {
                "text-white bg-[#146e82]": isActive,
                "text-white/50 hover:text-white hover:bg-[#146e82]/50":
                  !isActive,
              },
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </header>
  );
};

export default Navbar;
