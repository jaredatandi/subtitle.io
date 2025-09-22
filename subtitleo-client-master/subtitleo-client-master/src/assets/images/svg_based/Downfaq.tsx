import { SVGPropsType } from "./types/SVGTypes";

const Downfaq = (props: SVGPropsType) => {
  return (
    <svg
      width={props.width || "83"}
      height={props.height || "83"}
      viewBox="0 0 83 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_79_141)">
        <circle cx="41.6561" cy="36.6596" r="25.3309" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_79_141"
          x="0.325195"
          y="0.328735"
          width="82.6621"
          height="82.6617"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0323264 0 0 0 0 0.0598209 0 0 0 0 0.204167 0 0 0 0.06 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_79_141"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_79_141"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Downfaq;
