import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useWindowWidth from "../hooks/useWindowWidth";
import FuzzyText from './FuzzyText';

const images = [
  "/Assets/b1.jpg",
  "/Assets/b2.jpg",
  "/Assets/b3.jpg",
  "/Assets/b4.jpg",
  "/Assets/b5.jpg",
  "/Assets/b6.jpg",
  "/Assets/b7.jpg",
  "/Assets/b8.jpg",
  
 
];

const Galery2 = () => {
  const { t } = useTranslation();
  const windowWidth = useWindowWidth();
  const [position, setPosition] = useState(0);

  const prevSlide = () => {
    setPosition(prev => prev - 1);
  };

  const nextSlide = () => {
    setPosition(prev => prev + 1);
  };

  // Create enough copies to ensure smooth infinite scrolling
  const repeatedImages = [];
  for (let i = 0; i < 100; i++) {
    repeatedImages.push(...images);
  }

  // Start from the middle set of images, but at the first image of that set
  const startingPosition = Math.floor(repeatedImages.length / 2) - Math.floor(images.length / 2);
  const currentPosition = startingPosition + position;

  const isMobile = windowWidth < 768;
  const scale = isMobile ? 0.6 : 1.0;

  const slideWidth = 400 * scale;
  const containerWidth = 540 * scale;
  const containerHeight = 540 * scale;
  const imageHeight = 420 * scale;

  return (
    <div className="relative w-full flex flex-col bg-[#e8e2d4] min-h-[600px] py-8 overflow-hidden">

    {/* <div className="relative w-full flex flex-col items-center bg-[#e8e2d4] min-h-[600px] py-8 overflow-hidden"> */}
      {/* Title and Description */}
      {/* <div className="justify-start mb-4 -ml-32">
        <div className="uppercase flex justify-start mb-4 -ml-20">
          <FuzzyText 
              baseIntensity={0.0} 
              hoverIntensity={0.2} 
              enableHover={true}
              color="#422f40"
              fontSize="clamp(3rem, 7vw, 8rem)"
              fontWeight={900}
          >
              {t('galery2.title').toUpperCase()}
          </FuzzyText>
        </div>
        <p className=" text-lg md:text-xl text-[#422f40] leading-relaxed mb-4 text-left ml-0">
          {t('galery2.description1')}
        </p>
        <p className="max-w-6xl text-base md:text-lg text-[#422f40] leading-relaxed text-left ml-0">
          {t('galery2.description2')}
        </p>
        <p className="max-w-6xl text-base md:text-lg text-[#422f40] leading-relaxed mt-4 text-left ml-0">
          {t('galery2.description3')}
        </p>
      </div> */}
      



      <div className="mb-4 md:mb-8 mt-4 md:mt-8">
  <div className="flex justify-start mb-4 md:mb-4">
  <FuzzyText
  baseIntensity={0.0}
  hoverIntensity={0.2}
  enableHover={true}
  color="#422f40"
  fontWeight={900}
>
  {t('galery2.title').toUpperCase()}
</FuzzyText>
  </div>
  <p
    className="
       text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed text-left ml-8 mr-8 md:ml-16 lg:ml-16
   mb-4 md:mb-4 lg:mb-8
    "
  >
    {t('galery2.description1')}
  </p>
  <p
    className="
     max-w-6xl  text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed text-left ml-8 mr-8 md:ml-16 lg:ml-16
   mb-2 md:mb-4 lg:mb-8
    "
  >
    {t('galery2.description2')}
  </p>
  <p
    className="
      max-w-6xl text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed text-left ml-8 mr-8 md:ml-16 lg:ml-16
   mb-2 md:mb-4 lg:mb-8
    "
  >
    {t('galery2.description3')}
  </p>
</div>


      <div className="w-full flex justify-center items-center overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${currentPosition * slideWidth}px + 50% - ${slideWidth / 2}px))`,
            width: `${repeatedImages.length * slideWidth}px`,
          }}
        >
                      {repeatedImages.map((img, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 flex justify-center items-center px-8"
                style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
              >
              <img
                src={img}
                alt=""
                className="rounded-xl object-cover w-full"
                style={{ height: `${imageHeight}px` }}
              />
            </div>
          ))}
        </div>
      </div>
             {/* Navigation arrows */}
       <div className="flex justify-center items-center space-x-10 -mt-2">
         <button
           onClick={prevSlide}
           className="group focus:outline-none"
           aria-label="Previous image"
         >
           <svg width="84" height="42" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M28 8L4 8M4 8L12 1M4 8L12 15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-black transition-colors duration-200"/>
           </svg>
         </button>
         <button
           onClick={nextSlide}
           className="group focus:outline-none"
           aria-label="Next image"
         >
           <svg width="84" height="42" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M4 8L28 8M28 8L20 1M28 8L20 15" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-black transition-colors duration-200"/>
           </svg>
         </button>
       </div>
    </div>
  );
};

export default Galery2;
