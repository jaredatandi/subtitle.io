import { SvgIconProps } from "@mui/material";
import React from "react";

const ItalicIcon = (props: SvgIconProps) => {
  return (
    <svg
      width={props.width || "5"}
      height={props.height || "9"}
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.20385 0.446176L1.94506 8.87607L0.924257 8.60255L3.18304 0.172651L4.20385 0.446176Z"
        fill="#343434"
      />
    </svg>
  );
};

export default ItalicIcon;
