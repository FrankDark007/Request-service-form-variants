import React, { useState } from 'react';
import { Loader2, ChevronRight, ChevronLeft, Check, ClipboardList, User, Calendar } from 'lucide-react';
import { ServiceFormData, ServiceType, UrgencyLevel, ContactMethod, FormErrors } from '../types';

const steps = [
  { id: 1, title: 'Contact', icon: User },
  { id: 2, title: 'Service', icon: ClipboardList },
  { id: 3, title: 'Details', icon: Calendar },
];

const ServiceFormStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: UrgencyLevel.Scheduled,
    description: '',
    preferredContact: ContactMethod.Phone,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name) newErrors.name = 'Required';
      if (!formData.phone) newErrors.phone = 'Required';
      if (!formData.email) newErrors.email = 'Required';
    }
    if (step === 2) {
      if (!formData.serviceType) newErrors.serviceType = 'Required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    } else {
      setErrors({});
    }
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(formData);
    setIsSubmitting(false);
    alert('Submitted successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
      {/* Progress Header */}
      <div className="bg-[#1a73e8]/5 p-6 border-b border-slate-100">
        <div className="flex justify-between items-center relative">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 w-full h-1 bg-slate-200 -z-0"></div>
          {/* Progress Bar Fill */}
          <div 
            className="absolute left-0 top-1/2 h-1 bg-[#1a73e8] transition-all duration-300 -z-0"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          ></div>

          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${isActive 
                      ? 'bg-[#1a73e8] border-[#1a73e8] text-white' 
                      : 'bg-white border-slate-300 text-slate-400'}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-[#1a73e8]' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-800">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-slate-300'} focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none`}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-slate-300'} focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none`}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none`}
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Contact</label>
                <div className="flex gap-4">
                  {Object.values(ContactMethod).map((method) => (
                    <label key={method} className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="preferredContact" 
                        value={method} 
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        className="text-[#1a73e8] focus:ring-[#1a73e8]"
                      />
                      <span className="text-sm text-slate-600">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-800">Service Selection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.values(ServiceType).map((type) => (
                <div 
                  key={type}
                  onClick={() => {
                    setFormData({ ...formData, serviceType: type });
                    if(errors.serviceType) setErrors({...errors, serviceType: undefined});
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-[#1a73e8]/50
                    ${formData.serviceType === type 
                      ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]' 
                      : 'border-slate-100 bg-slate-50 text-slate-600'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{type}</span>
                    {formData.serviceType === type && <Check className="w-5 h-5" />}
                  </div>
                </div>
              ))}
            </div>
            {errors.serviceType && <p className="text-red-500 text-sm">Please select a service type.</p>}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-slate-800">Details & Urgency</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Urgency Level</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgency: UrgencyLevel.Emergency})}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all
                      ${formData.urgency === UrgencyLevel.Emergency 
                        ? 'border-red-500 bg-red-50 text-red-600' 
                        : 'border-slate-200 text-slate-600 hover:border-red-200'}`}
                  >
                    🚨 Emergency
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgency: UrgencyLevel.Scheduled})}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all
                      ${formData.urgency === UrgencyLevel.Scheduled 
                        ? 'border-[#1a73e8] bg-[#e8f0fe] text-[#1a73e8]' 
                        : 'border-slate-200 text-slate-600 hover:border-blue-200'}`}
                  >
                    📅 Scheduled
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] outline-none resize-none"
                  placeholder="Please provide any relevant details..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 1 || isSubmitting}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors
            ${currentStep === 1 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-200'}`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>

        {currentStep < 3 ? (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-[#1a73e8] text-white rounded-lg font-semibold hover:bg-[#1557b0] transition-colors shadow-sm"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center px-8 py-3 bg-[#1a73e8] text-white rounded-lg font-semibold hover:bg-[#1557b0] transition-colors shadow-lg shadow-blue-500/20"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Request'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ServiceFormStepper;