import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Service = () => {
    const { title: serviceKey } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const services = t('new_services.services', { returnObjects: true });
    // Debug log
    console.log('Available service keys:', Object.keys(services));
    console.log('Current serviceKey:', serviceKey);
    let service = services[serviceKey];
    // Fallback: try replacing underscores with hyphens if not found
    if (!service && serviceKey.includes('_')) {
        const altKey = serviceKey.replace(/_/g, '-');
        service = services[altKey];
    }
    // Show alert if not found
    if (!service) {
        alert('Service not found!\nAvailable keys: ' + Object.keys(services).join(', ') + '\nCurrent key: ' + serviceKey);
    }

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Scroll to top when service changes
    useEffect(() => {
        const contentArea = document.querySelector('.service-content');
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

    // Get content for the service
    const content = t(`service_content.${serviceKey}`, { returnObjects: true });

    // Render content section
    const renderContentSection = (section, index) => {
        switch (section.type) {
            case 'paragraph':
                return (
                    <p key={index} className="text-lg text-[#422f40] leading-relaxed mb-6" 
                       dangerouslySetInnerHTML={{ __html: section.content }} />
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
                                dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                    </ul>
                );
            case 'cta':
                return (
                    <div key={index} className="mt-8 p-6 bg-[#422f40] text-[#e8e2d4] rounded-lg">
                        <p className="text-lg leading-relaxed font-semibold" 
                           dangerouslySetInnerHTML={{ __html: section.content }} />
                        <button className="mt-6 bg-[#e8e2d4] hover:bg-opacity-80 text-[#422f40] font-bold text-lg py-3 px-8 rounded-full transition-colors duration-300">
                            {t('new_services.book_appointment')}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div 
            onClick={handleClose}
            className="fixed inset-0 z-50 overflow-hidden"
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className="flex w-full h-full"
            >
                {/* Left Column - Blurred BG and Image */}
                <div className="w-1/3 h-full relative bg-black/10 backdrop-blur-sm overflow-hidden">
                    <div className="absolute top-0 right-0 w-3/5 aspect-[3/4] p-0">
                        <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Right Column - Content */}
                <div className="w-2/3 h-full bg-[#e8e2d4] relative">
                    <div className="h-full overflow-y-auto p-12 md:p-16 lg:p-24 service-content">
                        <button 
                            onClick={handleClose}
                            className="absolute top-8 right-8 text-5xl font-light text-gray-500 hover:text-gray-900 z-10"
                        >
                            &times;
                        </button>

                        <div className="max-w-3xl">
                            <div className="mb-12">
                                <h1 className="text-6xl md:text-8xl font-bold text-[#422f40] uppercase tracking-tighter leading-none">{service.title}</h1>
                                <p className="text-sm text-gray-500 uppercase mt-4 tracking-widest">{service.subtitle}</p>
                            </div>

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
                                <div className="text-lg space-y-6 text-[#422f40] leading-relaxed">
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
                                                    navigate(`/service/${prevServiceKey}`, { state: { background: location.state?.background } });
                                                }}
                                                className="flex flex-col items-start text-left hover:opacity-75 transition-opacity focus:outline-none"
                                            >
                                                <p className="text-lg text-gray-400 uppercase tracking-widest mb-4 font-bold">{t('service_page.prev')}</p>
                                                <img 
                                                    src={services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) - 1]]?.img} 
                                                    alt="Previous service" 
                                                    className="w-32 h-32 object-cover rounded mb-4"
                                                />
                                                <h4 className="font-bold text-gray-800 uppercase text-lg max-w-[200px]">
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
                                                    navigate(`/service/${nextServiceKey}`, { state: { background: location.state?.background } });
                                                }}
                                                className="flex flex-col items-end text-right hover:opacity-75 transition-opacity focus:outline-none"
                                            >
                                                <p className="text-lg text-gray-400 uppercase tracking-widest mb-4 font-bold">{t('service_page.next')}</p>
                                                <img 
                                                    src={services[Object.keys(services)[Object.keys(services).indexOf(serviceKey) + 1]]?.img} 
                                                    alt="Next service" 
                                                    className="w-32 h-32 object-cover rounded mb-4"
                                                />
                                                <h4 className="font-bold text-gray-800 uppercase text-lg max-w-[200px]">
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
        </div>
    );
};

export default Service;
