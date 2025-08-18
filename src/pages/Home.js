import React, { Suspense } from "react";
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";
import HomeVideo from "../Components/HomeVideo";
import ServicesGrid from "../Components/ServicesGrid";
import OptimizedStickyServices from "../Components/OptimizedStickyServices";
import ScrollHero from "../Components/ScrollHero";
import ScrollHeroMobile from "../Components/ScrollHeroMobile";
import SmilesGallery from "../Components/SmilesGallery";
import Team from "../Components/Team";
import Footer from "../Components/Footer";
import NewServices from "../Components/NewServices";
import NewServicesMobile from "../Components/NewServicesMobile";
import useWindowWidth from "../hooks/useWindowWidth";
import Navbar from "../Components/Navbar";
import Galery2 from "../Components/Galery2";

import LightweightGallery from "../Components/LightweightGallery";
import LazyLoader from "../Components/LazyLoader";

// Lazy load heavy components
const LazySmilesGallery = React.lazy(() => import("../Components/SmilesGallery"));

const Home = () => {
  const { t, i18n } = useTranslation();
  const windowWidth = useWindowWidth();

  // Placeholder components for lazy loading
  const SmilesGalleryPlaceholder = () => (
    <div style={{ height: '600px', background: '#e8e2d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="text-[#422f40] text-xl">Loading Smiles Gallery...</div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')} - Die Drei Zahnärzte</title>
        <meta name="description" content={t('meta.home.description')} />
        <meta name="keywords" content={t('meta.home.keywords')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={t('meta.home.title')} />
        <meta property="og:description" content={t('meta.home.description')} />
        <meta property="og:image" content="/Assets/logo2.png" />
        <meta property="og:url" content="https://diedreizahnaerzte.de" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={i18n.language} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.home.title')} />
        <meta name="twitter:description" content={t('meta.home.description')} />
        <meta name="twitter:image" content="/Assets/logo2.png" />
      </Helmet>
      <div className="bg-[#e8e2d4]">
        <Navbar />
      <div id="landing-page">
        <HomeVideo 
          videoSrc="/docs4.mp4"
          mobileVideoSrc="/docsmobile.mp4"
          posterImage="/Assets/logo2.png"
          windowWidth={windowWidth}
        />
      </div>
      <div id="services">
        {windowWidth > 1288 ? <NewServices /> : <NewServicesMobile />}
        {/* <ServicesGrid /> */}
        <OptimizedStickyServices />
        {/* {windowWidth > 1288 ? <ScrollHero /> : <ScrollHeroMobile />} */}
      </div>
      {/* Lazy load SmilesGallery */}
      <LazyLoader placeholder={<SmilesGalleryPlaceholder />}>
        <Suspense fallback={<SmilesGalleryPlaceholder />}>
          <SmilesGallery />
        </Suspense>
      </LazyLoader>
      <Galery2 />
      <div id="team">
        <Team />
      </div>
      {/* Use lightweight gallery instead of heavy WebGL version */}
      {/* <div style={{ height: '600px', position: 'relative' }}>
        <LightweightGallery 
          textColor="#422f40" 
          borderRadius="5%" 
          scrollSpeed={2}
        />
      </div> */}
      <Footer />
      </div>
    </>
  );
};

export default Home; 