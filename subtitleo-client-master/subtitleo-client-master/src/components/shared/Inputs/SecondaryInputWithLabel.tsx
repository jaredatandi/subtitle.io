import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  name: string;
  className?: string;
  isPassword?: boolean;
};
const SecondaryInputWithLabel = ({
  value,
  placeholder,
  onChange,
  label,
  id,
  name,
  className = "",
  isPassword,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-start my-4 relative ">
      <label
        htmlFor={id}
        className="text-start font-sora font-light leading-[25.2px] text-sm text-[#595959] dark:text-white"
      >
        {label}
      </label>
      <input
        className={
          "rounded-[10px] border bg-transparent border-[#B9B9B9] min-w-[297px] w-[297px]  p-2 " +
          className
        }
        value={value}
        type={isPassword ? (!showPassword ? "password" : "text") : "text"}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {isPassword && (
        <div className="absolute top-1/2 right-3">
          {!showPassword ? (
            <AiOutlineEyeInvisible
              onClick={() => setShowPassword(!showPassword)}
              className="text-2xl cursor-pointer text-[#7B7B7B]"
            />
          ) : (
            <AiOutlineEye
              onClick={() => setShowPassword(!showPassword)}
              className="text-2xl cursor-pointer text-[#7B7B7B]"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SecondaryInputWithLabel;
