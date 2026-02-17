import Footer from "@/components/VSC-client/Footer/Footer";
import Main from "@/components/VSC-client/MainWrapper";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import { PropsWithChildren } from "react";

const BookLayout = ({ children }: PropsWithChildren) => {
  return (
    <Main>
      <Navbar />
      <main className="py-10 container mx-auto">
        <h1 className="text-3xl lg:text-5xl font-bold text-main mb-6">
          خدمة الفحص الفني الدوري
        </h1>

        {children}
      </main>
      <Footer />
    </Main>
  );
};
export default BookLayout;
