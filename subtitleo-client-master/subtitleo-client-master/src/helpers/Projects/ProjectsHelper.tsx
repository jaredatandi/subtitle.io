import useDispatch from "app/TypedUseDispatch";
import { RootState } from "app/store";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProjectNameSchema } from "./schema";
import {
  changeProjectNameByProjectId,
  deleteProjectByProjectId,
  getAllProjectsByFolderId,
} from "app/features/projects/projectsSlice";
import { useParams } from "react-router-dom";

const useProjectsHelper = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      newProjectName: "",
      projectId: null,
    },
    validationSchema: updateProjectNameSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(
        changeProjectNameByProjectId({
          projectId: values.projectId || 0,
          data: { newProjectName: values.newProjectName },
        })
      );
    },
  });

  const { folderId } = useParams();

  React.useEffect(() => {
    if (
      projects.projectNameUpdateSuccess &&
      !projects.loadingUpdateProjectName
    ) {
      dispatch(getAllProjectsByFolderId({ folderId }));
      toast.success("Project name updated successfully!");
    }
  }, [
    projects.projectNameUpdateSuccess,
    projects.loadingUpdateProjectName,
    dispatch,
    folderId,
  ]);

  const deleteProjectById = (projectId: number | null) => {
    setIsLoading(true);
    dispatch(deleteProjectByProjectId({ projectId: projectId }));
  };
  React.useEffect(() => {
    if (projects.errorGetProjects || projects.errorMessageGetProjects) {
      toast.error(`${projects.errorMessageGetProjects}`);
    }
  }, [projects.errorGetProjects, projects.errorMessageGetProjects]);

  React.useEffect(() => {
    if (projects.projectDeleteSuccess && !projects.loadingDeleteProject) {
      dispatch(getAllProjectsByFolderId({ folderId }));
      toast.info("Project deleted successfully!");
    }
  }, [
    projects.projectDeleteSuccess,
    projects.loadingDeleteProject,
    dispatch,
    folderId,
  ]);

  React.useEffect(() => {
    setIsLoading(projects.loadingGetProjects);
  }, [projects.loadingGetProjects]);

  return {
    projects: projects.projects,
    errorGetProjects: projects.errorGetProjects,
    loadingGetProjects: projects.loadingGetProjects,
    errorMessageGetProjects: projects.errorMessageGetProjects,
    isLoading,
    deleteProjectById,
    formik,
    projectUpdateSuccess: projects.projectNameUpdateSuccess,
    projectDeleteSuccess: projects.projectDeleteSuccess,
  };
};

export default useProjectsHelper;
