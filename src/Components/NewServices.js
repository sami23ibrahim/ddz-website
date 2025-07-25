import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GlitchText from './GlitchText';
import TextPressure from './TextPressure';
import DecryptedText from './DecryptedText';
import FuzzyText from './FuzzyText';
import VariableProximity from './VariableProximity';

const NewServices = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const [activeService, setActiveService] = useState(null);
    const [stickyTop, setStickyTop] = useState(0);
    const proximityContainerRef = useRef(null);

    useEffect(() => {
        const calculateStickyTop = () => {
            const viewportHeight = window.innerHeight;
            const imageHeight = 400;
            setStickyTop(viewportHeight / 2 - imageHeight / 2);
        };
        calculateStickyTop();
        window.addEventListener('resize', calculateStickyTop);
        return () => window.removeEventListener('resize', calculateStickyTop);
    }, []);

    const services = [
        {
            key: 'dental_anxiety',
            title: t('new_services.services.dental_anxiety.title'),
            subtitle: t('new_services.services.dental_anxiety.subtitle'),
            img: '/Assets/DENTAL ANXIETY.jpg',
        },
        {
            key: 'aesthetic_dentistry',
            title: t('new_services.services.aesthetic_dentistry.title'),
            subtitle: t('new_services.services.aesthetic_dentistry.subtitle'),
            img: '/Assets/DENTISTRY.jpg',
        },
        {
            key: 'implantology',
            title: t('new_services.services.implantology.title'),
            subtitle: t('new_services.services.implantology.subtitle'),
            img: '/Assets/implantology.jpg',
        },
        {
            key: 'root_canal_therapy',
            title: t('new_services.services.root_canal_therapy.title'),
            subtitle: t('new_services.services.root_canal_therapy.subtitle'),
            img: '/Assets/ROOT-CANAl.jpg',
        },
        {
            key: 'dental_prosthetics',
            title: t('new_services.services.dental_prosthetics.title'),
            subtitle: t('new_services.services.dental_prosthetics.subtitle'),
            img: '/Assets/DENTAL PROSTHETICS.jpg',
        },
        {
            key: 'oral_surgery',
            title: t('new_services.services.oral_surgery.title'),
            subtitle: t('new_services.services.oral_surgery.subtitle'),
            img: '/Assets/oral.jpg',
        },
        {
            key: 'orthodontics',
            title: t('new_services.services.orthodontics.title'),
            subtitle: t('new_services.services.orthodontics.subtitle'),
            img: '/Assets/Orthodontics Invisalign.jpg',
        },
        {
            key: 'paediatric_dentistry',
            title: t('new_services.services.paediatric_dentistry.title'),
            subtitle: t('new_services.services.paediatric_dentistry.subtitle'),
            img: '/Assets/Paediatric Dentistry.jpg',
        },
        {
            key: 'professional_cleaning',
            title: t('new_services.services.professional_cleaning.title'),
            subtitle: t('new_services.services.professional_cleaning.subtitle'),
            img: '/Assets/Professional Cleaning.jpg',
        },
        {
            key: 'bleaching',
            title: t('new_services.services.bleaching.title'),
            subtitle: t('new_services.services.bleaching.subtitle'),
            img: '/Assets/Bleaching.jpg',
        },
        {
            key: 'periodontitis_therapy',
            title: t('new_services.services.periodontitis_therapy.title'),
            subtitle: t('new_services.services.periodontitis_therapy.subtitle'),
            img: '/Assets/Periodontitis Therapy.jpg',
        },
    ];

    return (
        <div className="bg-[#e8e2d4] text-gray-400 min-h-screen flex items-center font-sans relative pb-32">
            <div className="w-full mx-auto px-12 relative">
        
                {/* <div className="flex justify-center mb-12">
                    <div style={{position: 'relative', width: '700px', height: '100px'}}>
                        <TextPressure
                            text="Our Treatments"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={true}
                            italic={true}
                            textColor="#422f40"
                            minFontSize={26}
                            minWeight={400}
                        />
                    </div>
                </div> */}
                
                {/* <GlitchText
                    speed={1.1}
                    enableShadows={true}
                    enableOnHover={true}
                    className="text-9xl font-bold text-left mb-12 !text-[#422f40] uppercase !mx-0"
                >
                    Our Treatments
                </GlitchText> */}


                {/* <div className="text-[#422f40] flex justify-center mb-12" ref={proximityContainerRef} style={{position: 'relative'}}>
                    <VariableProximity
                        label={'Our Treatments'}
                        className={''}
                        fromFontVariationSettings="'wght' 400, 'opsz' 9"
                        toFontVariationSettings="'wght' 1000, 'opsz' 40"
                        containerRef={proximityContainerRef}
                        radius={100}
                        falloff='linear'
                        style={{ fontSize: '4rem' }}
                    />
                </div> */}

                
                <div className="uppercase flex justify-start mb-2  ">
                    <FuzzyText 
                  
                        baseIntensity={0.0} 
                        hoverIntensity={0.2} 
                        enableHover={true}
                        color="#422f40"
                        fontSize="clamp(3rem, 7vw, 8rem)"
                        fontWeight={800}
                    >
                        {t('new_services.title')}
                    </FuzzyText>
                </div>
                <div className="flex justify-start mb-20 ml-20 ">
                    <p className="text-lg text-gray-600 leading-relaxed max-w-4xl text-center">
                        {t('new_services.description')}
                    </p>
                </div>
                <div className="flex items-start relative">
                    <div className="flex-grow">
                        {/* <div className="flex mb-12">
                            <div className="w-1/6"></div>
                            <div className="flex-grow">
                                <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                                    <DecryptedText
                                        text="Comprehensive care tailored to you — from routine check-ups and aesthetic treatments to advanced dental solutions. We prioritize your comfort by providing services in your language and at your pace. Our dedicated team stays updated through continuous training, using only state-of-the-art technology to ensure the highest quality care."
                                        speed={0.03}
                                        maxIterations={0.03}
                                        sequential={true}
                                        revealDirection="start"
                                        animateOn="view"
                                        useOriginalCharsOnly={true}
                                        className="text-lg text-gray-600 leading-relaxed max-w-2xl"
                                        encryptedClassName="text-lg text-gray-600 leading-relaxed max-w-2xl"
                                    />
                                </p>
                            </div>
                        </div> */}
                        <ul>
                            {services.map((service) => (
                                <li
                                    key={service.key}
                                    className="my-1 h-16 flex items-center"
                                    onMouseEnter={() => setActiveService(service)}
                                    onMouseLeave={() => setActiveService(null)}
                                    onFocus={() => setActiveService(service)}
                                    onBlur={() => setActiveService(null)}
                                    tabIndex="0"
                                >
                                    <Link 
                                        to={`/service/${service.key}`} 
                                        state={{ background: location }}
                                        className="flex items-center w-full no-underline hover:no-underline focus:no-underline"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div className="w-1/6">
                                            <div
                                                className={`transition-opacity duration-300 max-w-[20ch] ${
                                                    activeService?.key === service.key ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            >
                                                {activeService?.key === service.key ? (
                                                    <DecryptedText
                                                        text={service.subtitle}
                                                        speed={50}
                                                        maxIterations={10}
                                                        sequential={true}
                                                        revealDirection="start"
                                                        animateOn="view"
                                                        useOriginalCharsOnly={true}
                                                        className="text-sm text-gray-500"
                                                        encryptedClassName="text-sm text-gray-500"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-500">{service.subtitle}</span>
                                                )}
                                            </div>
                                            
                                        </div>
                                        <div className="flex-grow">
                                            <h2
                                                className={`uppercase text-5xl font-bold transition-all duration-300 cursor-pointer ${
                                                    activeService?.key === service.key ? 'text-[#422f40] translate-x-10' : ''
                                                }`}
                                            >
                                                {service.title}
                                            </h2>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-[300px] flex-shrink-0 ml-auto" style={{ height: '400px', top: `${stickyTop}px`, position: 'sticky' }}>
                        <div
                            className={`transition-opacity duration-500 h-full ${
                                activeService ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {activeService && (
                                <img
                                    src={activeService.img}
                                    alt={activeService.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-left mt-24 ml-[16.67%]">
                    <button className="bg-gray-400 hover:bg-[#422f40] text-[#422f40] hover:text-gray-400 font-bold text-lg py-3 px-10 rounded-full transition-colors duration-300">
                        {t('new_services.book_appointment')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewServices; 