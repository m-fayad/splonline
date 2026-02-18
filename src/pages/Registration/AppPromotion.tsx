import { Box, Typography } from "@mui/material";

const AppPromotion = () => {
  return (
    <Box
      dir="rtl"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        mb: { xs: 2, md: 6 },
      }}
    >
      {/* Phone Image */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/assets/images/new/NewPhone.png" // User described this as app icon, but size suggests phone mockup
          alt="SPL Application Preview"
          style={{ maxWidth: "100%", maxHeight: "600px", objectFit: "contain" }}
        />
      </Box>

      {/* App Icon and Text */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <img
          src="/assets/images/new/app_icon.png" // User described this as mobile fig, but size suggests icon
          alt="SPL App Icon"
          style={{ width: "120px", height: "120px", objectFit: "contain" }}
        />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#153c3f", mt: 1, pr: 4 }}
        >
          قم بتحميل تطبيق البريد السعودي سبل
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#373737",
            fontSize: { xs: "16px", md: "22px" },
            maxWidth: { xs: "100%", md: "70%" },
          }}
        >
          حرصاً منا على تقديم أفضل تجربة، نقدم لكم التطبيق الجديد كليا للبريد
          السعودي - سبل تم تطوير التطبيق ليجعل تجربتك أسهل وأمتع!
        </Typography>
      </Box>
    </Box>
  );
};

export default AppPromotion;
