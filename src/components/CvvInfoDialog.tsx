import { InfoOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function CvvInfoDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <InfoOutlined
        fontSize="small"
        onClick={handleClickOpen}
        className="cursor-pointer"
        sx={{ width: 16 }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>رمز الأمان</DialogTitle>
        <DialogContent>
          <DialogContentText width={"300px"}>
            رمز الأمان هو الأرقام الثلاثة الموجودة على ظهر بطاقتك.
          </DialogContentText>
          <img src="images/cvv-info.png" className="mx-auto mt-4" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            فهمت
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
