import { SvgIconProps } from "@mui/material";
import React from "react";

const Upload = (props: SvgIconProps) => {
  return (
    <svg
      width={props.width || "77"}
      height={props.height || "73"}
      viewBox="0 0 77 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.7083 26.5833V22.625C18.7083 11.6944 27.5694 2.83334 38.5 2.83334C49.4305 2.83334 58.2917 11.6944 58.2917 22.625V26.5833C67.036 26.5833 74.125 33.6723 74.125 42.4167C74.125 48.2774 70.9409 53.5333 66.2083 56.2708M18.7083 26.5833C9.96382 26.5833 2.875 33.6723 2.875 42.4167C2.875 48.2774 6.05908 53.5333 10.7917 56.2708M18.7083 26.5833C20.4217 26.5833 22.0715 26.8557 23.6169 27.3588M38.5 34.5V70.125M38.5 34.5L50.375 46.375M38.5 34.5L26.625 46.375"
        stroke="#343434"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Upload;
