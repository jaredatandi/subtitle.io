import DashboardLayout from "layout/DashboardLayout";
import React from "react";
import { Helmet } from "react-helmet";

const Tutorials = () => {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Tutorials - SubtitleO</title>
      </Helmet>
      <div className="ml-[11.8vw] sm:ml-0 flex items-center justify-center flex-col">
        <h1 className="text-[40px] sm:text-[20px] md:text-[35px] text-center sm:mx-4 md:mx-6 font-sora font-bold text-[#084A9B] my-6">
          See how to use SubtitleO!
        </h1>
        <iframe
          src="https://www.youtube.com/embed/VPjun4HOQUc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-11/12 h-[70vh]"
        ></iframe>
      </div>
    </DashboardLayout>
  );
};

export default Tutorials;
