import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const NationalAddressComponents = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const details = [
    {
      title: "رقم المبنى",
      description: "(4 أرقام فريدة تمثل مبنى سكني أو تجاري)",
      color: "#8dc63f",
    },
    {
      title: "الشارع",
      description: "(الشارع الذي يقع عليه المدخل الرئيسي للمبنى)",
      color: "#1e2746",
    },
    {
      title: "الرقم الفرعي",
      description:
        "(4 أرقام تمثل احداثيات الموقع الدقيق للمبنى؛ مفيدة في حال لا يوجد اسم شارع أو حي)",
      color: "#f37021",
    },
    {
      title: "الحي",
      description: "(الحي الذي يتواجد به المبنى)",
      color: "#00aeef",
    },
    {
      title: "الرمز البريدي",
      description:
        "(5 أرقام، لكل رقم مدلول مكاني فريد؛ شبكة الرموز البريدية تغطي المملكة العربية السعودية بنسبة 100%)",
      color: "#a21b55",
    },
    {
      title: "المدينة",
      description: "(المدينة الذي يتواجد بها العنوان الوطني)",
      color: "#00aeef",
    },
  ];

  return (
    <section
      className="font-['Tajawal']"
      dir="rtl"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#1e2746",
              mb: 4,
              fontFamily: "inherit",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            مكوّنات العنوان الوطني
          </Typography>

          {/* Diagram Image */}
          <Box sx={{ width: "100%", maxWidth: "900px", mx: "auto", mb: 4 }}>
            <img
              src="/assets/images/new/na-components-ar-desk.svg"
              alt="National Address Components Diagram"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>

          {/* Custom Styled Accordion */}
          <Box
            sx={{
              display: { md: "none" },
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              elevation={0}
              sx={{
                borderRadius: "8px !important",
                overflow: "hidden",
                border: "1px solid #eee",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                "&:before": { display: "none" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#1e2746" }} />}
                sx={{
                  backgroundColor: "white",
                  px: 3,
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#1e2746",
                    fontSize: "1.2rem",
                    fontFamily: "inherit",
                  }}
                >
                  شرح التفاصيل
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: "white", px: 4, pb: 4 }}>
                <Box display="flex" flexDirection="column" gap={4}>
                  {details.map((item, index) => (
                    <Box display="flex" sx={{ gap: 1 }} width="100%" mb={1}>
                      <ArrowBackIcon
                        sx={{ mt: 1, color: "#00aeef", fontSize: "1.2rem" }}
                      />

                      <Box
                        key={index}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                        sx={{ position: "relative" }}
                      >
                        <Typography
                          sx={{
                            color: item.color,
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            fontFamily: "inherit",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#6b7280",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            textAlign: "left",
                            fontFamily: "inherit",
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default NationalAddressComponents;
