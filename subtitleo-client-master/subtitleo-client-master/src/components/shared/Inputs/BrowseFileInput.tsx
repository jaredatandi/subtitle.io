import React from "react";

type Props = {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  id: string;
  name: string;
  className?: string;
};
const BrowseFileInput = ({
  value,
  onChange,
  label,
  id,
  name,
  className = "",
}: Props) => {
  return (
    <div className="flex flex-col justify-start my-4 relative">
      <label
        htmlFor={id}
        className="text-start font-sora font-light leading-[25.2px] text-sm text-[#595959] dark:text-white"
      >
        {label}
      </label>
      <input
        className={
          "rounded-[10px] hidden border bg-transparent border-[#B9B9B9] min-w-[297px] w-[297px]  p-2 " +
          className
        }
        value={value}
        type={"file"}
        id={id}
        name={name}
        placeholder={"Choose File"}
        onChange={onChange}
      />
      <div>
        <label
          htmlFor={id}
          className="rounded-[10px] min-w-[297px] text-end block w-[297px] p-2 border bg-transparent border-[#B9B9B9]"
        >
          <span className="bg-ternary cursor-pointer rounded-[10px] p-2 text-[#FFFFFF] font-sora font-light text-sm">
            Browse
          </span>
        </label>
      </div>
    </div>
  );
};

export default BrowseFileInput;
