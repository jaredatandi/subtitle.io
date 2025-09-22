import { Box, Typography } from "@mui/material";
import DashboardLayout from "layout/DashboardLayout";
import React from "react";
import { IoIosConstruct } from "react-icons/io";

const UnderDevelopment = () => {
  return (
    <DashboardLayout>
      <Box
        className="
        flex 
        items-center 
        justify-center 
        bg-gray-100 
        space-y-8 
        text-center
        ml-[9.5vw]
        flex-col my-12
      "
      >
        <IoIosConstruct className="text-9xl text-blue-500" />
        <Typography variant="h4">Under Construction...</Typography>
      </Box>
    </DashboardLayout>
  );
};

export default UnderDevelopment;
