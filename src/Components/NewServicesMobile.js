import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FuzzyText from './FuzzyText';

const NewServicesMobile = () => {
    const { t } = useTranslation();
    const location = useLocation();

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
            img: '/Assets/digital2.png',
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
        <div className="bg-[#e8e2d4] py-16 px-4 font-sans">
            <div className="container mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-[#422f40] uppercase text-left">
                        {t('new_services.title')}
                    </h1>
                </div>
                <div className="mb-12 max-w-5xl mx-auto">
                    <p className="text-md text-gray-600 leading-relaxed text-center">
                        {t('new_services.description')}
                    </p>
                </div>

                {services.map((service, index) => (
                    <Link 
                        key={service.key}
                        to={`/service-mobile/${service.key}`}
                        state={{ background: location }}
                        className="flex items-start mb-12 no-underline hover:no-underline focus:no-underline"
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="w-1/3 pr-4 md:pr-6">
                            <div className="aspect-[3/4]">
                                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-2/3">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#422f40] uppercase leading-none tracking-tight">{service.title}</h2>
                            <p className="text-l text-[#422f40] uppercase mt-2 tracking-wider">{service.subtitle}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewServicesMobile; 