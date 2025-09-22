import { Grid } from "@mui/material";
import AddFolderIcon from "assets/images/svg_based/AddFolder";
import DeleteIcon from "assets/images/svg_based/DeleteIcon";
import EditIcon from "assets/images/svg_based/EditIcon";
import FolderIcon from "assets/images/svg_based/Folder";
import MenuDots from "assets/images/svg_based/MenuDots";
import Spinner from "components/shared/Spinner/Spinner";
import useFoldersHelper from "helpers/Folders/FoldersHelper";
import DashboardLayout from "layout/DashboardLayout";
import React, { useState } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { GrFormCheckmark } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import AddFolderModal from "components/Dashboard/Folders/AddFolderModal";
import StandardConfirmationDialog from "components/shared/ConfirmationDialog/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const {
    folders,
    formik,
    folderUpdateSuccess,
    updateFolderLoading,
    isLoading,
    addFolderFormik,
    deleteFolderById,
  } = useFoldersHelper();
  const [menuIdx, setMenuIdx] = React.useState<null | number>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [rename, setRename] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (folderUpdateSuccess || updateFolderLoading) {
      setMenuIdx(null);
      setMenu(false);
      setRename(false);
    }
  }, [folderUpdateSuccess, updateFolderLoading]);

  const [openAddFolderModal, setOpenAddFolderModal] =
    React.useState<boolean>(false);
  const [opendelFolderConfirmation, setOpenDelFolderConfirmation] =
    React.useState<boolean>(false);
  const [deleteFolderId, setDeleteFolderId] = React.useState<number | null>(
    null
  );
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard - SubtitleO</title>
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen min-h-[79vh]">
          <Spinner />
        </div>
      ) : (
        <section className="py-6 w-[90.5vw]">
          <Grid container className="ml-[9.5vw]">
            <Grid item xs={4} md={6} sm={6}>
              <h3 className="font-sora font-semibold text-xl sm:text-lg lg:text-lg text-[#363636] dark:text-white">
                Projects
              </h3>
            </Grid>
            <Grid item xs={8} md={6} sm={6} className="flex justify-end px-6">
              <div
                className="bg-[#084A9B] hover:bg-[#084A9B]/90 cursor-pointer w-fit flex items-center space-x-3 py-2 px-4 rounded-[7px] text-[#F6F6F6] font-sora font-semibold text-lg sm:text-sm md:text-sm"
                onClick={() => setOpenAddFolderModal(true)}
              >
                <AddFolderIcon /> <span>Add folder</span>
              </div>
            </Grid>
          </Grid>
          {folders?.length === 0 && (
            <div className="flex items-center justify-center sm:flex-col md:flex-col text-center w-screen min-h-[79vh] text-xl font-sora font-bold space-x-2">
              <HiOutlineEmojiSad className="text-2xl" /> You have no projects.
            </div>
          )}

          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 ml-[10.5vw] pt-8 gap-x-3 sm:gap-x-2 md:gap-x-2 gap-y-4">
            {folders.map((folder: any, idx: number) => {
              return (
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-lg p-2 relative dark:bg-[#323232] dark:hover:bg-[#626262]"
                  key={idx}
                >
                  <div className="flex items-center space-x-3">
                    <FolderIcon />
                    {rename && menuIdx === idx ? (
                      <input
                        value={formik.values.newFolderName}
                        onChange={formik.handleChange}
                        id="newFolderName"
                        name="newFolderName"
                        className="border border-secondary rounded-md outline-none w-2/3 bg-transparent p-2"
                      />
                    ) : (
                      <span
                        className="text-[#343434] font-sora sm:text-sm lg:text-sm text-base font-normal dark:text-white"
                        onClick={() =>
                          navigate(
                            `/dashboard/projects/${folder?.folderName}/${folder?.id}`
                          )
                        }
                      >
                        {folder?.folderName?.slice(0, 40)}
                      </span>
                    )}
                  </div>
                  {rename && menuIdx === idx ? (
                    <div className="space-x-2 flex items-center">
                      <div
                        onClick={() => {
                          formik.setFieldValue("folderId", folder.id);
                          formik.handleSubmit();
                        }}
                      >
                        <GrFormCheckmark />
                      </div>
                      <div
                        onClick={() => {
                          setRename(false);
                        }}
                      >
                        <IoClose />
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setMenuIdx(menuIdx === idx ? null : idx);
                        setMenu(true);
                        formik.setFieldValue(
                          "newFolderName",
                          folder?.folderName
                        );
                      }}
                    >
                      <MenuDots className="cursor-pointer" />
                    </div>
                  )}

                  {menu && idx === menuIdx && (
                    <div className="bg-[#E7E7E7] flex flex-col space-y-2 p-3 rounded-lg absolute -bottom-full right-0 z-50 dark:bg-[#626262]">
                      <div
                        className="flex items-center space-x-2 hover:bg-gray-300 p-1 rounded-md"
                        onClick={() => {
                          setRename(true);
                          setMenu(false);
                        }}
                      >
                        <EditIcon />
                        <span className=" dark:text-white">Rename</span>
                      </div>
                      <div
                        className="flex items-center space-x-2 hover:bg-gray-300 p-1 rounded-md"
                        onClick={() => {
                          setOpenDelFolderConfirmation(true);
                          setDeleteFolderId(folder.id);
                        }}
                      >
                        <DeleteIcon />
                        <span className=" dark:text-white">Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
      {openAddFolderModal && (
        <AddFolderModal
          open={openAddFolderModal}
          setOpen={setOpenAddFolderModal}
          addFolderFormik={addFolderFormik}
        />
      )}
      {opendelFolderConfirmation && (
        <StandardConfirmationDialog
          heading="Are you sure you want to delete this folder?"
          subHeading="Deleting this folder will delete all the projects inside it."
          confirmText="Yes, Delete."
          disAgreeText="No"
          onAgree={() => {
            deleteFolderById(deleteFolderId);
            setOpenDelFolderConfirmation(false);
            setDeleteFolderId(null);
          }}
          onDisAgree={() => {
            setOpenDelFolderConfirmation(false);
            setDeleteFolderId(null);
          }}
          open={opendelFolderConfirmation}
          setOpen={setOpenDelFolderConfirmation}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
