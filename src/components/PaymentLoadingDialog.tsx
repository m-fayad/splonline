import { CircularProgress, Dialog, DialogContent } from "@mui/material";

export function PaymentLoadingDialog({ credType }: { credType?: string }) {
  return (
    <Dialog open>
      <DialogContent
        sx={{
          width: "100vw",
          maxWidth: 300,
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {credType && (
          <img
            src={`images/${credType}.png`}
            width={"80px"}
            className="mb-12"
            alt=""
          />
        )}
        <CircularProgress size={"55px"} />
      </DialogContent>
    </Dialog>
  );
}
