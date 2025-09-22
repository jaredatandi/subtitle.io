import { SVGPropsType } from "./types/SVGTypes";

const ForwardArrow = (props: SVGPropsType) => {
  return (
    <svg
      width={props.width || "9"}
      height={props.height || "16"}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5001 15.225C1.65843 15.225 1.81676 15.1667 1.94176 15.0417L7.3751 9.60835C8.25843 8.72502 8.25843 7.27502 7.3751 6.39168L1.94176 0.95835C1.7001 0.716683 1.3001 0.716683 1.05843 0.95835C0.816764 1.20002 0.816764 1.60002 1.05843 1.84168L6.49176 7.27502C6.89176 7.67502 6.89176 8.32502 6.49176 8.72502L1.05843 14.1583C0.816764 14.4 0.816764 14.8 1.05843 15.0417C1.18343 15.1584 1.34176 15.225 1.5001 15.225Z"
        fill="white"
      />
    </svg>
  );
};

export default ForwardArrow;
