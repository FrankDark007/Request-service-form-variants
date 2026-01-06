import React, { useState } from 'react';
import { Loader2, Check, ShieldCheck, Clock, Star, Phone } from 'lucide-react';
import { ServiceFormData, ServiceType, UrgencyLevel, ContactMethod, FormErrors } from '../types';

const ServiceFormSplit: React.FC = () => {
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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(formData);
    setIsSubmitting(false);
    alert('Request submitted!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Left Column: Trust Signals */}
      <div className="bg-[#1a73e8] p-10 lg:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Flood Doctor</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Northern Virginia's premier water damage restoration experts. We restore your peace of mind.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="p-2 bg-white/10 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">60-Minute Response</h4>
                <p className="text-blue-100 text-sm">On-site within the hour for emergencies.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="p-2 bg-white/10 rounded-lg mr-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Licensed & Insured</h4>
                <p className="text-blue-100 text-sm">Full liability coverage for all projects.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-2 bg-white/10 rounded-lg mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">5-Star Rated</h4>
                <p className="text-blue-100 text-sm">Trusted by hundreds of local homeowners.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 relative z-10">
          <p className="text-sm font-medium opacity-80 mb-2">Need immediate assistance?</p>
          <div className="flex items-center text-2xl font-bold">
            <Phone className="w-6 h-6 mr-3" />
            (555) 123-4567
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="p-8 lg:p-12 lg:w-3/5 bg-slate-50">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Get a Free Estimate</h3>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
                placeholder="(555) 000-0000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
              placeholder="john@example.com"
            />
             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Service Needed</label>
              <div className="relative">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border appearance-none ${errors.serviceType ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'} focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none transition-all`}
                >
                  <option value="">Select Service...</option>
                  {Object.values(ServiceType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Urgency</label>
              <div className="flex bg-slate-200 p-1 rounded-xl">
                 {Object.values(UrgencyLevel).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({...formData, urgency: level})}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      formData.urgency === level 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {level}
                  </button>
                 ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Problem Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-[#1a73e8] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
              placeholder="Briefly describe what happened..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.99] flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
              ) : (
                <>Submit Request <Check className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormSplit;