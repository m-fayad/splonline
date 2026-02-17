import { Box, Typography, Container } from "@mui/material";

const LegalNotice = () => {
  return (
    <section
      className="font-['Tajawal']"
      dir="rtl"
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "start",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {/* Warning Icon */}
          <img
            height={56}
            width={50}
            src="/assets/images/new/naicon-13.jpg"
            alt="warning icon"
          />

          {/* Text Content */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#1e2746",
                mb: 2,
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontFamily: "inherit",
              }}
            >
              احذر من المسائل القانونية
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555b7d",
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                fontFamily: "inherit",
              }}
            >
              العنوان الوطني هو نظام عنونة دقيق يؤهلك للحصول على مستوى أعلى من
              الخدمات الحكومية والتجارية لذا من مسؤولية كل فرد وكل جهة القيام
              بالتسجيل في العنوان الوطني والالتزام بإدخال بيانات صحيحة تفاديًا
              للمساءلة القانونية.
            </Typography>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default LegalNotice;
