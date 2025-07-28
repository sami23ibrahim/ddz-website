import React from "react";
import { useTranslation } from "react-i18next";

const OptimizedStickyServices = () => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 1,
      title: t("sticky_services.sections.elite_smile.title"),
      description: t("sticky_services.sections.elite_smile.description"),
      titleBgColor: "bg-[#422f40]",
      titleTextColor: "text-[#e8e2d4]",
      descriptionTextColor: "text-[#e8e2d4]",
      imageSrc: "../Assets/Elite Smile Design.jpg",
    },
    {
      id: 2,
      title: t("sticky_services.sections.next_gen.title"),
      description: t("sticky_services.sections.next_gen.description"),
      titleBgColor: "bg-[#e8e2d4]",
      titleTextColor: "text-[#422f40]",
      descriptionTextColor: "text-[#422f40]",
      imageSrc: "../Assets/digital2.png",
    },
    {
      id: 3,
      title: t("sticky_services.sections.smile_sparkle.title"),
      description: t("sticky_services.sections.smile_sparkle.description"),
      titleBgColor: "bg-[#f68b1f]",
      titleTextColor: "text-[#422f40]",
      descriptionTextColor: "text-[#422f40]",
      imageSrc: "../Assets/grillz.png",
    },
  ];



  return (
    <div className="w-full">
      {sections.map((section) => (
        <div
          key={section.id}
          className="h-screen w-full flex flex-col sticky top-0"
        >
          {/* Title Section */}
          <div
            className={`  w-full lg:pl-20 pt-20 sm:pt-16 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10 pl-4 pr-4 sm:px-6 md:px-12 rounded-b-3xl relative z-10 ${section.titleBgColor}`}
          >
            <h1
              className={`uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter ${section.titleTextColor}`}
            >
              {section.title}
            </h1>
            <p
              className={`mt-2 text-sm sm:text-base md:text-lg lg:text-base ${section.descriptionTextColor}`}
            >
              {section.description}
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-grow w-full -mt-8 relative z-0">
            <img
              src={section.imageSrc}
              alt={section.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptimizedStickyServices; 