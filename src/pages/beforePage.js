import React from "react";
import { Compare } from "../Components/beforeAfter";
const beforeImg = "/Assets/before.png";
const afterImg = "/Assets/after.png";

const BeforePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8e2d4]">
      <h1 className="text-3xl font-bold mb-8 text-[#422f40]">Before / After Demo</h1>
      <Compare
        firstImage={beforeImg}
        secondImage={afterImg}
        className="w-[400px] h-[400px]"
        initialSliderPercentage={50}
        slideMode="hover"
        showHandlebar={true}
        autoplay={false}
      />
    </div>
  );
};

export default BeforePage;
