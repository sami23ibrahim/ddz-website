
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FuzzyText from './FuzzyText';

gsap.registerPlugin(ScrollTrigger);

const SmilesGallery = () => {
  const { t, i18n } = useTranslation();
  const rowsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const isRTL = i18n.language === 'ar';

  // Effect to update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Reduced animation complexity for better performance
    const animations = rowsRef.current.map((row, index) => {
      if (!row) return null;
      
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = window.innerWidth * 0.05 * direction; // Reduced distance

      return gsap.to(row, {
        x: distance,
        duration: 0.8, // Faster animation
        ease: "power1.out",
        scrollTrigger: {
          trigger: row,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Reduced scrub for better performance
        },
      });
    });

    return () => {
      // Cleanup animations
      animations.forEach(anim => {
        if (anim) {
          anim.kill();
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isVisible]);

  // Three unique image arrays for each row
  const row1 = [
    "./Assets/sm7.png",
    "./Assets/sm5.png",
    "./Assets/sm2.png",
    "./Assets/sm2.png",
    "./Assets/sm3.png",
    "./Assets/sm8.png",
    "./Assets/sm9.png",
    "./Assets/sm7.png",
  ];
  const row2 = [
    "./Assets/sm4.png",
    "./Assets/sm6.png",
    "./Assets/sm17.png",
    "./Assets/sm19.png",
    "./Assets/sm18.png",
    "./Assets/sm1.png",
    "./Assets/sm1.png",
    "./Assets/sm13.png",
  ];
  const row3 = [
    "./Assets/sm6.png",
    "./Assets/sm11.png",
    "./Assets/sm15.png",
    "./Assets/sm8.png",
    "./Assets/sm4.png",
    "./Assets/sm14.png",
    "./Assets/sm13.png",
    "./Assets/sm15.png",
  ];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[600px] sm:min-h-[700px] bg-[#e8e2d4] flex flex-col justify-center items-center w-full overflow-hidden"
    >
      
      {/* Title (Only Visible for Mobile Screens) */}
      {isMobile && (
        <div className="w-full mb-04 mt-1 px-8 md:px-16 lg:px-16">
          <h1 className={`text-4xl font-bold text-[#422f40] uppercase tracking-tighter ${isRTL ? 'text-right' : 'text-left'}`}>
            {t("smile_gallery.title").toUpperCase()}
          </h1>
        </div>
      )}

      <div className="w-full max-w-screen-xl space-y-6 py-4">
        
        {/* First Row */}
        <div ref={(el) => (rowsRef.current[0] = el)} className="flex w-full justify-center items-center gap-x-6">
          {row1.map((img, idx) => (
            idx === 3 && !isMobile ? (
              <h1 key={idx} className="text-[#422f40] text-8xl font-bold whitespace-nowrap tracking-tighter">
                {t("smile_gallery.words.our")}
              </h1>
            ) : (
              <div key={idx} 
                className="bg-[#E8DCC6] rounded-xl overflow-hidden flex-none group transition-transform duration-300 hover:scale-110 
                w-[160px] h-[100px] sm:w-[210px] sm:h-[100px] lg:w-[310px] lg:h-[135px]">
                <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )
          ))}
        </div>

        {/* Second Row */}
        <div ref={(el) => (rowsRef.current[1] = el)} className="flex w-full justify-center items-center gap-x-6">
          {row2.map((img, idx) => (
            idx === 5 && !isMobile  ? (
              <h1 key={idx} className="text-[#422f40] text-8xl font-bold whitespace-nowrap tracking-tighter">
                {t("smile_gallery.words.smile")}
              </h1>
            ) : (
              <div key={idx} 
                className="bg-[#E8DCC6] rounded-xl overflow-hidden flex-none group transition-transform duration-300 hover:scale-110 
                w-[160px] h-[100px] sm:w-[210px] sm:h-[100px] lg:w-[310px] lg:h-[135px]">
                <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )
          ))}
        </div>

        {/* Third Row */}
        <div ref={(el) => (rowsRef.current[2] = el)} className="flex w-full justify-center items-center gap-x-6">
          {row3.map((img, idx) => (
            idx === 3 && !isMobile ? (
              <h1 key={idx} className="text-[#422f40] text-8xl font-bold whitespace-nowrap tracking-tighter">
                {t("smile_gallery.words.gallery")}
              </h1>
            ) : (
              <div key={idx} 
                className="bg-[#E8DCC6] rounded-xl overflow-hidden flex-none group transition-transform duration-300 hover:scale-110 
                w-[160px] h-[100px] sm:w-[210px] sm:h-[100px] lg:w-[310px] lg:h-[135px]">
                <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            )
          ))}
        </div>

      </div>
    </div>
  );
};

export default SmilesGallery;
