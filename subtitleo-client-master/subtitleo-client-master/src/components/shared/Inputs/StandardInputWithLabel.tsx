import Check from "assets/icons/Check";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

type Props = {
  value?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  name: string;
  className?: string;
  isPassword?: boolean;
  disabled?: boolean;
  isSuccess?: boolean;
  onKeyPress?: any;
};
const StandardInputWithLabel = ({
  value,
  placeholder,
  onChange,
  label,
  id,
  name,
  className = "",
  isPassword,
  disabled,
  isSuccess,
  onKeyPress,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col justify-start my-4 relative">
      <label
        htmlFor={id}
        className="text-start font-sora font-semibold leading-[25.2px] text-sm text-[#7B7B7B] dark:text-white"
      >
        {label}
      </label>
      <input
        className={
          "bg-white transition-all  focus:outline-ternary p-5 w-full h-16 rounded-lg text-black disabled:opacity-70 " +
          className
        }
        value={value}
        type={isPassword ? (!showPassword ? "password" : "text") : "text"}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={onKeyPress}
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

      {isSuccess && (
        <div className="absolute top-1/2 right-3">
          <Check />
        </div>
      )}
    </div>
  );
};
export default StandardInputWithLabel;
