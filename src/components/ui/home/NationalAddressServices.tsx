import { Typography, Container, Paper, Grid, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NationalAddressServices = () => {
  const services = [
    {
      title: "طلب إثبات عنوان وطني",
      linkText: "اطلب الآن",
      linkUrl: "#",
      icon: "/assets/images/new/naicon-12.jpg",
      id: 1,
    },
    {
      title: "إضافة تابعين وإدارة عناوينك",
      linkText: "إدارة عنوانك",
      linkUrl: "#",
      icon: "/assets/images/new/naicon-11.jpg",
      id: 2,
    },
    {
      title: "تركيب لوحة عنوان وطني",
      linkText: "اطلب الآن",
      linkUrl: "#",
      icon: "/assets/images/new/naicon-10.jpg",
      id: 3,
    },
    {
      title: "تحقق من إثبات العنوان",
      linkText: "تحقق الآن",
      linkUrl: "#",
      icon: "/assets/images/new/naicon-14.jpg",
      id: 4,
    },
  ];

  return (
    <section
      className="font-['Tajawal']"
      dir="rtl"
      style={{
        backgroundColor: "#1e2746",
        backgroundImage: 'url("/assets/images/new/naPattern.png")',
        backgroundSize: "55%",
        backgroundPosition: "left center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: { xs: "center", md: "left" },
            fontWeight: "bold",
            color: "white",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "1.25rem", md: "2rem" },
            fontFamily: "inherit",
          }}
        >
          خدمات العنوان الوطني
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
        >
          {services.map((service) => (
            <Grid key={service.id} size={{ xs: 6, md: 3 }}>
              <Paper
                elevation={4}
                sx={{
                  py: 1.5,
                  px: 2,
                  height: "100%",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <img
                  style={{
                    width: "20px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                  src={service.icon}
                  alt={service.title}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "#1e2746",
                    mb: 2,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    pe: 4,
                    lineHeight: 1.4,
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                >
                  {service.title}
                </Typography>
                <Link
                  href={service.linkUrl}
                  justifyContent="flex-end"
                  underline="none"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#034886",
                    fontWeight: "bold",
                    gap: 1,
                    fontSize: "0.75rem",
                  }}
                >
                  {service.linkText}
                  <ArrowBackIcon sx={{ fontSize: "1.5rem" }} />
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default NationalAddressServices;
