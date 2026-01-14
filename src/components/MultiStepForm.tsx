import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from './DatePicker';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  maritalStatus: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  interests: string[];
  availability: string[];
  message: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  maritalStatus: '',
  street: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  interests: [],
  availability: [],
  message: ''
};

const availabilityOptions = [
  '10:00-12:00',
  '13:00-15:00',
  '16:00-18:00',
  '18:00-21:00'
];

export default function MultiStepForm() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const interestCategories = [
    {
      name: t.form.step2.category1,
      items: [
        t.form.step2.interests.item1,
        t.form.step2.interests.item2,
        t.form.step2.interests.item3
      ]
    },
    {
      name: t.form.step2.category2,
      items: [
        t.form.step2.interests.item4,
        t.form.step2.interests.item5,
        t.form.step2.interests.item6,
        t.form.step2.interests.item7,
        t.form.step2.interests.item8,
        t.form.step2.interests.item9
      ]
    }
  ];

  const maritalStatusOptions = [
    t.form.step3.maritalStatusOptions.single,
    t.form.step3.maritalStatusOptions.family
  ];

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, navigate]);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleAvailability = (time: string) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter(t => t !== time)
        : [...prev.availability, time]
    }));
  };

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      console.log('Sending data to webhook:', formData);
      // https://n8n.srv1116248.hstgr.cloud/webhook/master
      const response = await fetch('https://n8n.srv1116248.hstgr.cloud/webhook/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log('Response body (raw text):', responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Response body (parsed JSON):', responseData);
      } catch (parseError) {
        console.log('Response is not JSON, keeping as text');
      }

      if (!response.ok) {
        const errorMsg = `Webhook returned status ${response.status}: ${response.statusText}`;
        console.error(errorMsg);
        console.error('Full response:', {
          status: response.status,
          statusText: response.statusText,
          body: responseText
        });
        throw new Error(errorMsg);
      }

      console.log('Submission successful!');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error details:', error);

      const errorMessage = error instanceof Error
        ? `Error: ${error.message}`
        : 'There was an unknown error during submission.';

      alert(`${errorMessage}\n\nPlease open the browser console (F12) for more details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.email.trim() !== '' && formData.phone.trim() !== '';
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>{t.form.success.title}</h2>
          <p className="text-slate-300 mb-2 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            {t.form.success.message}
          </p>
          <p className="text-slate-400 text-sm animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
            {t.form.success.redirect}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium animate-slide-in-right">{t.form.stepIndicator} {currentStep} {t.form.ofSteps} {totalSteps}</span>
            <span className="text-slate-400 text-sm font-bold animate-scale-in">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out shadow-lg shadow-orange-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl">
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step1.title}</h2>
                <p className="text-slate-400">{t.form.step1.description}</p>
              </div>

              <div className="space-y-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step1.firstName}
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder={t.form.step1.firstNamePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step1.lastName}
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder={t.form.step1.lastNamePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step2.title}</h2>
                <p className="text-slate-400">{t.form.step2.description}</p>
              </div>

              <div className="space-y-3">
                {interestCategories.map((category, catIndex) => (
                  <div key={category.name} className="space-y-2 animate-slide-up" style={{ animationDelay: `${catIndex * 0.1}s`, animationFillMode: 'backwards' }}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.name)}
                      className="w-full px-4 py-4 rounded-xl border-2 border-slate-600 bg-slate-900/50 hover:border-orange-500/50 transition-all text-left transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{category.name}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                            openCategories.includes(category.name) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {openCategories.includes(category.name) && (
                      <div className="pl-4 space-y-2">
                        {category.items.map((interest, itemIndex) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-left transform hover:scale-[1.02] animate-slide-up ${
                              formData.interests.includes(interest)
                                ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10'
                            }`}
                            style={{ animationDelay: `${itemIndex * 0.05}s`, animationFillMode: 'backwards' }}
                          >
                            <div className="flex items-center justify-between">
                              <span>{interest}</span>
                              {formData.interests.includes(interest) && (
                                <CheckCircle2 className="w-5 h-5 text-orange-400 animate-bounce-in" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step3.title}</h2>
                <p className="text-slate-400">{t.form.step3.description}</p>
              </div>

              <div className="space-y-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t.form.step3.emailPlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder={t.form.step3.phonePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    {t.form.step3.availability}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {availabilityOptions.map((time, index) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleAvailability(time)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                          formData.availability.includes(time)
                            ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{time}</span>
                          {formData.availability.includes(time) && (
                            <CheckCircle2 className="w-5 h-5 text-orange-400 animate-bounce-in" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.birthDate}
                  </label>
                  <DatePicker
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(value) => updateField('birthDate', value)}
                    placeholder="mm/dd/yyyy"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    {t.form.step3.maritalStatus}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {maritalStatusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateField('maritalStatus', formData.maritalStatus === status ? '' : status)}
                        className={`px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                          formData.maritalStatus === status
                            ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{status}</span>
                          {formData.maritalStatus === status && (
                            <CheckCircle2 className="w-5 h-5 text-orange-400 animate-bounce-in" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step4.title}</h2>
                <p className="text-slate-400">{t.form.step4.description}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                  <div className="col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.form.step4.street}
                    </label>
                    <input
                      id="street"
                      type="text"
                      value={formData.street}
                      onChange={(e) => updateField('street', e.target.value)}
                      placeholder={t.form.step4.streetPlaceholder}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                    />
                  </div>

                  <div>
                    <label htmlFor="houseNumber" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.form.step4.houseNumber}
                    </label>
                    <input
                      id="houseNumber"
                      type="text"
                      value={formData.houseNumber}
                      onChange={(e) => updateField('houseNumber', e.target.value)}
                      placeholder={t.form.step4.houseNumberPlaceholder}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.form.step4.postalCode}
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => updateField('postalCode', e.target.value)}
                      placeholder={t.form.step4.postalCodePlaceholder}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">
                      {t.form.step4.city}
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder={t.form.step4.cityPlaceholder}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step5.title}</h2>
                <p className="text-slate-400">{t.form.step5.description}</p>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  {t.form.step5.message}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder={t.form.step5.messagePlaceholder}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 resize-none"
                />
              </div>

              <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-4 animate-slide-up hover:border-orange-500/30 transition-all" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                <h3 className="text-white font-semibold mb-3">{t.form.step5.yourDetails}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                    <span className="text-slate-400">{t.form.step5.name}</span>
                    <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between animate-fade-in" style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}>
                    <span className="text-slate-400">{t.form.step3.email}</span>
                    <span className="text-white font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                    <span className="text-slate-400">{t.form.step3.phone}</span>
                    <span className="text-white font-medium">{formData.phone}</span>
                  </div>
                  {formData.availability.length > 0 && (
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: '0.45s', animationFillMode: 'backwards' }}>
                      <span className="text-slate-400">{t.form.step5.available}</span>
                      <span className="text-white font-medium">{formData.availability.join(', ')}</span>
                    </div>
                  )}
                  {formData.city && (
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
                      <span className="text-slate-400">{t.form.step5.city}</span>
                      <span className="text-white font-medium">{formData.city}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-700 animate-fade-in" style={{ animationDelay: '0.55s', animationFillMode: 'backwards' }}>
                    <span className="text-slate-400">{t.form.step5.interests}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.interests.map((interest, index) => (
                        <span key={interest} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-xs animate-scale-in hover:scale-110 transition-transform" style={{ animationDelay: `${0.6 + index * 0.05}s`, animationFillMode: 'backwards' }}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-xl transition-all flex items-center gap-2 transform hover:scale-105 animate-slide-up"
              >
                <ChevronLeft className="w-5 h-5" />
                {t.form.buttons.back}
              </button>
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 animate-slide-up"
              >
                {t.form.buttons.next}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 animate-slide-up"
              >
                {isSubmitting ? t.form.step5.submitting : t.form.buttons.submit}
                {!isSubmitting && <CheckCircle2 className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6 animate-fade-in">
          {t.form.privacy}
        </p>
      </div>
    </div>
  );
}