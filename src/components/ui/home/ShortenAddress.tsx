import { Box, Typography, Container, Paper } from "@mui/material";

const ShortenAddress = () => {
  const partners = [
    { icon: "/assets/images/new/logo.svg", name: "سبل أون لاين", id: 1 },
    {
      icon: "/assets/images/new/maha.png",
      name: "مها (المساعد الافتراضي)",
      id: 2,
    },
    { icon: "/assets/images/new/tawakkalna-logo.svg", name: "توكلنا", id: 3 },
    { icon: "/assets/images/new/sehhaty-logo-new.png", name: "صحتي", id: 4 },
    { icon: "/assets/images/new/absher-logo.png", name: "أبشر", id: 5 },
  ];

  return (
    <section className="font-['Tajawal']" dir="rtl">
      {/* Top Section: Description & Diagram */}
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1e2746",
            fontSize: { xs: "1.5rem", md: "2.25rem" },
            mb: { xs: 2, md: 4 },
            fontFamily: "inherit",
          }}
        >
          من عنوان مفصل إلى:{" "}
          <span style={{ color: "#a21b55" }}>عنوان مختصر</span>
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Text Content */}
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="body1"
              sx={{
                color: "#222753",
                textAlign: { xs: "center", lg: "left" },
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.8,
                fontFamily: "inherit",
              }}
            >
              عنوان بسيط سهل الحفظ يحتوي على أربعة حروف وأربعة أرقام فقط هذا
              الرمز القصير كفيل بأن يجعل حياتك أسهل
            </Typography>
          </Box>

          {/* Diagram Image */}
          <img
            src="/assets/images/new/short-address-ar-v1.svg"
            alt="Short Address Diagram"
            style={{
              maxHeight: "100px",
            }}
          />
        </Box>
      </Container>

      {/* Bottom Section: Partners (Teal Background) */}
      <Box sx={{ bgcolor: "#0f8ea3", py: 6 }}>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="stretch"
            flexWrap="wrap"
            gap={2}
          >
            {partners.map((partner) => (
              <Box
                key={partner.id}
                sx={{
                  width: {
                    xs: "calc(50% - 16px)",
                    sm: "calc(33.33% - 16px)",
                    md: "calc(18% - 16px)",
                  },
                  minWidth: { xs: "140px", md: "180px" },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    p: 2,
                    height: "100%",
                    minHeight: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* Partner Logo */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "60px",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={partner.icon}
                      alt={partner.name}
                      style={{
                        maxWidth: "80%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8rem", md: "0.95rem" },
                      fontWeight: "bold",
                      color: "#1e2746",
                      textAlign: "center",
                      fontFamily: "inherit",
                    }}
                  >
                    {partner.name}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </section>
  );
};

export default ShortenAddress;
