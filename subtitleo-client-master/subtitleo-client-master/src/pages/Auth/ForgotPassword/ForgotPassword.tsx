import { Grid } from "@mui/material";
import ForgotPasswordImage from "assets/images/svg_based/ForgotPasswordImage";
import StandardButton from "components/shared/Buttons/StandardButton";
import StandardInputWithLabel from "components/shared/Inputs/StandardInputWithLabel";
import AuthLayout from "layout/AuthLayout";
import React from "react";

const ForgotPassword = () => {
  return (
    <AuthLayout vector={<ForgotPasswordImage height={700} width={700} />}>
      <Grid
        container
        className="text-center flex flex-col items-center justify-center"
      >
        <Grid item xs={12} sm={12} md={12}>
          <h1 className="flex items-center justify-center mb-4 sm:flex-col">
            <span className="text-primary font-rhd font-semibold leading-[63.5px] text-5xl sm:text-2xl lg:text-3xl dark:text-white">
              ForgotPassword
            </span>
          </h1>
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="email"
            name="email"
            label="Email"
            onChange={() => {}}
            placeholder="Enter your email."
            isSuccess
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="newPassword"
            name="newPassword"
            label="New Password"
            onChange={() => {}}
            placeholder="Enter your new password."
          />
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <StandardInputWithLabel
            id="reEnterNewPassword"
            name="reEnterNewPassword"
            label="Re-Enter New Password"
            onChange={() => {}}
            isPassword
            placeholder="Re-Enter your new password."
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          className="flex items-center justify-center py-4"
        >
          <StandardButton text="Update password" />
        </Grid>
      </Grid>
    </AuthLayout>
  );
};

export default ForgotPassword;
