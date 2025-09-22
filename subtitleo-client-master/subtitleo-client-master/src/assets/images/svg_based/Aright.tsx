import { SVGPropsType } from "./types/SVGTypes";

const AlignRight = (props: SVGPropsType) => {
  return (
    <svg
      width={props.width || "20"}
      height={props.height || "14"}
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0027 13L1.00269 13"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.0027 9L7.00269 9"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M17.9998 5.08398L0.999964 5"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.0027 1L11.0027 1"
        stroke="#343434"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AlignRight;
