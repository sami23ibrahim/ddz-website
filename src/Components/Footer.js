import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaClock, FaMapMarkerAlt, FaPhone, FaStar, FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <footer className="bg-[#422f40] text-[#e8e2d4]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Opening Hours Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaClock className="text-[#e8e2d4] text-xl" />
              <h3 className="font-bold text-xl">{t('footer.opening_hours')}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="font-medium text-lg">{t('footer.mon_thu')}:</span>
                <span className="font-medium text-base">09:00-18:00</span>
              </div>
             
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="font-medium text-lg">{t('footer.fri')}:</span>
                <span className="font-medium text-base">09:00-15:00</span>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <div className="flex items-start space-x-2">
              <FaMapMarkerAlt className="text-[#e8e2d4] text-xl mt-1" />
              <div>
                <h3 className="font-bold text-xl">{t('footer.clinic_name')}</h3>
                <p className="text-base font-medium">Skalitzer Straße 137, 10999 Berlin</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <FaPhone className="text-[#e8e2d4] text-xl" />
              <div>
                <h3 className="font-bold text-xl">{t('footer.phone_number')}</h3>
                <p className="text-base font-medium">030 69005528</p>
              </div>
            </div>
          </div>



          {/* Appointment & Rating Section */}
          <div className="space-y-4">
            <a 
              href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?bookingFunnelSource=profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 min-h-[48px] rounded-3xl font-bold border-2 text-center no-underline cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: hoveredButton === 'appointment' ? '#e8e2d4' : 'transparent',
                color: hoveredButton === 'appointment' ? 'black' : '#e8e2d4',
                borderColor: '#e8e2d4',
                textDecoration: 'none'
              }}
              onMouseEnter={() => setHoveredButton('appointment')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {t('footer.book_appointment')}
            </a>
            
            {/* Google Rating */}
            <div className="flex items-center justify-center space-x-2 text-[#e8e2d4] px-4 py-2 rounded-lg">
              <span className="font-bold text-[#e8e2d4]">4.9 Stars</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <div className=" rounded-md p-1 flex items-center justify-center w-6 h-6">
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285f4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335"/>
                </svg>
              </div>
            </div>
          </div>






          
        </div>

        {/* Navigation & Social Media Section */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2 border-t border-[#5a4658]">
          
          {/* Navigation Links */}
          {/* <div className="flex flex-wrap justify-center md:justify-start space-x-3 sm:space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:underline">{t('footer.homepage')}</a>
            <a href="#" className="hover:underline">{t('footer.treatments')}</a>
            <a href="#" className="hover:underline">{t('footer.team')}</a>
            <a href="#" className="hover:underline">{t('footer.jobs')}</a>
            <a href="#" className="hover:underline">{t('footer.equipment')}</a> 
          </div> */}

          {/* Social Media Icons */}
          <div className="flex space-x-4 md:mr-28">
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: hoveredButton === 'facebook' ? '#422f40' : '#e8e2d4',
                borderColor: '#e8e2d4'
              }}
              onMouseEnter={() => setHoveredButton('facebook')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <FaFacebookF style={{ color: hoveredButton === 'facebook' ? '#e8e2d4' : '#422f40' }} />
            </a>
            <a 
              href="https://www.instagram.com/diedreizahnaerzte.berlin/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: hoveredButton === 'instagram' ? '#422f40' : '#e8e2d4',
                borderColor: '#e8e2d4'
              }}
              onMouseEnter={() => setHoveredButton('instagram')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <FaInstagram style={{ color: hoveredButton === 'instagram' ? '#e8e2d4' : '#422f40' }} />
            </a>
            <a 
              href="https://www.linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: hoveredButton === 'linkedin' ? '#422f40' : '#e8e2d4',
                borderColor: '#e8e2d4'
              }}
              onMouseEnter={() => setHoveredButton('linkedin')}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <FaLinkedinIn style={{ color: hoveredButton === 'linkedin' ? '#e8e2d4' : '#422f40' }} />
            </a>
          </div>
        </div>

        {/* Bottom Section */}

      </div>

      {/* Powered by Section */}
      <div className="bg-[#e8e2d4] text-gray-600 text-center py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span>{t('footer.made_with')} ❤️ by</span>
            <span className="font-bold"></span>
            <a href="https://portfolio-eu.vercel.app/" target="_blank" rel="noopener noreferrer">
              <div className="bg-[#422f40] text-white px-2 py-1 rounded font-bold text-xs">sami</div>
            </a>
          </div>
          <div className="text-xs">
            © diedreizahnaerzte 2025
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
