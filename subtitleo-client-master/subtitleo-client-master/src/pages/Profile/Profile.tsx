import { Grid } from "@mui/material";
import StandardButton from "components/shared/Buttons/StandardButton";
import BrowseFileInput from "components/shared/Inputs/BrowseFileInput";
import SecondaryInputWithLabel from "components/shared/Inputs/SecondaryInputWithLabel";
import DashboardLayout from "layout/DashboardLayout";
import React from "react";
import { Helmet } from "react-helmet";

const Profile = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>My Profile - SubtitleO</title>
      </Helmet>
      <div className="ml-[9.5vw] p-4  dark:bg-[#292929] ">
        <h1 className="font-sora font-semibold text-[20px] text-[#363636] dark:text-white">
          Contact Information
        </h1>
        <Grid container>
          <Grid item xs={12} md={3}>
            <SecondaryInputWithLabel
              id="firstName"
              name="firstName"
              label="First Name"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SecondaryInputWithLabel
              id="lastName"
              name="lastName"
              label="Last Name"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <BrowseFileInput
              id="profile"
              name="profile"
              label="Profile Picture"
              onChange={() => {}}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={3}>
            <SecondaryInputWithLabel
              id="email"
              name="email"
              label="Email"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SecondaryInputWithLabel
              id="phone"
              name="phone"
              label="Phone Number"
              onChange={() => {}}
            />
          </Grid>
        </Grid>
        <h1 className="font-sora font-semibold text-[20px] text-[#363636] dark:text-white">
          Update Password
        </h1>
        <Grid container>
          <Grid item xs={12} md={12}>
            <SecondaryInputWithLabel
              id="currentPassword"
              name="currentPassword"
              label="Current Password"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <SecondaryInputWithLabel
              id="newPassword"
              name="newPassword"
              label="New Password"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <SecondaryInputWithLabel
              id="reEnterPassword"
              name="reEnterPassword"
              label="Re-Enter New Password"
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <StandardButton text="Reset Password" />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
