import * as yup from "yup";
export const updateFolderSchema = yup.object({
  newFolderName: yup
    .string()
    .required("Please write a new name for your folder!"),
});

export const addFolderSchema = yup.object({
  folderName: yup.string().required("Please add a name for your new folder!"),
});
