import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RegisterNationalAddress = () => {
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
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* 1. Text Content */}
          <Grid size={{ xs: 12, md: 5 }} order={{ xs: 1, md: 1 }}>
            <Box textAlign={{ xs: "center", md: "right" }} color="white">
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  fontFamily: "inherit",
                }}
              >
                تسجيل عنوانك الوطني
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontFamily: "inherit",
                }}
              >
                سواء كنت فرد، قطاع تجاري أو حكومي تتواجد في قرية أو مدينة يحتوي
                عنوانك على مجموعة من البيانات والتي تعبر عنها بالدلائل الجغرافية
                والمكانية والتي تممثل بمجملها بصمتك الجغرافية
              </Typography>
            </Box>
          </Grid>

          {/* 2. Cards and Video Content */}
          <Grid size={{ xs: 12, md: 7 }} order={{ xs: 2, md: 2 }}>
            <Grid container spacing={2} alignItems="stretch">
              {/* Card: Individuals */}
              <Grid size={{ xs: 6, md: 4 }} order={1}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
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
                  <Box display="flex" justifyContent="flex-end" mb={2}>
                    <img
                      src="/assets/images/new/naicon-1.jpg"
                      alt="Individual Icon"
                      style={{ height: "30px", width: "auto" }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#1e2746",
                      mb: 2,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      lineHeight: 1.4,
                      fontFamily: "inherit",
                    }}
                  >
                    العنوان الوطني{" "}
                    <span className="block font-bold">للأفراد</span>
                  </Typography>
                  <Link
                    href="https://accounts.splonline.com.sa/ar/Registration"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#034886",
                      fontWeight: "bold",
                      gap: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    سجّل الآن
                    <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                  </Link>
                </Paper>
              </Grid>

              {/* Card: Businesses */}
              <Grid size={{ xs: 6, md: 4 }} order={2}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    height: "100%",
                    borderRadius: 3,
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
                  <Box display="flex" justifyContent="flex-end" mb={2}>
                    <img
                      src="/assets/images/new/naicon-2.jpg"
                      alt="Business Icon"
                      style={{ height: "30px", width: "auto" }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#1e2746",
                      mb: 2,
                      fontSize: { xs: "0.9rem", md: "1.1rem" },
                      lineHeight: 1.4,
                      fontFamily: "inherit",
                    }}
                  >
                    العنوان الوطني{" "}
                    <span className="block font-bold">للأعمال</span>
                  </Typography>
                  <Link
                    href="https://accounts.splonline.com.sa/ar/Registration"
                    underline="none"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#034886",
                      fontWeight: "bold",
                      gap: 1,
                      fontSize: "0.9rem",
                    }}
                  >
                    سجّل الآن
                    <ArrowBackIcon sx={{ fontSize: "1rem" }} />
                  </Link>
                </Paper>
              </Grid>

              {/* Video Player */}
              <Grid size={{ xs: 12, md: 4 }} order={3}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    minHeight: "160px",
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "black",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: 4,
                  }}
                >
                  <video
                    controls
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  >
                    <source
                      src="https://splonline.com.sa/Design/video/naVid.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default RegisterNationalAddress;
