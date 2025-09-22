import { SvgIconProps } from "@mui/material";
import React from "react";

const ColorPickerIcon = (props: SvgIconProps) => {
  return (
    <svg
      width={props.width || "19"}
      height={props.height || "17"}
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.48535 0L16.9706 8.48528L10.6067 14.8492C9.4351 16.0208 7.5356 16.0208 6.36403 14.8492L2.12139 10.6066C0.949818 9.43503 0.949818 7.53553 2.12139 6.36396L8.48535 0Z"
        fill="#8C8C8C"
      />
      <path
        d="M16.4854 11.4844C15.9854 6.48437 18.4854 12.3798 18.4854 13.4844C18.4854 14.5889 17.5899 15.4844 16.4854 15.4844C15.3808 15.4844 14.4854 14.5889 14.4854 13.4844C14.4854 12.3798 16.9854 6.48437 16.4854 11.4844Z"
        fill="#8C8C8C"
      />
    </svg>
  );
};

export default ColorPickerIcon;
