import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook

const StickyServices = () => {
  const { t } = useTranslation(); // Get translation function

  const sections = [
    {
      id: 1,
      title: t("sticky_services.sections.elite_smile.title"),
      description: t("sticky_services.sections.elite_smile.description"),
      titleBgColor: "bg-[#422f40]",
      titleTextColor: "text-[#e8e2d4]",
      descriptionTextColor: "text-[#e8e2d4]",
      imageSrc: "../Assets/g3.png",
    },
    {
      id: 2,
      title: t("sticky_services.sections.next_gen.title"),
      description: t("sticky_services.sections.next_gen.description"),
      titleBgColor: "bg-[#e8e2d4]",
      titleTextColor: "text-[#422f40]",
      descriptionTextColor: "text-[#422f40]",
      imageSrc: "../Assets/tech.jpg",
    },
    {
      id: 3,
      title: t("sticky_services.sections.smile_sparkle.title"),
      description: t("sticky_services.sections.smile_sparkle.description"),
      titleBgColor: "bg-[#f68b1f]",
      titleTextColor: "text-[#422f40]",
      descriptionTextColor: "text-[#422f40]",
      imageSrc: "../Assets/g.webp",
    },
  ];

  return (
    <div className="w-full">
      {/* Title Section */}
      {/* <div className="w-full bg-[#e8e2d4] flex flex-col justify-center items-center py-16 px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-[#422f40] mb-4 tracking-tighter">
            {t("sticky_services.heading.title")}
          </h1>
          <p className="text-2xl text-[#422f40] opacity-80 font-medium">
            {t("sticky_services.heading.subtitle")}
          </p>
        </div>
      </div> */}
      
      {sections.map((section) => (
        <div
          key={section.id}
          className="h-screen w-full flex flex-col sticky top-0"
        >
          {/* Title Section */}
          <div
            className={`w-full h-[40vh] md:h-[30vh] px-6 md:px-12 flex flex-col justify-end pb-8 md:pb-16 ${section.titleBgColor}`}
          >
            <h1
              className={`text-4xl md:text-5xl font-bold tracking-tighter ${section.titleTextColor}`}
            >
              {section.title}
            </h1>
            <p className={`mt-2 text-base md:text-lg ${section.descriptionTextColor}`}>
              {section.description}
            </p>
          </div>

          {/* Image Section */}
          <div className="h-[60vh] md:h-[70vh] w-full">
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

export default StickyServices;
