import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom'; 

const Impressum = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#e8e2d4]">
      <Helmet>
        <title>{t('impressum.title')} - Die 3 Zahnärzte</title>
        <meta name="description" content={`${t('impressum.title')} - ${t('impressum.company_name')}`} />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-[#422f40] mb-8">{t('impressum.title')}</h1>
          
          <div className="prose prose-lg max-w-none text-[#422f40]" dir={t('impressum.title') === 'بيانات الشركة' ? 'rtl' : 'ltr'}>
            <p><strong>{t('impressum.company_name')}</strong><br />
            <span dangerouslySetInnerHTML={{ __html: t('impressum.address') }} /></p>

            <p><strong>{t('impressum.represented_by')}</strong></p>
            <p>{t('impressum.representatives.fabian')}</p>
            <p>{t('impressum.representatives.hakam')}</p>
            <p>{t('impressum.representatives.prabh')}</p>

            <p><strong>{t('impressum.contact')}</strong></p>
            <p>{t('impressum.phone')}</p>
            <p>{t('impressum.email')}</p>

            <p><strong>{t('impressum.registration')}</strong></p>
            <p>{t('impressum.court')}</p>
            <p>{t('impressum.registration_number')}</p>

            <p><strong>{t('impressum.vat_id')}</strong></p>
            <p>{t('impressum.vat_number')}</p>

            <p><strong>{t('impressum.business_purpose')}</strong></p>
            <p>{t('impressum.business_description')}</p>

            <p><strong>{t('impressum.copyright')}</strong></p>
            <p>{t('impressum.copyright_text')}</p>

            <p><strong>{t('impressum.responsible')}</strong></p>
            <p>{t('impressum.responsible_company')}</p>

            <p><strong>{t('impressum.disclaimer')}</strong></p>
            <p>{t('impressum.disclaimer_text')}</p>

            <p>{t('impressum.disclaimer_liability')}</p>

            <p>{t('impressum.disclaimer_advice')}</p>

            <p>{t('impressum.disclaimer_changes')}</p>

            <p>{t('impressum.disclaimer_copyright')}</p>

            <p>{t('impressum.disclaimer_agreement')}</p>

            <p><strong>{t('impressum.additional_address')}</strong><br />
            {t('impressum.additional_address_text')}</p>

            <p><strong>{t('impressum.opening_hours')}</strong><br />
            <span dangerouslySetInnerHTML={{ __html: t('impressum.opening_hours_text') }} /></p>

            <p><span dangerouslySetInnerHTML={{ __html: t('impressum.contact_info') }} /></p>


            <p className="mt-10 text-center">
            <Link
              to="/jobs"
              className="inline-block bg-[#422f40] text-white px-4 py-2 rounded hover:bg-[#5a3a55] transition"
            >
              Apply for a Job
            </Link>
          </p>


          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
