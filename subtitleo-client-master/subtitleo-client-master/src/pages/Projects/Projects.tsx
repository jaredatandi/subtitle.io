import { Grid } from "@mui/material";
import AddFolderIcon from "assets/images/svg_based/AddFolder";
import DeleteIcon from "assets/images/svg_based/DeleteIcon";
import EditIcon from "assets/images/svg_based/EditIcon";
import MenuDots from "assets/images/svg_based/MenuDots";
import Spinner from "components/shared/Spinner/Spinner";
import DashboardLayout from "layout/DashboardLayout";
import React, { useState } from "react";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { GrFormCheckmark } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import StandardConfirmationDialog from "components/shared/ConfirmationDialog/ConfirmationDialog";
import { useNavigate, useParams } from "react-router-dom";
import ColoredFolderMinusIcon from "assets/images/svg_based/ColoredFolderMinus";
import ProjectIcon from "assets/images/svg_based/Project";
import useProjectsHelper from "helpers/Projects/ProjectsHelper";
import useDispatch from "app/TypedUseDispatch";
import { getAllProjectsByFolderId } from "app/features/projects/projectsSlice";
import { Helmet } from "react-helmet";

const Projects = () => {
  const {
    projects,
    isLoading,
    formik,
    deleteProjectById,
    projectUpdateSuccess,
    projectDeleteSuccess,
  } = useProjectsHelper();
  const [menuIdx, setMenuIdx] = React.useState<null | number>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const [rename, setRename] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const [opendelProjectConfirmation, setOpenDelProjectConfirmation] =
    React.useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = React.useState<number | null>(
    null
  );

  const { folderName, folderId } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (folderId) {
      dispatch(getAllProjectsByFolderId({ folderId: folderId }));
    }
  }, [folderId, dispatch]);

  React.useEffect(() => {
    if (projectUpdateSuccess || projectDeleteSuccess) {
      setMenuIdx(null);
      setMenu(false);
      setRename(false);
    }
  }, [projectUpdateSuccess, projectDeleteSuccess]);

  return (
    <DashboardLayout>
      <Helmet>
        <title>{folderName} - Projects - SubtitleO</title>
      </Helmet>
      {isLoading ? (
        <div className="flex items-center justify-center w-screen min-h-[79vh]">
          <Spinner />
        </div>
      ) : (
        <section className="py-6 w-[90.5vw]">
          <Grid container className="ml-[9.5vw]">
            <Grid item xs={4} md={6} sm={6}>
              <h3 className="font-sora font-semibold text-xl text-[#363636] flex space-x-2 items-center dark:text-white">
                <span className="cursor-pointer" onClick={() => navigate(-1)}>
                  <ColoredFolderMinusIcon />
                </span>{" "}
                <span>{folderName}</span>
              </h3>
            </Grid>
            <Grid item xs={8} md={6} sm={6} className="flex justify-end px-6">
              <div
                className="bg-[#084A9B] hover:bg-[#084A9B]/90 cursor-pointer w-fit flex items-center space-x-3 py-2 px-4 rounded-[7px] text-[#F6F6F6] font-sora font-semibold text-lg sm:text-sm md:text-sm"
                onClick={() =>
                  navigate(`/dashboard/projects/create?folder=${folderId}`)
                }
              >
                <AddFolderIcon /> <span>Add project</span>
              </div>
            </Grid>
          </Grid>
          {projects?.length === 0 && (
            <div className="flex items-center text-center justify-center sm:flex-col md:flex-col w-screen min-h-[79vh] text-xl font-sora font-bold space-x-2 dark:text-white">
              <HiOutlineEmojiSad className="text-2xl" /> You have no projects in{" "}
              `{folderName}` folder.
            </div>
          )}

          <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 ml-[10.5vw] pt-8 gap-x-3 gap-y-4">
            {projects.map((project: any, idx: number) => {
              return (
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-lg p-2 relative"
                  key={idx}
                >
                  <div className="flex items-center space-x-3">
                    <ProjectIcon />
                    {rename && menuIdx === idx ? (
                      <input
                        value={formik.values.newProjectName}
                        onChange={formik.handleChange}
                        id="newProjectName"
                        name="newProjectName"
                        className="border border-secondary rounded-md outline-none w-2/3 bg-transparent p-2"
                      />
                    ) : (
                      <a
                        className="text-[#343434] font-sora text-base font-normal"
                        href={
                          project?.subtitledVideoFile
                            ? `/dashboard/projects/${project?.id}/${project?.originalVideoFile}/view`
                            : `/dashboard/projects/${project?.id}/${project?.originalVideoFile}/edit`
                        }
                      >
                        {project?.projectName?.slice(0, 40)}
                      </a>
                    )}
                  </div>
                  {rename && menuIdx === idx ? (
                    <div className="space-x-2 flex items-center">
                      <div
                        onClick={() => {
                          formik.setFieldValue("projectId", project.id);
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
                          "newProjectName",
                          project?.projectName
                        );
                      }}
                    >
                      <MenuDots className="cursor-pointer" />
                    </div>
                  )}

                  {menu && idx === menuIdx && (
                    <div className="bg-[#E7E7E7] flex flex-col space-y-2 p-3 rounded-lg absolute -bottom-[130%] right-0 z-50">
                      <div
                        className="flex items-center space-x-2 hover:bg-gray-300 p-1 rounded-md"
                        onClick={() => {
                          setRename(true);
                          setMenu(false);
                        }}
                      >
                        <EditIcon />
                        <span>Rename</span>
                      </div>
                      <div
                        className="flex items-center space-x-2 hover:bg-gray-300 p-1 rounded-md"
                        onClick={() => {
                          setOpenDelProjectConfirmation(true);
                          setDeleteProjectId(project.id);
                        }}
                      >
                        <DeleteIcon />
                        <span>Delete</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {opendelProjectConfirmation && (
        <StandardConfirmationDialog
          heading="Are you sure you want to delete this project?"
          subHeading="Deleting will delete all the data related to it."
          confirmText="Yes, Delete."
          disAgreeText="No"
          onAgree={() => {
            deleteProjectById(deleteProjectId);
            setOpenDelProjectConfirmation(false);
            setDeleteProjectId(null);
          }}
          onDisAgree={() => {
            setOpenDelProjectConfirmation(false);
            setDeleteProjectId(null);
          }}
          open={opendelProjectConfirmation}
          setOpen={setOpenDelProjectConfirmation}
        />
      )}
    </DashboardLayout>
  );
};

export default Projects;
