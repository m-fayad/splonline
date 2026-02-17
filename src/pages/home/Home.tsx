import Main from "@/components/VSC-client/MainWrapper";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import Footer from "@/components/VSC-client/Footer/Footer";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";
import Hero from "@/components/ui/home/Hero";
import ShortenAddress from "@/components/ui/home/ShortenAddress";
import RegisterNationalAddress from "@/components/ui/home/RegisterNationalAddress";
import Services from "@/components/ui/home/Services";

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
        <ShortenAddress />
        <RegisterNationalAddress />
        <Services />
      </main>

      <Footer />
    </Main>
  );
}

export default Home;
