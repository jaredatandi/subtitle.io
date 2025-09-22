import useDispatch from 'app/TypedUseDispatch';
import { getProjectById } from 'app/features/projects/projectsSlice';
import { RootState } from 'app/store';
import EditingPanel from 'components/Dashboard/Projects/EditingPanel';
import Spinner from 'components/shared/Spinner/Spinner';
import DashboardLayout from 'layout/DashboardLayout';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const EditProject = () => {
  const { projectId, viewKey } = useParams();

  const projects: any = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  const videoOptions = {
    controls: false,
    aspectRatio:
      Object.keys(projects.project).length > 0
        ? `${projects.project.dimensions.width}:${projects.project.dimensions.height}`
        : '16:9',
    sources: [
      {
        src: `${process.env.REACT_APP_API_BASE_URL}/render/${viewKey}`,
        type: 'video/mp4',
      },
    ],
  };

  React.useEffect(() => {
    if (projectId) {
      dispatch(getProjectById({ projectId: projectId }));
    }
  }, [projectId, dispatch]);

  return (
    <DashboardLayout>
      <Helmet>
        <title>
          Edit - {projects?.project?.projectName || 'Untitled'} - SubtitleO
        </title>
      </Helmet>
      {projects.loadingGetProjectById ? (
        <div className="flex items-center justify-center w-screen min-h-[79vh]">
          <Spinner />
        </div>
      ) : (
        <div className="ml-[10.5vw] sm:ml-0 md:ml-0">
          <EditingPanel options={videoOptions} project={projects.project} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default EditProject;
