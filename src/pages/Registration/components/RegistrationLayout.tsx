import Header from "./header";
import AnimatedSvgBg from "./animated-svg-bg";
import Footer from "./footer";
import { Paper, useMediaQuery } from "@mui/material";
import { motion, Variants } from "framer-motion";

interface RegistrationLayoutProps {
  paper1: React.ReactNode;
  paper2: React.ReactNode;
}

const RegistrationLayout = ({ paper1, paper2 }: RegistrationLayoutProps) => {
  const isDesktop = useMediaQuery("(min-width:768px)");

  const box1Variants: Variants = {
    hidden: {
      opacity: 0,
      x: isDesktop ? "-50%" : "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: isDesktop ? 2.2 : 1.4,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const box2Variants: Variants = {
    hidden: {
      opacity: 0,
      x: isDesktop ? "50%" : "100%",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.4,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="grow flex flex-col relative bg-white">
        <AnimatedSvgBg />
        {/* Container fills remaining height (grow) and aligns children (items-stretch) */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-14 grow items-stretch py-8 relative z-10 w-full">
          {/* Box 1: Right in RTL, Left in LTR. Animation: Starts Left(-50%) on Desktop, R(100%) on Mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={box1Variants}
            className="md:flex-1 w-full"
          >
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
                borderRadius: "16px",
                boxShadow: "0 0px 30px rgb(0 0 0 / 12%)",
              }}
            >
              {paper1}
            </Paper>
          </motion.div>

          {/* Box 2: Left in RTL, Right in LTR. Animation: Starts Right(50%) on Desktop, R(100%) on Mobile */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={box2Variants}
            className="md:flex-1 w-full"
          >
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 3,
                borderRadius: "16px",
                boxShadow: "0 0px 30px rgb(0 0 0 / 12%)",
              }}
            >
              {paper2}
            </Paper>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegistrationLayout;
