import { Box, Typography, Container } from "@mui/material";

const LegalNotice = () => {
  return (
    <section
      className="font-['Tajawal']"
      dir="rtl"
      style={{ backgroundColor: "white" }}
    >
      <Container maxWidth="lg" sx={{ py: 4, mb: 5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: { xs: 2, md: 4 },
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
          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#1e2746",
                fontSize: { xs: "1.25rem", md: "1.75rem" },
                fontFamily: "inherit",
                mb: 1,
              }}
            >
              احذر من المسائل القانونية
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555b7d",
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
