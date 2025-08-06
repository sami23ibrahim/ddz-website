import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import FuzzyText from './FuzzyText';

const Team = () => {
  const { t, i18n } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: t('team.members.fabian.name'),
      title: t('team.members.fabian.title'),
      image: "/Assets/fab.jpg", // Using placeholder image
      rating: 4.9,
      reviews: 94,
      languages: [
        { code: "de", flag: "/Assets/de.png", name: "German" },
        { code: "fa", flag: "/Assets/pala.jpg", name: "Persian" },
        { code: "en", flag: "/Assets/en.png", name: "English" }
      ],
      baseSpecialties: [
        { name: t('team.specialties.fabian_preview'), color: "#422f4099", isPreview: true }
      ],
      expandedSpecialties: [
        { name: t('team.specialties.fabian'), color: "#422f4099", isDescription: true }
      ]
    },
    {
      id: 2,
      name: t('team.members.hakam.name'),
      title: t('team.members.hakam.title'),
      image: "/Assets/hak.jpg", // Using placeholder image
      rating: 4.8,
      reviews: 552,
      languages: [
        { code: "de", flag: "/Assets/de.png", name: "German" },
        { code: "fa", flag: "/Assets/pala.jpg", name: "Persian" },
        { code: "en", flag: "/Assets/en.png", name: "English" }
      ],
      baseSpecialties: [
        { name: t('team.specialties.hakam_preview'), color: "#422f4099", isPreview: true }
      ],
      expandedSpecialties: [
        { name: t('team.specialties.hakam'), color: "#422f4099", isDescription: true }
      ]
    },
    {
      id: 3,
      name: t('team.members.prabh.name'),
      title: t('team.members.prabh.title'),
      image: "/Assets/prab.png", // Using placeholder image
      rating: 4.9,
      reviews: 152,
      languages: [
        { code: "de", flag: "/Assets/de.png", name: "German" },
        { code: "en", flag: "/Assets/en.png", name: "English" }
      ],
      baseSpecialties: [
        { name: t('team.specialties.prabh_preview'), color: "#422f4099", isPreview: true }
      ],
      expandedSpecialties: [
        { name: t('team.specialties.prabh'), color: "#422f4099", isDescription: true }
      ]
    },
    {
      id: 4,
      name: t('team.members.majd.name'),
      title: t('team.members.majd.title'),
      image: "/Assets/majd3.png", // Using placeholder image
      rating: 4.9,
      reviews: 152,
      languages: [
        { code: "de", flag: "/Assets/de.png", name: "German" },
        { code: "fa", flag: "/Assets/pala.jpg", name: "Persian" },
        { code: "en", flag: "/Assets/en.png", name: "English" }
      ],
      baseSpecialties: [
        { name: t('team.specialties.anxiety_patients'), color: "#422f4099" },
        { name: t('team.specialties.endodontics'), color: "#422f4099" },
        { name: t('team.specialties.implantology'), color: "#422f4099" },
        { name: t('team.specialties.pediatric_dentistry'), color: "#422f4099" },
        { name: t('team.specialties.veneers'), color: "#422f4099" },
        { name: t('team.specialties.dentures'), color: "#422f4099" },
        { name: t('team.specialties.gingivitis'), color: "#422f4099" },
        { name: t('team.specialties.dental_fractures'), color: "#422f4099" },
        { name: t('team.specialties.dental_restoration'), color: "#422f4099" },
        { name: t('team.specialties.aesthetic_dentistry'), color: "#422f4099" }
      ],
      expandedSpecialties: []
    }
  ];

  return (
    <div className="py-8 md:py-16 pb-12 md:pb-24 bg-[#e8e2d4]">


  
<div className="mb-4 md:mb-8">
  <div className={`flex mb-2 md:mb-4 ${i18n.language === 'ar' ? 'justify-end' : 'justify-start'} mr-8 md:mr-16 lg:mr-16`}>
  <div className={i18n.language === 'ar' ? 'inline-block ml-auto' : 'inline-block'}>
  <FuzzyText
  baseIntensity={0.0}
  hoverIntensity={0.2}
  enableHover={true}
  color="#422f40"
  fontWeight={900}
  fontFamily={i18n.language === 'ar' ? 'RH-Zak, sans-serif' : 'inherit'}
>
  {t('team.title').toUpperCase()}
</FuzzyText>
  </div>
  </div>
  <p
    className={`
       text-sm md:text-lg lg:text-xl 
      text-[#422f40] leading-relaxed ml-12 md:ml-16 lg:ml-16
   mb-2 md:mb-4 lg:mb-8
      ${i18n.language === 'ar' ? 'text-right mr-8 md:mr-16 lg:mr-16' : 'text-left'}
    `}
    style={i18n.language === 'ar' ? { direction: 'rtl' } : {}}
  >
    {t('team.subtitle')}
  </p>
</div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2">
     

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative w-full h-96 sm:h-[28rem] rounded-2xl overflow-hidden border-2 border-[#422f4020] transition-colors duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Profile Image */}
              <div className="h-64 sm:h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-4 left-0 right-0 bg-[#e8e2d4] rounded-2xl p-3 sm:p-4">
                {/* Name and Title */}
                <div className="mb-2 sm:mb-3">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-xs sm:text-sm">{member.title}</p>
                    <div className="flex space-x-1 sm:space-x-2">
                      {member.languages.map((lang, index) => (
                        <img
                          key={index}
                          src={lang.flag}
                          alt={lang.name}
                          title={lang.name}
                          className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                                {/* Specialties */}
                <div className="mb-2 sm:mb-3">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {!hoveredCard || hoveredCard !== member.id ? (
                      // Show preview text when not hovering
                      member.baseSpecialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={`base-${index}`}
                          className={`text-xs sm:text-sm text-gray-700 leading-relaxed ${
                            specialty.isPreview ? 'text-left' : ''
                          }`}
                        >
                          {specialty.name}
                        </span>
                      ))
                    ) : (
                      // Show full description when hovering
                      member.expandedSpecialties.map((specialty, index) => (
                        <span
                          key={`expanded-${index}`}
                          className={`text-xs sm:text-sm text-gray-700 leading-relaxed animate-fadeIn ${
                            specialty.isDescription ? 'text-left' : ''
                          }`}
                        >
                          {specialty.name}
                        </span>
                      ))
                    )}
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Team;



