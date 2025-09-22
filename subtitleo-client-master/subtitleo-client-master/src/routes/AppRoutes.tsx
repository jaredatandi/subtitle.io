import ForgotPassword from "pages/Auth/ForgotPassword/ForgotPassword";
import Login from "pages/Auth/Login/Login";
import Register from "pages/Auth/Register/Register";
import Dashboard from "pages/Dashboard/Dashboard";
import FAQ from "pages/FAQ/FAQ";
import Profile from "pages/Profile/Profile";
import AddProject from "pages/Projects/AddProject/AddProject";
import EditProject from "pages/Projects/EditProject/EditProject";
import Projects from "pages/Projects/Projects";
import ViewProject from "pages/Projects/ViewProject/ViewProject";
import Tutorials from "pages/Tutorials/Tutorials";
// import UnderDevelopment from "pages/UnderDevelopment/UnderDevelopment";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      {/* == Auth ==   */}
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* == Dashboard == */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/dashboard/projects/:folderName/:folderId"
        element={<Projects />}
      />
      <Route path="/dashboard/projects/create" element={<AddProject />} />
      <Route
        path="/dashboard/projects/:projectId/:viewKey/edit"
        element={<EditProject />}
      />
      <Route
        path="/dashboard/projects/:projectId/:viewKey/view"
        element={<ViewProject />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/tutorials" element={<Tutorials />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
