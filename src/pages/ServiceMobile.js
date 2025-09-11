import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const ServiceMobile = () => {
    const { title: serviceKey } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const services = t('new_services.services', { returnObjects: true });
    const service = services[serviceKey];

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Scroll to top when service changes
    useEffect(() => {
        const contentArea = document.querySelector('.service-content-mobile');
        if (contentArea) {
            contentArea.scrollTop = 0;
        }
    }, [serviceKey]);

    if (!service) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Service not found.</h1>
                    <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-gray-200 rounded">Go Home</button>
                </div>
            </div>
        );
    }
    
    const handleClose = () => navigate('/');

    const content = t(`service_content.${serviceKey}`, { returnObjects: true });

    const renderContentSection = (section, index) => {
        const mobileContent = (contentString) => contentString.replace(/href='\/service\//g, "href='/service-mobile/");

        switch (section.type) {
            case 'paragraph':
                return (
                    <p key={index} className="text-lg text-[#422f40] leading-relaxed mb-6" 
                       dangerouslySetInnerHTML={{ __html: mobileContent(section.content) }} />
                );
            case 'heading':
                return (
                    <h3 key={index} className="text-xl font-bold text-[#422f40] mb-4 mt-8">
                        {section.content}
                    </h3>
                );
            case 'list':
                return (
                    <ul key={index} className="text-lg text-[#422f40] leading-relaxed mb-6 ml-6 space-y-2">
                        {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="list-disc" 
                                dangerouslySetInnerHTML={{ __html: mobileContent(item) }} />
                        ))}
                    </ul>
                );
            case 'cta':
                return (
                    <div key={index} className="mt-8 p-6 bg-[#422f40] text-[#e8e2d4] rounded-lg">
                        <p className="text-lg leading-relaxed font-semibold" 
                           dangerouslySetInnerHTML={{ __html: mobileContent(section.content) }} />
                        <a 
                            href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?profile_skipped=true&utm_source=die-drei-zahnaerzte-website-button&utm_medium=referral&utm_campaign=website-button&utm_content=option-8&bookingFunnelSource=external_referral"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-6 bg-[#e8e2d4] hover:bg-opacity-80 text-[#422f40] font-bold text-lg py-3 px-8 rounded-full transition-colors duration-300"
                        >
                            {t('new_services.book_appointment')}
                        </a>
                    </div>
                );
            case 'booking':
                return (
                    <div key={index} className="mt-8 text-center">
                        <a 
                            href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?profile_skipped=true&utm_source=die-drei-zahnaerzte-website-button&utm_medium=referral&utm_campaign=website-button&utm_content=option-8&bookingFunnelSource=external_referral"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#422f40] hover:bg-opacity-80 text-[#e8e2d4] font-bold text-lg py-3 px-8 rounded-full transition-colors duration-300"
                        >
                            {section.content}
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Helmet>
                <title>{service?.title ? `${service.title} - Die Drei Zahnärzte` : 'Dental Service - Die Drei Zahnärzte'}</title>
                <meta name="description" content={service?.subtitle || t('meta.service.default_description')} />
                <meta name="keywords" content={`${service?.title}, ${service?.subtitle}, dental treatment, berlin, ${t('meta.service.keywords')}`} />
                
                {/* Open Graph */}
                <meta property="og:title" content={service?.title || 'Dental Service'} />
                <meta property="og:description" content={service?.subtitle || t('meta.service.default_description')} />
                <meta property="og:image" content={service?.img || '/Assets/logo2.png'} />
                <meta property="og:url" content={`https://diedreizahnaerzte.de/service-mobile/${serviceKey}`} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={service?.title || 'Dental Service'} />
                <meta name="twitter:description" content={service?.subtitle || t('meta.service.default_description')} />
                <meta name="twitter:image" content={service?.img || '/Assets/logo2.png'} />
            </Helmet>
            <div 
                onClick={handleClose}
                className="fixed inset-0 z-50 overflow-hidden bg-[#e8e2d4]"
            >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="w-full h-full"
            >
                {/* Single Column - Content with image beside title */}
                <div className="h-full overflow-y-auto p-6 md:p-8 service-content-mobile">
                    <button 
                        onClick={handleClose}
                        className="absolute top-6 right-6 text-5xl font-light text-white z-10"
                    >
                        &times;
                    </button>

                    <div className="max-w-4xl mx-auto">
                        {/* Title & Image Section */}
                        <div className="mb-12 flex items-start justify-between">
                            <div className="flex-1 pr-6 min-w-0">
                                <h1 className="text-2xl md:text-4xl font-bold text-[#422f40] uppercase tracking-tighter leading-none break-words max-w-full overflow-wrap-anywhere">{service.title}</h1>
                                <p className="text-sm text-gray-500 uppercase mt-4 tracking-widest">{service.subtitle}</p>
                            </div>
                            <div className="w-32 md:w-40 aspect-[3/4] flex-shrink-0">
                                <img src={service.img} alt={service.title} className="w-full h-full object-cover rounded" />
                            </div>
                        </div>

                        {/* Service Content */}
                        <div className="mb-12">
                            <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4">{t('service_page.the_service')}</h3>
                            {content && content.sections ? (
                                <div>
                                    {content.sections.map((section, index) => renderContentSection(section, index))}
                                </div>
                            ) : (
                                <p className="text-lg text-[#422f40] leading-relaxed">
                                    {t('service_page.default_description')}
                                </p>
                            )}
                        </div>
                        
                        {!content && (
                            <div className="space-y-6 text-lg text-[#422f40] leading-relaxed">
                                <p>
                                    {t('service_page.extra_description1')}
                                </p>
                                <p>
                                    {t('service_page.extra_description2')}
                                </p>
                            </div>
                        )}

                        {/* Navigation to Previous/Next Services */}
                        <div className="mt-16 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                {/* Previous Service */}
                                <div className="flex-1">
                                    {Object.keys(services).indexOf(serviceKey) > 0 && (
                                        <button 
                                            onClick={() => {
                                                const serviceKeys = Object.keys(services);
                                                const currentIndex = serviceKeys.indexOf(serviceKey);
                                                const prevServiceKey = serviceKeys[currentIndex - 1];
                                                navigate(`/service-mobile/${prevServiceKey}`, { state: { background: location.state?.background } });
                                            }}
                                            className="flex flex-col items-start text-left hover:opacity-75 transition-opacity focus:outline-none"
                                        >
                                            <p className="text-base md:text-lg text-gray-400 uppercase tracking-widest mb-3 font-bold">{t('service_page.prev')}</p>
                                            <img 
                                                src={services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) - 1]]?.img} 
                                                alt="Previous service" 
                                                className="w-24 md:w-28 h-24 md:h-28 object-cover rounded mb-3"
                                            />
                                            <h4 className="font-bold text-gray-800 uppercase text-sm md:text-base max-w-[150px] md:max-w-[200px]">
                                                {services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) - 1]]?.title}
                                            </h4>
                                        </button>
                                    )}
                                </div>

                                {/* Next Service */}
                                <div className="flex-1 flex justify-end">
                                    {Object.keys(services).indexOf(serviceKey) < Object.keys(services).length - 1 && (
                                        <button 
                                            onClick={() => {
                                                const serviceKeys = Object.keys(services);
                                                const currentIndex = serviceKeys.indexOf(serviceKey);
                                                const nextServiceKey = serviceKeys[currentIndex + 1];
                                                navigate(`/service-mobile/${nextServiceKey}`, { state: { background: location.state?.background } });
                                            }}
                                            className="flex flex-col items-end text-right hover:opacity-75 transition-opacity focus:outline-none"
                                        >
                                            <p className="text-base md:text-lg text-gray-400 uppercase tracking-widest mb-3 font-bold">{t('service_page.next')}</p>
                                            <img 
                                                src={services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) + 1]]?.img} 
                                                alt="Next service" 
                                                className="w-24 md:w-28 h-24 md:h-28 object-cover rounded mb-3"
                                            />
                                            <h4 className="font-bold text-gray-800 uppercase text-sm md:text-base max-w-[150px] md:max-w-[200px]">
                                                {services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) + 1]]?.title}
                                            </h4>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ServiceMobile;