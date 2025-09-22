import useDispatch from "app/TypedUseDispatch";
import {
  addFolder,
  changeFolderNameByFolderId,
  deleteFolderByFolderId,
  getAllFoldersByUserId,
} from "app/features/folders/folderSlice";
import { RootState } from "app/store";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFolderSchema, updateFolderSchema } from "./schema";

const useFoldersHelper = () => {
  const folders = useSelector((state: RootState) => state.folders);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      newFolderName: "",
      folderId: null,
    },
    validationSchema: updateFolderSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(
        changeFolderNameByFolderId({
          folderId: values.folderId || 0,
          data: { newFolderName: values.newFolderName },
        })
      );
    },
  });

  const addFolderFormik = useFormik({
    initialValues: {
      folderName: "",
    },
    validationSchema: addFolderSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(addFolder({ folderName: values.folderName }));
    },
  });

  React.useEffect(() => {
    if (folders.error || folders.errorMessage) {
      toast.error(`${folders.errorMessage}`);
    }
  }, [folders.error, folders.errorMessage]);

  React.useEffect(() => {
    dispatch(getAllFoldersByUserId());
  }, [dispatch]);

  React.useEffect(() => {
    setIsLoading(folders.loading);
  }, [folders.loading]);

  const deleteFolderById = (folderId: number | null) => {
    setIsLoading(true);
    dispatch(deleteFolderByFolderId({ folderId }));
  };

  React.useEffect(() => {
    if (folders.folderUpdateSuccess && !folders.updateFolderLoading) {
      dispatch(getAllFoldersByUserId());
      toast.success("Folder name updated successfully!");
    }
  }, [folders.folderUpdateSuccess, folders.updateFolderLoading, dispatch]);

  React.useEffect(() => {
    if (folders.folderDeleteSuccess && !folders.deleteFolderLoading) {
      dispatch(getAllFoldersByUserId());
      toast.info("Folder deleted successfully!");
    }
  }, [folders.deleteFolderLoading, folders.folderDeleteSuccess, dispatch]);

  React.useEffect(() => {
    if (folders.folderAddSuccess && !folders.addFolderLoading) {
      dispatch(getAllFoldersByUserId());
      addFolderFormik.setFieldValue("folderName", "");
      toast.success("Folder added successfully!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders.addFolderLoading, folders.folderAddSuccess, dispatch]);

  return {
    folders: folders.folders,
    error: folders.error,
    loading: folders.loading,
    errormMessage: folders.errorMessage,
    formik,
    updateFolderLoading: folders.updateFolderLoading,
    folderUpdateSuccess: folders.folderUpdateSuccess,
    deleteFolderById,
    isLoading,
    addFolderFormik,
  };
};

export default useFoldersHelper;
