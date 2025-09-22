import { SVGPropsType } from "./types/SVGTypes";

const BackArrow = (props: SVGPropsType) => {
  return (
    <svg
      width={props.width || "9"}
      height={props.height || "16"}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.4999 0.774983C7.34157 0.774983 7.18323 0.833315 7.05823 0.958315L1.6249 6.39165C0.741568 7.27498 0.741568 8.72498 1.6249 9.60832L7.05824 15.0416C7.2999 15.2833 7.6999 15.2833 7.94157 15.0416C8.18324 14.8 8.18324 14.4 7.94157 14.1583L2.50824 8.72498C2.10824 8.32498 2.10824 7.67498 2.50824 7.27498L7.94157 1.84165C8.18323 1.59998 8.18323 1.19998 7.94157 0.958315C7.81657 0.841648 7.65823 0.774983 7.4999 0.774983Z"
        fill="white"
      />
    </svg>
  );
};

export default BackArrow;
