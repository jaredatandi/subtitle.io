import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  heading: string;
  subHeading: string;
  onAgree: any;
  onDisAgree: any;
  open: boolean;
  setOpen: any;
  confirmText: string;
  disAgreeText: string;
};
export default function StandardConfirmationDialog({
  heading,
  subHeading,
  onAgree,
  onDisAgree,
  open,
  setOpen,
  confirmText,
  disAgreeText,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        sx={{ background: "transparent" }}
      >
        <DialogTitle
        className="dark:bg-black dark:text-white"
        >{heading}</DialogTitle>
        <DialogContent className="dark:bg-black">
          <DialogContentText
          className="dark:text-white"
          >{subHeading}</DialogContentText>
        </DialogContent>
        <DialogActions className="dark:bg-black dark:text-white">
          <Button onClick={onDisAgree}>{disAgreeText}</Button>
          <Button onClick={onAgree}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
