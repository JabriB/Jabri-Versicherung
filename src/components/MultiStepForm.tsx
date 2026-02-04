import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DatePicker from './DatePicker';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { useHead } from '../hooks/useHead';
import { pixelEvents } from '../lib/pixelTracking';

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

interface ValidationErrors {
  email?: string;
  phone?: string;
  postalCode?: string;
  birthDate?: string;
}

interface PhoneVerificationState {
  isVerified: boolean;
  codeSent: boolean;
  verificationCode: string;
  sendingCode: boolean;
  verifying: boolean;
  error?: string;
  lastSentAt?: number;
  verifiedPhone?: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '1/1/1990',
  maritalStatus: 'Ledig',
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [phoneVerification, setPhoneVerification] = useState<PhoneVerificationState>({
    isVerified: false,
    codeSent: false,
    verificationCode: '',
    sendingCode: false,
    verifying: false,
  });
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useHead({
    title: 'Versicherungsformular | Jabri Versicherung',
    description: 'Füllen Sie unser Versicherungsformular aus, um personalisierte Beratung zu erhalten. Schnell, einfach und sicher.',
    canonical: 'https://jabriversicherung.de/formular',
    ogTitle: 'Versicherungsformular | Jabri Versicherung',
    ogDescription: 'Füllen Sie unser Versicherungsformular aus, um personalisierte Beratung zu erhalten.',
    ogUrl: 'https://jabriversicherung.de/formular',
    ogImage: 'https://jabriversicherung.de/jabri-versicherung-logo.svg'
  });

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

  useEffect(() => {
    pixelEvents.viewContent(`Form Step ${currentStep}`, 'form');
  }, [currentStep]);

