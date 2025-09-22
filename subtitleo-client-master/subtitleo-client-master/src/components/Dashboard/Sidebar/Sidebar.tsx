import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import dummy from 'assets/images/avatars/dummy_avatar.png';
import useSessionStorage from 'utils/sessionStorage';
import ForwardArrow from 'assets/images/svg_based/ForwardArrow';
import DashboardIcon from 'assets/images/svg_based/Sidebar/Dashboard.svg';
import ProjectsIcon from 'assets/images/svg_based/Sidebar/Projects.svg';
import ProfileIcon from 'assets/images/svg_based/Sidebar/Profile.svg';
import FAQIcon from 'assets/images/svg_based/Sidebar/FAQ.svg';
import TutorialsIcon from 'assets/images/svg_based/Sidebar/Tutorials.svg';
import LogoutIcon from 'assets/images/svg_based/Sidebar/Logout.svg';
// import PlusForProject from "assets/images/svg_based/Sidebar/PlusForProject.svg";
import { Link } from 'react-router-dom';
import BackArrow from 'assets/images/svg_based/BackArrow';
import { logout } from 'app/features/auth/AuthSlice';
import useDispatch from 'app/TypedUseDispatch';
import { getLatestProjects } from 'app/features/projects/projectsSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
// import ThemeToggleSwitch from 'components/shared/Theme/ThemeToggleSwitch';
import StandardConfirmationDialog from 'components/shared/ConfirmationDialog/ConfirmationDialog';

