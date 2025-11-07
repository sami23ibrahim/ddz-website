import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-[#e8e2d4]" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{t('privacy.title')} - Die Drei Zahnärzte</title>
        <meta name="description" content={t('privacy.meta_description')} />
        <meta property="og:title" content={`${t('privacy.title')} - Die Drei Zahnärzte`} />
        <meta property="og:description" content={t('privacy.meta_description')} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-[#422f40] mb-4">
                {t('privacy.title')}
              </h1>
              <p className="text-gray-600">
                {t('privacy.last_updated')}: 06.11.2024
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none space-y-8">
              
              {/* 1. Controller */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.controller.title')}
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Dentists & Friends GmbH</strong></p>
                  <p>Bendastraße 11a<br />12051 Berlin</p>
                  <p><strong>Tel:</strong> 030 / 69005528</p>
                  <p><strong>E-Mail:</strong> team@diedreizahnaerzte.berlin</p>
                  <p><strong>Geschäftsführer:</strong> Badour Fabian, El Daghma Hakam, Mahal Prabjit Singh</p>
                  <p><strong>Registergericht:</strong> Amtsgericht Berlin (Charlottenburg)</p>
                  <p><strong>Registernummer:</strong> HRB 253202 B</p>
                </div>
              </section>

              {/* 2. Data Protection Officer */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.dpo.title')}
                </h2>
                <p>{t('privacy.dpo.content')}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p><strong>E-Mail:</strong> team@diedreizahnaerzte.berlin</p>
                </div>
              </section>

              {/* 3. Legal Basis */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.legal_basis.title')}
                </h2>
                <p>{t('privacy.legal_basis.content')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> {t('privacy.legal_basis.consent')}</li>
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> {t('privacy.legal_basis.contract')}</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> {t('privacy.legal_basis.legitimate')}</li>
                  <li><strong>Art. 9 Abs. 2 lit. h DSGVO:</strong> {t('privacy.legal_basis.medical')}</li>
                </ul>
              </section>

              {/* 4. Website Data Collection */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.website_data.title')}
                </h2>
                
                <h3 className="text-xl font-medium text-[#422f40] mb-3">
                  {t('privacy.website_data.server_logs.title')}
                </h3>
                <p>{t('privacy.website_data.server_logs.content')}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t('privacy.website_data.server_logs.ip')}</li>
                  <li>{t('privacy.website_data.server_logs.browser')}</li>
                  <li>{t('privacy.website_data.server_logs.timestamp')}</li>
                  <li>{t('privacy.website_data.server_logs.pages')}</li>
                  <li>{t('privacy.website_data.server_logs.referrer')}</li>
                </ul>
                <p><strong>{t('privacy.website_data.server_logs.retention')}:</strong> 7 Tage</p>
              </section>


              {/* 6. Job Applications */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.job_applications.title')}
                </h2>
                <p>{t('privacy.job_applications.content')}</p>
                
                <h3 className="text-xl font-medium text-[#422f40] mb-3">
                  {t('privacy.job_applications.data_collected.title')}
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t('privacy.job_applications.data_collected.personal')}</li>
                  <li>{t('privacy.job_applications.data_collected.cv')}</li>
                  <li>{t('privacy.job_applications.data_collected.cover_letter')}</li>
                  <li>{t('privacy.job_applications.data_collected.contact')}</li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p><strong>{t('privacy.job_applications.purpose')}:</strong> {t('privacy.job_applications.purpose_text')}</p>
                  <p><strong>{t('privacy.job_applications.retention')}:</strong> {t('privacy.job_applications.retention_text')}</p>
                  <p><strong>{t('privacy.job_applications.storage')}:</strong> Supabase (EU-Server)</p>
                </div>
              </section>

              {/* 7. Contact Forms */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.contact_forms.title')}
                </h2>
                <p>{t('privacy.contact_forms.content')}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t('privacy.contact_forms.name')}</li>
                  <li>{t('privacy.contact_forms.email')}</li>
                  <li>{t('privacy.contact_forms.phone')}</li>
                  <li>{t('privacy.contact_forms.message')}</li>
                </ul>
              </section>

              {/* 8. Medical Data */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.medical_data.title')}
                </h2>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <p className="font-medium">{t('privacy.medical_data.notice')}</p>
                  <p>{t('privacy.medical_data.content')}</p>
                </div>
                <ul className="list-disc pl-6 space-y-1 mt-4">
                  <li>{t('privacy.medical_data.patient_records')}</li>
                  <li>{t('privacy.medical_data.treatment_history')}</li>
                  <li>{t('privacy.medical_data.xrays')}</li>
                  <li>{t('privacy.medical_data.insurance')}</li>
                </ul>
                <p><strong>{t('privacy.medical_data.retention')}:</strong> {t('privacy.medical_data.retention_text')}</p>
              </section>

              {/* 9. Third Party Services */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.third_party.title')}
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Supabase</h4>
                    <p className="text-sm">{t('privacy.third_party.supabase')}</p>
                    <p className="text-xs text-gray-600">Server: EU (Frankfurt)</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Doctolib</h4>
                    <p className="text-sm">{t('privacy.third_party.doctolib')}</p>
                    <p className="text-xs text-gray-600">DSGVO-konform</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Google Analytics</h4>
                    <p className="text-sm">{t('privacy.third_party.google')}</p>
                    <p className="text-xs text-gray-600">IP-Anonymisierung aktiv</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Social Media</h4>
                    <p className="text-sm">{t('privacy.third_party.social')}</p>
                    <p className="text-xs text-gray-600">Facebook, Instagram</p>
                  </div>
                </div>
              </section>

              {/* 10. Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.rights.title')}
                </h2>
                <p>{t('privacy.rights.intro')}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.access.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.access.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.rectification.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.rectification.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.erasure.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.erasure.desc')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.portability.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.portability.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.objection.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.objection.desc')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <span className="bg-[#422f40] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
                      <div>
                        <h4 className="font-semibold">{t('privacy.rights.complaint.title')}</h4>
                        <p className="text-sm text-gray-600">{t('privacy.rights.complaint.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h4 className="font-semibold mb-2">{t('privacy.rights.contact.title')}</h4>
                  <p><strong>E-Mail:</strong> datenschutz@diedreizahnaerzte.berlin</p>
                  <p><strong>Tel:</strong> 030 / 69005528</p>
                  <p><strong>Post:</strong> Dentists & Friends GmbH, Bendastraße 11a, 12051 Berlin</p>
                </div>
              </section>

              {/* 11. Data Security */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.security.title')}
                </h2>
                <p>{t('privacy.security.content')}</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>{t('privacy.security.ssl')}</li>
                  <li>{t('privacy.security.encryption')}</li>
                  <li>{t('privacy.security.access_control')}</li>
                  <li>{t('privacy.security.backups')}</li>
                  <li>{t('privacy.security.staff_training')}</li>
                </ul>
              </section>

              {/* 12. Updates */}
              <section>
                <h2 className="text-2xl font-semibold text-[#422f40] mb-4">
                  {t('privacy.updates.title')}
                </h2>
                <p>{t('privacy.updates.content')}</p>
              </section>

              {/* Contact Section */}
              <section className="bg-[#422f40] text-white p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  {t('privacy.contact.title')}
                </h2>
                <p className="mb-4">{t('privacy.contact.content')}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Datenschutz-Anfragen:</h4>
                    <p>datenschutz@diedreizahnaerzte.berlin</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Allgemeine Anfragen:</h4>
                    <p>team@diedreizahnaerzte.berlin</p>
                    <p>Tel: 030 / 69005528</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
