import React from "react";

type Props = {
  text: string;
  className?: string;
  onClick?: any;
};
const StandardButton = ({ text, className = "", onClick }: Props) => {
  return (
    <div
      className={
        "w-[300px] h-[50px] sm:w-[150px] sm:h-[40px] md:w-[150px] md:h-[40px] sm:text-sm  md:text-sm cursor-pointer hover:bg-ternary/90 bg-ternary text-sora font-semibold text-center text-xl text-white rounded-lg flex items-center justify-center " +
        className
      }
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default StandardButton;
