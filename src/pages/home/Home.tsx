import Main from "@/components/VSC-client/MainWrapper";
import { Link } from "react-router-dom";
import Heading from "@/components/VSC-client/Heading/Heading";
import Parag from "@/components/VSC-client/Parag/Parag";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/VSC-client/Navbar/Navbar";
import Footer from "@/components/VSC-client/Footer/Footer";
import when1 from "/assets/images/when-1.svg";
import when2 from "/assets/images/when-2.svg";
import when3 from "/assets/images/when-3.svg";
import service1 from "/assets/images/service-1.svg";
import service2 from "/assets/images/service-2.svg";
import service3 from "/assets/images/service-3.svg";
import PreStep1 from "/assets/images/prestep-1.svg";
import PreStep2 from "/assets/images/prestep-2.svg";
import PreStep3 from "/assets/images/prestep-3.svg";
import { useEffect } from "react";
import { setCurrentPage } from "@/real-time/utils/utils";

const currentPageName = "الصفحة الرئيسية";

function Home() {
  const whens = [
    {
      icon: when1,
      title: "بشكل دوري",
      description: "يجب فحص المركبة بشكل دوري قبل انتهاء صلاحية الفحص",
    },
    {
      icon: when2,
      title: "عند نقل ملكية المركبة",
      description: "في حال عدم وجود فحص فني دوري ساري للمركبة",
    },
    {
      icon: when3,
      title: "المركبات الأجنبية",
      description:
        "خلال 15 يوم من تاريخ دخولها إلى المملكة في حال عدم وجود فحص فني ساري من خارج المملكة",
    },
  ];

  const services = [
    {
      icon: service1,
      title: "حجز موعد الفحص",
      description:
        "تتيح المنصة لأصحاب المركبات حجز ومتابعة مواعيد الفحص وإعادة الفحص للمركبات الخاصة بهم.",
      buttonText: "حجز موعد",
      href: "/apply",
    },
    {
      icon: service2,
      title: "تعديل موعد الفحص",
      description: "تتيح للأفراد والمنشآت تعديل موعد الفحص السابق حجزها.",
      buttonText: "تعديل موعد",
      href: "/edit",
    },
    {
      icon: service3,
      title: "إلغاء موعد الفحص",
      description:
        "يمكن لأصحاب المركبات من أفراد ومؤسسات إلغاء موعد الفحص السابق حجزها.",
      buttonText: "إلغاء موعد",
      href: "/cancel",
    },
  ];

  const preRegisterSteps = [
    {
      icon: PreStep1,
      title: "حجز موعد الفحص",
      description: "حجز وإدارة المواعيد عبر المنصة بكل سهولة.",
    },
    {
      icon: PreStep2,
      title: "فحص المركبة",
      description:
        "بعد تأكيد حجز الموعد إلكترونياً، يتم التوجه إلى موقع الفحص ليتم فحص المركبة.",
    },
    {
      icon: PreStep3,
      title: "استلام نتيجة الفحص",
      description:
        "ستصلك نتيجة الفحص فور الانتهاء عبر رسالة نصية SMS، إذا كانت النتيجة اجتياز المركبة للفحص سيتم وضع ملصق الفحص على الزجاج الأمامي، أما لو كانت النتيجة عدم اجتياز سيكون لديك فرصتين لإعادة الفحص خلال 14 يوم عمل بالسعر المخصص للإعادة مع التأكيد على ضرورة حجز موعد لإعادة الفحص",
    },
  ];

  const titleStyle = "text-xl max-lg:text-center lg:text-3xl font-bold mb-8";

  useEffect(() => {
    setCurrentPage(currentPageName);
  }, []);

  return (
    <Main>
      <Navbar />
      <main className="relative grid place-items-center py-10 lg:py-24 px-4 bg-gray-50">
        <div className="lg:flex gap-20 container relative">
          <div className="relative z-10 flex flex-col items-center grow text-center">
            <p className="text-green-600 font-bold">
              أحد منتجات مركز سلامة المركبات
            </p>
            <Heading className="max-w-md text-4xl text-black">
              المنصة الموحدة لمواعيد الفحص الفني الدوري للمركبات
            </Heading>
            <Parag className="max-w-md mt-4 font-bold">
              تتيح المنصة حجز وإدارة مواعيد الفحص الفني الدوري للمركبات لدى جميع
              الجهات المرخصة من المواصفات السعودية لتقديم الخدمة
            </Parag>
            <Link to="/حجز موعد">
              <Button className="mt-6 bg-green-800 hover:bg-green-800/80">
                حجز موعد
              </Button>
            </Link>
            <Link to="/تعديل موعد">
              <Button variant="outline" className="mt-6">
                تعديل موعد
              </Button>
            </Link>
            <Link to="/إلغاء موعد">
              <Button className="mt-6 bg-destructive-foreground border border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive">
                إلغاء موعد
              </Button>
            </Link>
          </div>

          <div className="basis-1/2 max-lg:w-[80%] max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:right-1/2 max-lg:translate-x-1/2 max-lg:opacity-15">
            <img
              src="/assets/images/bg.png"
              alt="hero image"
              className="w-full h-auto"
            />
          </div>
        </div>
      </main>

      {/* <section className="py-10">
        <div className="container flex flex-col">
          <h2 className={titleStyle}>
            تريد معرفة المقابل المالي للفحص الدوري؟
          </h2>

          <Button className="self-center bg-main w-fit px-4 rounded-md" asChild>
            <Link to="/inspection-fees" title="معرفة المقابل المالي">
              معرفة المقابل المالي
            </Link>
          </Button>
        </div>
      </section> */}

      <section className="bg-gray-50 py-10">
        <div className="container flex flex-col">
          <h2 className={titleStyle}>متى يجب فحص المركبة</h2>

          <div className="flex gap-4 flex-col lg:flex-row">
            {whens.map((when) => (
              <div
                key={when.title}
                className="bg-white p-4 flex-1 flex flex-col items-center gap-2 text-center shadow rounded-2xl"
              >
                <img src={when.icon} alt={`${when.title} icon`} />
                <h4 className="lg:text-2xl font-bold">{when.title}</h4>
                <Parag>{when.description}</Parag>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container flex flex-col">
          <h2 className={titleStyle}>خدمات منصة الفحص الفني الدوري</h2>

          <div className="flex gap-4 flex-col lg:flex-row max-lg:text-center">
            {services.map((serv) => (
              <div
                key={serv.title}
                className="lg:pe-10 min-h-72 p-4 flex-1 flex flex-col items-center lg:items-start gap-2 border rounded-2xl shadow"
              >
                <img src={serv.icon} alt={`${serv.title} icon`} />
                <h4 className="lg:text-xl font-bold mt-4">{serv.title}</h4>
                <Parag className="mb-2 text-black">{serv.description}</Parag>
                {/* <div className="flex gap-2">
                  <span
                    className={cn(
                      "px-4 py-1 rounded-sm text-sm",
                      serv.tag === "individuals"
                        ? "bg-green-50 border border-green-400 text-main"
                        : "bg-gray-100 text-black"
                    )}
                  >
                    أفراد
                  </span>
                  <span
                    className={cn(
                      "px-4 py-1 rounded-sm text-sm",
                      serv.tag === "business"
                        ? "bg-green-50 border border-green-400 text-main"
                        : "bg-gray-100 text-black"
                    )}
                  >
                    أعمال
                  </span>
                </div> */}
                <Button
                  className="mt-auto bg-main w-fit px-4 rounded-md"
                  asChild
                >
                  <Link to={serv.href} title={serv.title}>
                    {serv.buttonText}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container flex flex-col">
          <h2 className={titleStyle}>خطوات ما قبل الفحص الفني الدوري</h2>

          <div className="flex gap-[2dvw] flex-col lg:flex-row">
            {preRegisterSteps.map((step) => (
              <div
                key={step.title}
                className="p-4 flex-1 flex flex-col items-center gap-4 text-center border rounded-2xl shadow"
              >
                <img src={step.icon} alt={`${step.title} icon`} />
                <h4 className="lg:text-xl font-bold mt-4">{step.title}</h4>
                <Parag className="text-sm text-black max-w-sm text-pretty">
                  {step.description}
                </Parag>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center my-10">
        <h2 className={titleStyle}>الجهات المرخصة</h2>
        <p className="text-sm max-lg:max-w-sm -mt-6 lg:text-lg mb-6 text-center text-main">
          الجهات المرخصة من المواصفات السعودية لممارسة نشاط الفحص الفني الدوري
        </p>
        <div className="flex gap-2 items-center justify-center">
          {[
            "/assets/images/certified-1.png",
            "/assets/images/certified-2.png",
            "/assets/images/certified-3.png",
            "/assets/images/certified-4.png",
          ].map((img) => (
            <div
              key={img}
              className="flex-1 py-2 px-4 border rounded-xl shadow-sm"
            >
              <img
                src={img}
                alt="certified partner"
                key={img}
                className="h-10 mx-auto"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 pt-16 lg:pb-16">
        <div className="max-w-5xl mx-auto px-4 flex gap-10 flex-col lg:flex-row items-center">
          <img
            src="/assets/images/app_clone.png"
            alt="app preview"
            className="mix-blend-darken max-lg:order-1"
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-main mb-4 text-center lg:text-right">
                احجز موعد الفحص من جوالك
              </h2>
              <p className="max-lg:px-8 lg:text-2xl mb-6 text-center lg:text-right">
                بسهولة وبساطة يمكنك حجز موعد الفحص في أقرب مركز لموقعك
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Main>
  );
}

export default Home;
