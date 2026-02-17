import { Box, Typography, Container, Grid, Paper } from "@mui/material";

const Services = () => {
  const features = [
    {
      text: (
        <>
          تغطي كامل مناطق المملكة العربية السعودية <strong>بدقة تصل إلى</strong>{" "}
          <strong>1 متر مربع</strong>
        </>
      ),
      id: 1,
      icon: "/assets/images/new/naicon-7.jpg",
    },
    {
      text: (
        <>
          تؤهلك للحصول على <strong>10 عناوين في أنحاء العالم</strong> عن طريق
          خدمة عالمي
        </>
      ),
      id: 2,
      icon: "/assets/images/new/naicon-6.jpg",
    },
    {
      text: (
        <>
          استخدام العنوان <strong>يسرع وصول الشحنات إليك</strong> دون الحاجة
          لاتصالات إضافية
        </>
      ),
      id: 3,
      icon: "/assets/images/new/naicon-5.jpg",
    },
    {
      text: (
        <>
          سهولة الحصول على وثائقك الحكومية، الطرود التجارية والشخصية{" "}
          <strong>دون العناء لاستلامها شخصيا</strong>
        </>
      ),
      id: 4,
      icon: "/assets/images/new/naicon-4.jpg",
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
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 800,
              color: "#1e2746",
              mb: 2,
              fontFamily: "inherit",
              fontSize: { md: "2rem" },
            }}
          >
            ذات مميزات استثنائية
          </Typography>
          {/* <Typography
            variant="h6"
            sx={{
              color: "#0f8ea3",
              fontWeight: 400,
              fontFamily: "inherit",
              fontSize: { xs: "1.1rem", md: "1.2rem" },
            }}
          >
           
          </Typography> */}
        </Box>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature) => (
            <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: "100%",
                  borderRadius: 2,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "white",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(0,0,0,0.02)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 15px 45px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  mb={1}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={feature.icon}
                    alt="Feature Icon"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#555b7d",
                    lineHeight: 1.8,
                    fontFamily: "inherit",
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    width: "100%",
                    "& strong": {
                      color: "#1e2746",
                      fontWeight: 700,
                    },
                  }}
                >
                  {feature.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default Services;
