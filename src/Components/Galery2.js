import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useWindowWidth from "../hooks/useWindowWidth";
import FuzzyText from './FuzzyText';
import { useFontLoader } from '../hooks/useFontLoader';

const images = [
  "/Assets/g8.png",
  "/Assets/g9.png",
  "/Assets/g7.png",
  "/Assets/g4.png",

  "/Assets/g10.png",
  "/Assets/g11.png",
  "/Assets/g8.png",
  "/Assets/g9.png",
  "/Assets/g7.png",
  "/Assets/g4.png",

  "/Assets/g10.png",
  "/Assets/g11.png",
  
 
];

const Galery2 = () => {
  const { t, i18n } = useTranslation();
  const windowWidth = useWindowWidth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const isArabic = i18n.language === 'ar';
  const fontLoaded = useFontLoader('RH-Zak', isArabic);

  const prevSlide = () => {
    setScrollPosition(prev => prev - slideWidth);
  };

  const nextSlide = () => {
    setScrollPosition(prev => prev + slideWidth);
  };

  // Create enough copies to ensure smooth infinite scrolling
  const repeatedImages = [];
  for (let i = 0; i < 100; i++) {
    repeatedImages.push(...images);
  }

  const isMobile = windowWidth < 768;
  const scale = isMobile ? 0.6 : 1.0;

  const slideWidth = 400 * scale;
  const containerWidth = 540 * scale;
  const containerHeight = 540 * scale;
  const imageHeight = 420 * scale;

  // Calculate center position
  const centerOffset = (windowWidth - slideWidth) / 2;

  // Touch/Mouse event handlers
  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
    setDragOffset(0);
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    
    // Only handle horizontal scrolling if the horizontal movement is greater than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset(deltaX);
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    // Apply the drag offset to the scroll position
    setScrollPosition(prev => prev - dragOffset);
    
    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Wheel event for horizontal scrolling
  const handleWheel = (e) => {
    e.preventDefault();
    const scrollAmount = e.deltaY * 0.5; // Adjust sensitivity
    setScrollPosition(prev => prev + scrollAmount);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, startX, startY, dragOffset]);

  return (
    <div className="relative w-full flex flex-col bg-[#e8e2d4] min-h-[600px] py-8 overflow-hidden">

      <div className="mb-4 md:mb-8 mt-4 md:mt-8" style={isArabic ? { direction: 'rtl', textAlign: 'right' } : {}}>
  <div className={`mb-4 md:mb-4 w-full ${isArabic ? 'text-right' : 'text-left'}`}>
  <div className={isArabic ? 'inline-block ml-auto' : 'inline-block'}>
  {isMobile ? (
    <h1 className="text-4xl font-bold text-[#422f40] uppercase ml-8 md:ml-16 lg:ml-16 tracking-tighter">
      {t('galery2.title').toUpperCase()}
    </h1>
  ) : (
    <FuzzyText
      baseIntensity={0.0}
      hoverIntensity={0.2}
      enableHover={true}
      color="#422f40"
      fontWeight={900}
      fontFamily={isArabic ? 'RH-Zak, sans-serif' : 'inherit'}
    >
      {t('galery2.title').toUpperCase()}
    </FuzzyText>
  )}
  </div>
  </div>
  <p
    className={`
       text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed ml-8 mr-8 md:ml-16 lg:ml-16
   mb-4 md:mb-4 lg:mb-8
      ${isArabic ? 'text-right' : 'text-left'}
    `}
    style={isArabic ? { direction: 'rtl' } : {}}
  >
    {t('galery2.description1')}
  </p>
  <p
    className={`
     max-w-6xl  text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed ml-8 mr-8 md:ml-16 lg:ml-16
   mb-2 md:mb-4 lg:mb-8
      ${isArabic ? 'text-right' : 'text-left'}
    `}
    style={isArabic ? { direction: 'rtl' } : {}}
  >
    {t('galery2.description2')}
  </p>
  <p
    className={`
      max-w-6xl text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed ml-8 mr-8 md:ml-16 lg:ml-16
   mb-2 md:mb-4 lg:mb-8
      ${isArabic ? 'text-right' : 'text-left'}
    `}
    style={isArabic ? { direction: 'rtl' } : {}}
  >
    {t('galery2.description3')}
  </p>
</div>


      <div 
        ref={containerRef}
        className="w-full flex justify-center items-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        style={{ 
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${scrollPosition}px + ${centerOffset}px + ${dragOffset}px))`,
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
                className="rounded-xl object-cover w-full pointer-events-none"
                style={{ height: `${imageHeight}px` }}
                draggable={false}
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
