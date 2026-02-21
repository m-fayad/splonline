import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { encryptRoute, navigate } from "@/real-time/utils/utils";

interface AccountStatusDialogProps {
  open: boolean;
  onClose: () => void;
}

const AccountStatusDialog = ({ open, onClose }: AccountStatusDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "12px",
            padding: 2,
          },
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <InfoOutlinedIcon sx={{ fontSize: "80px", color: "#146e82" }} />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "#373737",
            lineHeight: 1.8,
            fontSize: "1.05rem",
            mb: 4,
            fontWeight: "500",
          }}
        >
          تم إلغاء تنشيط هذا الحساب لعدم ربطه برقم هاتف جوال المستخدم المعتمد.
          يرجى إعادة تنشيط حسابك عبر ربط رقم هاتفك الجوال الخاص بك أو تسجيل
          مستخدم جديد حتى يتم تسجيل اشتراكك لتحصل على جميع الميزات والخدمات
          المقدمة في خدمة العنوان الوطني.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
              "&:hover": { bgcolor: "transparent", opacity: 0.8 },
            }}
            onClick={() => {
              onClose();
              navigate(encryptRoute("ربط رقم الجوال"));
            }}
          >
            ربط رقم الهاتف وتنشيط الحساب
          </Button>

          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
              "&:hover": { bgcolor: "transparent", opacity: 0.8 },
            }}
            onClick={() => {
              onClose();
              navigate(encryptRoute("التسجيل"));
            }}
          >
            تسجيل مستخدم جديد
          </Button>

          <Button
            variant="text"
            sx={{
              color: "#146e82",
              fontWeight: "bold",
              fontSize: "1.1rem",
              textTransform: "none",
              mt: 1,
              "&:hover": { bgcolor: "transparent", opacity: 0.8 },
            }}
            onClick={onClose}
          >
            رجوع
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AccountStatusDialog;
