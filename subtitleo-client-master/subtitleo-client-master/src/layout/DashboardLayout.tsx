import { Grid } from "@mui/material";
import MainLogoDark from "assets/images/svg_based/MainLogoDark";
import MainLogoLight from "assets/images/svg_based/MainLogoWhite";
import Sidebar from "components/Dashboard/Sidebar/Sidebar";
import React from "react";

type Props = {
  children?: React.ReactNode;
  sidebar?: boolean;
};

const DashboardLayout = ({ children, sidebar = true }: Props) => {
  return (
    <>
      {sidebar && <Sidebar />}
      <Grid container className=" dark:bg-[#292929]">
        <Grid
          item
          md={12}
          xs={12}
          sm={12}
          className="p-[16px] flex items-center justify-center border-b-2 border-[#EBEBEB] dark:bg-[#292929] dark:border-[#626262]"
        >
          <div className="relative dark:hidden">
            <MainLogoDark width={165} height={47} />
            {/* <span className="absolute -top-1.5 bg-ternary/10 -right-6 p-0.5 text-xs border rounded-lg border-ternary text-ternary font-sora">
              Beta
            </span> */}
          </div>

          <div className="relative hidden dark:block">
            <MainLogoLight width={165} height={47} />
          </div>
        
        </Grid>
        <Grid item md={12} xs={12} sm={12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardLayout;
