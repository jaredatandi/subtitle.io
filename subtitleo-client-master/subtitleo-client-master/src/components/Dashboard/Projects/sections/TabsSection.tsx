import React from "react";

type Props = {
  projectName: string;
  tabs: string[];
  activeTab: string;
  setActiveTab: any;
};

const TabsSection = ({ projectName, tabs, activeTab, setActiveTab }: Props) => {
  return (
    <>
      <h3 className="font-sora font-semibold text-xl sm:hidden md:hidden">
        {projectName}
      </h3>
      <div className="bg-[#E7E7E7] rounded-[17.5px] w-fit flex items-center justify-center space-x-2 my-2">
        {tabs?.map((tab, idx) => {
          return (
            <span
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={`text-secondary text-sm p-2 cursor-pointer font-sora ${
                activeTab === tab
                  ? "bg-ternary rounded-[17.5px] text-white"
                  : ""
              }`}
            >
              {tab}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default TabsSection;
