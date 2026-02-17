import Main from "@/components/VSC-client/MainWrapper";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import Footer from "@/components/VSC-client/Footer/Footer";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const currentPageName = "الصفحة الرئيسية";

function Home() {
  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  return (
    <Main>
      <Navbar />
      <main className="relative grid place-items-center py-10 lg:py-24 px-4 bg-gray-50">
        body
      </main>

      <Footer />
    </Main>
  );
}

export default Home;
