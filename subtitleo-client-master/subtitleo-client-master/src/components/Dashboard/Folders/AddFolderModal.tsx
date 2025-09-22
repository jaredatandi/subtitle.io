import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StandardInputWithLabel from "components/shared/Inputs/StandardInputWithLabel";
import StandardButton from "components/shared/Buttons/StandardButton";
import ErrorText from "components/shared/Typographies/ErrorText";

export default function AddFolderModal({
  open,
  setOpen,
  addFolderFormik,
}: any) {
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="text-center text-primary !font-bold !font-sora !text-2xl dark:bg-black">
          Add a Folder
        </DialogTitle>
        <DialogContent className="w-[35vw] sm:w-[80vw] lg:w-[80vw dark:bg-black">
          <DialogContentText className="!text-sm !font-sora !font-thin dark:text-white">
            Choose a perfect name for your next foder.
          </DialogContentText>
          <StandardInputWithLabel
            id="folderName"
            name="folderName"
            label="New Folder Name"
            value={addFolderFormik.values.folderName}
            placeholder="Youtube, Reels, Professionals, etc"
            className="!bg-gray-200 dark:!bg-[#292929]"
            onChange={addFolderFormik.handleChange}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                setOpen(false);
                addFolderFormik.handleSubmit();
              } else {
                return undefined;
              }
            }}
          />
          {addFolderFormik.touched.folderName &&
            Boolean(addFolderFormik.errors.folderName) && (
              <ErrorText text={addFolderFormik.errors.folderName} />
            )}
        </DialogContent>
        <DialogActions className="!flex !justify-between px-2 !w-full dark:bg-black">
          <Button onClick={() => setOpen(false)}>Close</Button>
          <StandardButton
            text="Create"
            className="!w-[100px]"
            onClick={() => {
              setOpen(false);
              addFolderFormik.handleSubmit();
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
