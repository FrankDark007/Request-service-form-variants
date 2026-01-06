import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { ServiceFormData, ServiceType, UrgencyLevel, ContactMethod, FormErrors } from '../types';

const ServiceFormMinimal: React.FC = () => {
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
  const [isSuccess, setIsSuccess] = useState(false);

  // Floating label state helper
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.description) newErrors.description = 'Please describe the issue';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form Submitted:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto p-12 bg-white rounded-2xl shadow-xl shadow-slate-200/60 text-center animate-fade-in border border-slate-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h3>
        <p className="text-slate-500 mb-8 leading-relaxed">Our team will contact you shortly to confirm your {formData.serviceType} appointment.</p>
        <button 
          onClick={() => { setIsSuccess(false); setFormData({ ...formData, description: '', serviceType: '' }); }}
          className="px-6 py-2.5 bg-slate-50 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const InputGroup = ({ name, label, type = 'text', Component = 'input', options = [] }: any) => {
    const isInputFocused = focusedField === name;
    const hasValue = !!formData[name as keyof ServiceFormData];
    const shouldFloat = isInputFocused || hasValue;
    const hasError = !!errors[name as keyof FormErrors];

    return (
      <div className="relative mb-6 group">
        <div className="relative">
          {Component === 'select' ? (
            <>
              <select
                name={name}
                value={formData[name as keyof ServiceFormData]}
                onChange={handleChange}
                onFocus={() => setFocusedField(name)}
                onBlur={() => setFocusedField(null)}
                className={`peer w-full px-4 py-3.5 bg-white border rounded-xl outline-none transition-all duration-200 appearance-none text-slate-900
                  ${hasError 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                    : 'border-slate-200 hover:border-slate-300 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10'
                  }`}
              >
                <option value="" disabled></option>
                {options.map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none transition-transform duration-200 ${isInputFocused ? 'rotate-180 text-[#1a73e8]' : ''}`} />
            </>
          ) : (
            React.createElement(Component, {
              name,
              type,
              value: formData[name as keyof ServiceFormData],
              onChange: handleChange,
              onFocus: () => setFocusedField(name),
              onBlur: () => setFocusedField(null),
              className: `peer w-full px-4 py-3.5 bg-white border rounded-xl outline-none transition-all duration-200 text-slate-900
                ${hasError 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                  : 'border-slate-200 hover:border-slate-300 focus:border-[#1a73e8] focus:ring-4 focus:ring-blue-500/10'
                }
                ${Component === 'textarea' ? 'min-h-[120px] resize-none' : ''}`
            })
          )}
          
          <label
            className={`absolute left-3 transition-all duration-200 ease-out pointer-events-none px-1 bg-white
              ${shouldFloat 
                ? '-top-2.5 text-xs font-semibold' 
                : 'top-3.5 text-base'}
              ${hasError ? 'text-red-500' : isInputFocused ? 'text-[#1a73e8]' : 'text-slate-500'}
              `}
          >
            {label}
          </label>
        </div>
        
        <div className={`overflow-hidden transition-all duration-300 ease-out ${hasError ? 'max-h-8 opacity-100 mt-1.5' : 'max-h-0 opacity-0'}`}>
           <div className="flex items-center text-xs font-medium text-red-500">
             <AlertCircle className="w-3.5 h-3.5 mr-1.5" /> {errors[name as keyof FormErrors]}
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Service Request</h2>
        <p className="text-slate-500 mt-2.5 text-lg">How can we help you today?</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <InputGroup name="name" label="Full Name" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <InputGroup name="phone" label="Phone Number" type="tel" />
          <InputGroup name="email" label="Email Address" type="email" />
        </div>

        <InputGroup 
          name="serviceType" 
          label="Service Required" 
          Component="select" 
          options={Object.values(ServiceType)} 
        />

        <div className="mb-8">
          <span className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Urgency Level</span>
          <div className="flex gap-4">
            {Object.values(UrgencyLevel).map((level) => {
               const isSelected = formData.urgency === level;
               return (
                <label 
                  key={level}
                  className={`flex-1 relative cursor-pointer py-3 text-center text-sm font-semibold rounded-xl transition-all duration-200 border
                    ${isSelected 
                      ? 'bg-[#f0f7ff] border-[#1a73e8] text-[#1a73e8]' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <input
                    type="radio"
                    name="urgency"
                    value={level}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {level}
                  {isSelected && <Check className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-[#1a73e8]" />}
                </label>
              );
            })}
          </div>
        </div>

        <InputGroup name="description" label="Describe the issue" Component="textarea" />

        <div className="mb-10">
          <span className="block text-sm font-semibold text-slate-700 mb-3 ml-1">Preferred Contact</span>
          <div className="flex gap-2">
            {Object.values(ContactMethod).map((method) => {
              const isSelected = formData.preferredContact === method;
              return (
                <label key={method} className={`flex-1 cursor-pointer group`}>
                  <input
                    type="radio"
                    name="preferredContact"
                    value={method}
                    checked={isSelected}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`text-center py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border
                    ${isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}>
                    {method}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Submit Request'}
        </button>
        
        <p className="mt-6 text-xs text-center text-slate-400 font-medium">
          <span className="inline-flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Licensed & Insured</span>
          <span className="mx-2">•</span>
          <span>Response within 60 mins</span>
        </p>
      </form>
    </div>
  );
};

export default ServiceFormMinimal;