  useEffect(() => {
    pixelEvents.initiateCheckout();
  }, []);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return false;
    const phoneRegex = /^[\d\s+()-]{8,}$/;
    return phoneRegex.test(phone);
  };

  const validatePostalCode = (code: string): boolean => {
    if (!code) return true;
    return /^\d{4,5}$/.test(code);
  };

  const validateAge = (birthDate: string): { isValid: boolean; message?: string } => {
    if (!birthDate) {
      return { isValid: false, message: 'Birth date is required' };
    }

    const parts = birthDate.split('/');
    if (parts.length !== 3) {
      return { isValid: false, message: 'Invalid date format' };
    }

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) {
      return { isValid: false, message: 'Invalid date' };
    }

    const birthDateObj = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    if (age < 18) {
      return { isValid: false, message: 'You must be at least 18 years old' };
    }

    return { isValid: true };
  };

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'email' && typeof value === 'string') {
      if (value && !validateEmail(value)) {
        setValidationErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      } else {
        setValidationErrors(prev => ({ ...prev, email: undefined }));
      }
    }

    if (field === 'phone' && typeof value === 'string') {
      if (value && !validatePhone(value)) {
        setValidationErrors(prev => ({ ...prev, phone: 'Invalid phone format' }));
      } else {
        setValidationErrors(prev => ({ ...prev, phone: undefined }));
      }
      setPhoneVerification({
        isVerified: false,
        codeSent: false,
        verificationCode: '',
        sendingCode: false,
        verifying: false,
      });
    }

    if (field === 'postalCode' && typeof value === 'string') {
      if (value && !validatePostalCode(value)) {
        setValidationErrors(prev => ({ ...prev, postalCode: 'Invalid postal code (4-5 digits)' }));
      } else {
        setValidationErrors(prev => ({ ...prev, postalCode: undefined }));
      }
    }

    if (field === 'birthDate' && typeof value === 'string') {
      const ageValidation = validateAge(value);
      if (!ageValidation.isValid) {
        setValidationErrors(prev => ({ ...prev, birthDate: ageValidation.message }));
      } else {
        setValidationErrors(prev => ({ ...prev, birthDate: undefined }));
      }
    }
  };

  const sendVerificationCode = async () => {
    if (!formData.phone || !validatePhone(formData.phone)) {
      setPhoneVerification(prev => ({ ...prev, error: 'Please enter a valid phone number' }));
      return;
    }

    const now = Date.now();
    if (phoneVerification.lastSentAt && (now - phoneVerification.lastSentAt) < 30000) {
      const secondsLeft = Math.ceil((30000 - (now - phoneVerification.lastSentAt)) / 1000);
      setPhoneVerification(prev => ({ ...prev, error: `Please wait ${secondsLeft} seconds before resending` }));
      return;
    }

    setPhoneVerification(prev => ({ ...prev, sendingCode: true, error: undefined }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-phone`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            phone: formData.phone,
            action: 'send',
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setPhoneVerification(prev => ({
          ...prev,
          codeSent: true,
          sendingCode: false,
          lastSentAt: Date.now(),
        }));
      } else {
        setPhoneVerification(prev => ({
          ...prev,
          sendingCode: false,
          error: data.error || 'Failed to send verification code',
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error && error.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : error instanceof Error
          ? error.message
          : 'Network error. Please try again.';

      setPhoneVerification(prev => ({
        ...prev,
        sendingCode: false,
        error: errorMessage,
      }));
    }
  };

  const verifyCode = async () => {
    if (!phoneVerification.verificationCode) {
      setPhoneVerification(prev => ({ ...prev, error: 'Please enter the verification code' }));
      return;
    }

    if (!/^\d{6}$/.test(phoneVerification.verificationCode)) {
      setPhoneVerification(prev => ({ ...prev, error: 'Code must be exactly 6 digits' }));
      return;
    }

    setPhoneVerification(prev => ({ ...prev, verifying: true, error: undefined }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-phone`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            phone: formData.phone,
            action: 'verify',
            code: phoneVerification.verificationCode,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setPhoneVerification(prev => ({
          ...prev,
          isVerified: true,
          verifying: false,
          error: undefined,
          verifiedPhone: formData.phone,
        }));
      } else {
        setPhoneVerification(prev => ({
          ...prev,
          verifying: false,
          error: data.error || 'Invalid verification code',
        }));
      }
    } catch (error) {
      const errorMessage = error instanceof Error && error.name === 'AbortError'
        ? 'Request timed out. Please try again.'
        : error instanceof Error
          ? error.message
          : 'Network error. Please try again.';

      setPhoneVerification(prev => ({
        ...prev,
        verifying: false,
        error: errorMessage,
      }));
    }
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
    setExpandedCategories(prev =>
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
    if (phoneVerification.verifiedPhone !== formData.phone) {
      alert('Phone number has been changed. Please verify it again before submitting.');
      setCurrentStep(2);
      return;
    }

    if (!phoneVerification.isVerified) {
      alert('Please verify your phone number before submitting.');
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('https://n8n.srv1116248.hstgr.cloud/webhook/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      pixelEvents.lead({
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      if (typeof window !== 'undefined') {
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17765377014/kkOyCIm88ekbEPbHmJdC',
            'value': 1.0,
            'currency': 'EUR',
            'event_callback': () => {
              setIsSubmitted(true);
            }
          });
        }

        setTimeout(() => {
          setIsSubmitted(true);
        }, 1000);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? `Error: ${error.message}`
        : 'There was an unknown error during submission.';

      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.interests.length > 0;
      case 2:
        const hasName = formData.firstName.trim() !== '' && formData.lastName.trim() !== '';
        const hasEmail = formData.email.trim() !== '';
        const hasPhone = formData.phone.trim() !== '';
        const hasValidEmail = validateEmail(formData.email);
        const hasValidPhone = validatePhone(formData.phone);
        const ageValidation = validateAge(formData.birthDate);
        const isPhoneVerified = phoneVerification.isVerified;
        return hasName && hasEmail && hasPhone && hasValidEmail && hasValidPhone && ageValidation.isValid && isPhoneVerified && !validationErrors.email && !validationErrors.phone && !validationErrors.birthDate;
      case 3:
        return !validationErrors.postalCode;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-3xl p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>{t.form.success.title}</h2>
          <p className="text-slate-300 mb-2 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            {t.form.success.message}
          </p>
          <p className="text-slate-400 text-sm animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            {t.form.success.redirect}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-sm font-medium animate-slide-in-right">{t.form.stepIndicator} {currentStep} {t.form.ofSteps} {totalSteps}</span>
            <span className="text-slate-400 text-sm font-bold animate-scale-in">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out shadow-lg shadow-orange-500/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl">
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step2.title}</h2>
                <p className="text-slate-400">{t.form.step2.description}</p>
              </div>

              <div className="space-y-3">
                {interestCategories.map((category, catIndex) => (
                  <div key={category.name} className="border border-slate-600 rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: `${catIndex * 0.1}s`, animationFillMode: 'backwards' }}>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.name)}
                      className="w-full px-4 py-4 flex items-center justify-between bg-slate-800/50 hover:bg-slate-800/70 transition-colors"
                    >
                      <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                      <ChevronDown
                        size={20}
                        className={`text-slate-400 transition-transform duration-300 ${
                          expandedCategories.includes(category.name) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedCategories.includes(category.name)
                          ? 'max-h-[1000px] opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4 bg-slate-900/30 border-t border-slate-600">
                        {category.items.map((interest, itemIndex) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-3 rounded-xl border-2 transition-all text-left transform hover:scale-[1.02] animate-slide-up ${
                              formData.interests.includes(interest)
                                ? 'bg-orange-500/20 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                                : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10'
                            }`}
                            style={{ animationDelay: `${itemIndex * 0.05}s`, animationFillMode: 'backwards' }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{interest}</span>
                              {formData.interests.includes(interest) && (
                                <CheckCircle2 className="w-4 h-4 text-orange-400 animate-bounce-in flex-shrink-0 ml-2" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step1.title}</h2>
                <p className="text-slate-400">{t.form.step1.description}</p>
              </div>

              <div className="space-y-4">
                <div className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step1.firstName} <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder={t.form.step1.firstNamePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step1.lastName} <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder={t.form.step1.lastNamePlaceholder}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01]"
                  />
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.email} <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder={t.form.step3.emailPlaceholder}
                    className={`w-full px-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 transform hover:scale-[1.01] ${
                      validationErrors.email ? 'border-red-500' : 'border-slate-600'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.email}</p>
                  )}
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-3">
                    {t.form.step3.phone} <span className="text-orange-400">*</span>
                  </label>
                  <div className="space-y-4">
                    {!phoneVerification.codeSent ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder={t.form.step3.phonePlaceholder}
                            disabled={phoneVerification.isVerified}
                            className={`flex-1 px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                              validationErrors.phone ? 'border-red-500' : phoneVerification.isVerified ? 'border-green-500' : 'border-slate-600'
                            }`}
                          />
                          {!phoneVerification.isVerified && (
                            <button
                              type="button"
                              onClick={sendVerificationCode}
                              disabled={!formData.phone || !!validationErrors.phone || phoneVerification.sendingCode}
                              className="px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transform hover:scale-105 shadow-lg shadow-orange-500/20"
                            >
                              {phoneVerification.sendingCode ? 'Sending...' : 'Send Code'}
                            </button>
                          )}
                          {phoneVerification.isVerified && (
                            <div className="flex items-center justify-center px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            </div>
                          )}
                        </div>
                        {validationErrors.phone && (
                          <p className="text-red-400 text-sm flex items-center gap-1">
                            <span>•</span> {validationErrors.phone}
                          </p>
                        )}
                      </div>
                    ) : null}

                    {phoneVerification.codeSent && !phoneVerification.isVerified && (
                      <div className="space-y-4 p-4 bg-gradient-to-br from-slate-900/70 to-slate-900/50 rounded-xl border border-slate-600/50 backdrop-blur-sm">
                        <div>
                          <p className="text-sm text-slate-300 font-medium">Enter the 6-digit verification code sent to your phone</p>
                          <p className="text-xs text-slate-500 mt-1">The code expires in 10 minutes</p>
                        </div>

                        <div className="space-y-3">
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={phoneVerification.verificationCode}
                            onChange={(e) => setPhoneVerification(prev => ({ ...prev, verificationCode: e.target.value.replace(/\D/g, ''), error: undefined }))}
                            placeholder="000000"
                            autoComplete="one-time-code"
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 text-center text-2xl font-mono tracking-widest font-bold transition-all hover:border-orange-500/50"
                          />
                          <button
                            type="button"
                            onClick={verifyCode}
                            disabled={phoneVerification.verificationCode.length !== 6 || phoneVerification.verifying}
                            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-green-500/20"
                          >
                            {phoneVerification.verifying ? 'Verifying...' : 'Verify'}
                          </button>
                          <button
                            type="button"
                            onClick={sendVerificationCode}
                            disabled={phoneVerification.sendingCode}
                            className="w-full text-sm text-slate-400 hover:text-orange-400 transition-all font-medium py-2"
                          >
                            {phoneVerification.sendingCode ? 'Sending new code...' : 'Resend verification code'}
                          </button>
                        </div>

                        {phoneVerification.error && (
                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-sm font-medium flex items-start gap-2">
                              <span className="mt-0.5">•</span>
                              <span>{phoneVerification.error}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.birthDate} <span className="text-orange-400">*</span>
                  </label>
                  <DatePicker
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(value) => updateField('birthDate', value)}
                    placeholder="mm/dd/yyyy"
                    className={validationErrors.birthDate ? 'border-red-500' : ''}
                  />
                  {validationErrors.birthDate && (
                    <p className="text-red-400 text-xs mt-1">{validationErrors.birthDate}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-up">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-white mb-2">{t.form.step5.title}</h2>
                <p className="text-slate-400">Complete optional details for better service</p>
              </div>

              <div className="space-y-4">
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.availability} <span className="text-slate-500 text-xs">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availabilityOptions.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleAvailability(time)}
                        className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                          formData.availability.includes(time)
                            ? 'bg-orange-500/20 border-orange-500 text-white'
                            : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step3.maritalStatus} <span className="text-slate-500 text-xs">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {maritalStatusOptions.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateField('maritalStatus', formData.maritalStatus === status ? '' : status)}
                        className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                          formData.maritalStatus === status
                            ? 'bg-orange-500/20 border-orange-500 text-white'
                            : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:border-orange-500/50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50">
                  <h4 className="text-white font-medium text-sm">Address <span className="text-slate-500 text-xs">(optional)</span></h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <input
                        id="street"
                        type="text"
                        value={formData.street}
                        onChange={(e) => updateField('street', e.target.value)}
                        placeholder={t.form.step4.streetPlaceholder}
                        className="w-full px-3 py-2 text-sm bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <input
                        id="houseNumber"
                        type="text"
                        value={formData.houseNumber}
                        onChange={(e) => updateField('houseNumber', e.target.value)}
                        placeholder={t.form.step4.houseNumberPlaceholder}
                        className="w-full px-3 py-2 text-sm bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        id="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => updateField('postalCode', e.target.value)}
                        placeholder={t.form.step4.postalCodePlaceholder}
                        className={`w-full px-3 py-2 text-sm bg-slate-900/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          validationErrors.postalCode ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {validationErrors.postalCode && (
                        <p className="text-red-400 text-xs mt-1">{validationErrors.postalCode}</p>
                      )}
                    </div>
                    <div className="col-span-2">
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        placeholder={t.form.step4.cityPlaceholder}
                        className="w-full px-3 py-2 text-sm bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="animate-slide-up">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    {t.form.step5.message} <span className="text-slate-500 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder={t.form.step5.messagePlaceholder}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  />
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-4 mt-4">
                <h3 className="text-white font-semibold mb-3">{t.form.step5.yourDetails}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.form.step5.name}</span>
                    <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                  {formData.email && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.form.step3.email}</span>
                      <span className="text-white font-medium">{formData.email}</span>
                    </div>
                  )}
                  {formData.phone && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.form.step3.phone}</span>
                      <span className="text-white font-medium">{formData.phone}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-700">
                    <span className="text-slate-400">{t.form.step5.interests}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.interests.map((interest) => (
                        <span key={interest} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-lg text-xs">
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 animate-slide-up"
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