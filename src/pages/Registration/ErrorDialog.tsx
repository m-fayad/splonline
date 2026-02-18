import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ErrorDialog = ({
  open,
  onClose,
  title = "عفواً",
  message = "المعلومات التي أدخلتها خاطئة. يرجى التحقق مرة أخرى",
}: ErrorDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          width: "450px",
          maxWidth: "90vw",
          textAlign: "center",
          p: 2,
        },
      }}
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Placeholder for the "!" top image */}
          <Box
            sx={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Creating a CSS representation of the icon in the image since I don't have the asset yet */}
            <Box
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border: "4px solid #00c8e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#00c8e1",
                boxShadow: "0 0 0 10px rgba(0, 200, 225, 0.1)",
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "48px", fontWeight: "bold" }}
              >
                !
              </Typography>
            </Box>
            {/* Decorative dots from the image */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#9ca3af",
              }}
            >
              +
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "#9ca3af",
              }}
            >
              +
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: "#00c8e1",
              fontWeight: "bold",
              fontSize: "40px",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#373737",
              fontSize: "1.2rem",
              lineHeight: 1.5,
              px: 2,
            }}
          >
            {message}
          </Typography>

          <Button
            onClick={onClose}
            sx={{
              bgcolor: "#f3f4f6",
              color: "#373737",
              fontWeight: "bold",
              fontSize: "1.1rem",
              px: 8,
              py: 1.5,
              mt: 2,
              borderRadius: "4px",
              "&:hover": { bgcolor: "#e5e7eb" },
            }}
          >
            اغلاق
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
