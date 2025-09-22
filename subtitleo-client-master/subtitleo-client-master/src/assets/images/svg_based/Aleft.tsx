import { SVGPropsType } from "./types/SVGTypes";

const AlignLeft = (props: SVGPropsType) => {
  return (
    <svg
      width={props.width || "20"}
      height={props.height || "14"}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H18"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 5H12"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1.00293 8.91602L18.0027 9"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 13H8"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AlignLeft;
