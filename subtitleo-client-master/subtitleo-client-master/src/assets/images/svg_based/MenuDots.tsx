import { SvgIconProps } from "@mui/material";
import React from "react";

const MenuDots = (props: SvgIconProps) => {
  return (
    <svg
      width={props.width || "17"}
      height={props.height || "33"}
      viewBox="0 0 17 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="17" height="33" rx="7" fill="#E7E7E7" />
      <circle cx="8.5" cy="11.5" r="1.5" fill="#343434" />
      <circle cx="8.5" cy="16.5" r="1.5" fill="#343434" />
      <circle cx="8.5" cy="21.5" r="1.5" fill="#343434" />
    </svg>
  );
};

export default MenuDots;
