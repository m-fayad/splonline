import { Button } from "@mui/material";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/assets/images/new/logo.svg"
            alt="SPL Logo"
            className="h-20 w-auto"
          />
        </div>

        <div className="flex items-center">
          <Button
            variant="text"
            sx={{
              color: "#146e82",
              padding: { xs: "0.15rem 1.2rem", md: "0.6rem 1.5rem" },
              fontWeight: "bold",
              border: "2px solid #146e82",
              borderRadius: "0",
              "&:hover": {
                backgroundColor: "#146e82",
                color: "white",
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

export default Header;