const Sidebar = () => {
  const { getSessionStorageItem } = useSessionStorage();
  const userName = JSON.parse(getSessionStorageItem('user') || '{}')?.name;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();

  const latestProjects = useSelector(
    (state: RootState) => state.projects.latestProjects
  );

  React.useEffect(() => {
    dispatch(getLatestProjects());
  }, [dispatch]);
  // const checked = localStorage.getItem('theme') === 'dark' ? false : true;

  const [opendelFolderConfirmation, setOpenDelFolderConfirmation] =
    React.useState<boolean>(false);

  return (
    <>
      {/* <span
        onClick={() => setIsOpened(!isOpened)}
        className="bg-[#084A9B] cursor-pointer absolute mx-6 top-6 rounded-full w-6 h-6 shadow-[#084A9B] shadow-md flex items-center justify-center"
      >
        {isOpened ? <BackArrow /> : <ForwardArrow />}
      </span> */}
      <Grid
        container
        className={`px-6 fixed left-0 top-0 py-6 sidebar dark:bg-[#626262] z-50  ${
          isOpened ? '!w-[20vw]' : '!w-[8vw] sm:!hidden md:!hidden'
        } h-screen z-50 rounded-tr-[29px] rounded-br-[29px] transition-all sm:!w-[80vw] md:!w-[80vw]`}
      >
        <Grid
          item
          sm={12}
          md={12}
          xs={12}
          className={`border-b border-[#FFFFFF] flex ${
            isOpened ? 'space-x-2' : 'space-x-0 items-center justify-center'
          } relative`}
        >
          <Box
            component={'div'}
            className="border-[3px] border-[#DFDFDF] w-12 h-12 rounded-xl"
          >
            <img src={dummy} alt="dummy_avatar" />
          </Box>
          {isOpened && (
            <Box component="div" className="flex flex-col font-inter">
              <p className="font-light  text-[#8C8C8C] text-sm dark:text-white">
                Hello 👋,
              </p>
              <h2 className="font-[#343434] text-xl font-semibold">
                {userName}
              </h2>
            </Box>
          )}
          <span
            onClick={() => setIsOpened(!isOpened)}
            className="bg-[#084A9B] cursor-pointer absolute top-6 -right-9 rounded-full w-6 h-6 shadow-[#084A9B] shadow-md flex items-center justify-center dark:bg-[#292929]"
          >
            {isOpened ? <BackArrow /> : <ForwardArrow />}
          </span>
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          xs={12}
          className={`h-[61vh] flex space-y-6 sm:space-y-8 md:space-y-8 !flex-col ${
            isOpened ? 'p-7' : 'p-2 items-center justify-center'
          }`}
        >
          <div>
            <Link to={'/dashboard'} className="flex space-x-4">
              <span>
                <img src={DashboardIcon} alt="dashboard" />
              </span>
              {isOpened && (
                <span className="text-[#343434] text-lg sm:text-sm md:text-sm font-light font-sora dark:text-white">
                  Dashboard
                </span>
              )}
            </Link>
          </div>
          <div>
            <div className="flex space-x-4 cursor-pointer">
              <span>
                <img src={ProjectsIcon} alt="projects" />
              </span>
              {isOpened && (
                <span className="text-[#343434] sm:text-sm md:text-sm text-lg font-light font-sora dark:text-white">
                  Projects
                </span>
              )}
            </div>
            {isOpened && (
              <div className="flex flex-col border-l-[0.5px] rounded-bl-xl translate-x-3 border-[#343434]">
                {latestProjects?.map((project, i) => {
                  return (
                    <a
                      className="border-[#343434] border-b-[0.5px] rounded-bl-xl w-[30px] h-[30px]"
                      key={i}
                      href={`/dashboard/projects/${project?.id}/${project?.originalVideoFile}/view`}
                    >
                      <span className="translate-y-4 ml-8 -mb-4 w-[80px] inline-block font-inter font-normal sm:text-sm md:text-sm text-base text-[#343434] cursor-pointer">
                        {project?.projectName}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <Link to={'/profile'} className="flex space-x-4">
              <span>
                <img src={ProfileIcon} alt="profile" />
              </span>
              {isOpened && (
                <span className="text-[#343434] sm:text-sm md:text-sm text-lg font-light font-sora dark:text-white">
                  Profile
                </span>
              )}
            </Link>
          </div>
          <div>
            <Link to={'/faq'} className="flex space-x-4">
              <span>
                <img src={FAQIcon} alt="faq" />
              </span>
              {isOpened && (
                <span className="text-[#343434] sm:text-sm md:text-sm text-lg font-light font-sora dark:text-white">
                  FAQ
                </span>
              )}
            </Link>
          </div>
          <div>
            <Link to={'/tutorials'} className="flex space-x-4">
              <span>
                <img src={TutorialsIcon} alt="tutorials" />
              </span>
              {isOpened && (
                <span className="text-[#343434] sm:text-sm md:text-sm text-lg font-light font-sora dark:text-white">
                  Tutorials
                </span>
              )}
            </Link>
          </div>
          <div>
            <div
              onClick={() => setOpenDelFolderConfirmation(true)}
              className="flex space-x-4 cursor-pointer"
            >
              <span>
                <img src={LogoutIcon} alt="logout" />
              </span>
              {isOpened && (
                <span className="text-[#343434] sm:text-sm md:text-sm text-lg font-light font-sora dark:text-white">
                  Logout
                </span>
              )}
            </div>

            {opendelFolderConfirmation && (
              <StandardConfirmationDialog
                heading="Are you sure you want to Logout?"
                subHeading="You can always login back."
                confirmText="Yes"
                disAgreeText="No"
                onAgree={() => {
                  logout();
                }}
                onDisAgree={() => ({})}
                open={opendelFolderConfirmation}
                setOpen={setOpenDelFolderConfirmation}
              />
            )}
          </div>
          {/* <div className="flex justify-center items-center pt-6">
            <ThemeToggleSwitch />
          </div> */}
        </Grid>
        {/* {isOpened ? (
          <>
            <Grid
              item
              sm={12}
              md={12}
              xs={12}
              className="hidden cursor-pointer sm:flex md:flex !flex-col space-y-6 items-center justify-center  px-2"
            >
              <div className="flex flex-col font-sora font-semibold text-[16px] text-[#8C8C8C] items-center justify-center leading-3">
                <img
                  src={PlusForProject}
                  alt="add_project"
                  className="animate-bounce-slow"
                />
                <span>Upload</span>
              </div>
            </Grid>
            <Grid
              item
              sm={12}
              md={12}
              xs={12}
              className="sm:hidden md:hidden border-[#000000] border shadow-xl rounded-[20px] border-dashed cursor-pointer flex !flex-col space-y-6 items-center justify-center h-[23%] px-7"
            >
              <div className="flex flex-col font-sora font-semibold text-[16px] text-[#8C8C8C] items-center justify-center leading-3">
                <img
                  src={PlusForProject}
                  alt="add_project"
                  className="animate-bounce-slow"
                />
                <span>Upload</span>
              </div>
              <span className="font-inter text-[14px] font-semibold text-[#343434]">
                Drag and drop
              </span>
            </Grid>
          </>
        ) : (
          <Grid
            item
            sm={12}
            md={12}
            xs={12}
            className="cursor-pointer flex !flex-col space-y-6 items-center justify-center  px-2"
          >
            <div className="flex flex-col font-sora font-semibold text-[16px] text-[#8C8C8C] items-center justify-center leading-3">
              <img
                src={PlusForProject}
                alt="add_project"
                className="animate-bounce-slow"
              />
              <span>Upload</span>
            </div>
          </Grid>
        )} */}
      </Grid>
    </>
  );
};

export default Sidebar;
