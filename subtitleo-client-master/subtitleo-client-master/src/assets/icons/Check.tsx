import { SvgIconProps } from "@mui/material";
import React from "react";

const Check = (props: SvgIconProps) => {
  return (
    <svg
      width={props.width || "24"}
      height={props.height || "25"}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6.86035L9 17.8604L4 12.8604"
        stroke="#5AAD52"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Check;
