import { Grid } from "@mui/material";
import React from "react";

type Props = {
  vector: any;
  children: React.ReactNode;
};

const AuthLayout = ({ vector, children }: Props) => {
  return (
    <Grid container className="p-12 flex items-center justify-center dark:bg-[#292929]">
      <Grid item md={6} sm={12} xs={12} className="sm:hidden h-11/12 lg:hidden">
        {vector}
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
