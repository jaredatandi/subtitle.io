import React from "react";

type Props = {
  text: string | null | undefined;
  className?: string;
};
const ErrorText = ({ text, className = "" }: Props) => {
  return (
    <p
      className={
        "text-xs text-red-600 text-sora text-start leading-[5px] " + className
      }
    >
      {text}
    </p>
  );
};

export default ErrorText;
