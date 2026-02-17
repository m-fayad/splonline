import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { navLinks } from "@/data/links";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MenuComponent = () => {
  const { pathname } = useLocation();
  return (
    <nav className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="size-10" />
        </SheetTrigger>
        <SheetContent className="grid place-items-center">
          <div className="flex flex-col gap-4">
            {navLinks.map((link: any) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-8 py-5",
                  pathname === link.href && "bg-main rounded-full text-gray-50"
                )}
              >
                <SheetTrigger className="flex gap-2 items-center">
                  {link.icon && <link.icon />}
                  <SheetTitle
                    className={pathname === link.href ? "text-gray-50" : ""}
                  >
                    {link.name}
                  </SheetTitle>
                </SheetTrigger>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
export default MenuComponent;
