import Main from "@/components/VSC-client/MainWrapper";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import Footer from "@/components/VSC-client/Footer/Footer";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";
import Hero from "@/components/ui/home/Hero";

const currentPageName = "الصفحة الرئيسية";

function Home() {
  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  return (
    <Main>
      <Navbar />
      <main>
        <Hero />
      </main>

      <Footer />
    </Main>
  );
}

export default Home;
