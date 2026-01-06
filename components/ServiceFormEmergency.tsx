import React, { useState } from 'react';
import { Loader2, Phone, AlertTriangle, Zap } from 'lucide-react';
import { ServiceFormData, ServiceType, UrgencyLevel, ContactMethod, FormErrors } from '../types';

const ServiceFormEmergency: React.FC = () => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: UrgencyLevel.Emergency, // Default to Emergency
    description: '',
    preferredContact: ContactMethod.Phone,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.phone) newErrors.phone = 'Required for emergencies';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Faster simulation
    console.log(formData);
    setIsSubmitting(false);
    alert('Emergency Team Alerted!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white border-t-4 border-red-600 shadow-2xl rounded-b-xl overflow-hidden">
      {/* Emergency Banner */}
      <div className="bg-red-50 p-6 flex items-center justify-between border-b border-red-100">
        <div>
          <h2 className="text-2xl font-bold text-red-700 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Emergency Service
          </h2>
          <p className="text-red-600/80 text-sm font-medium mt-1">
            24/7 Rapid Response Team • On-site in 60 mins
          </p>
        </div>
        <div className="relative">
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-red-600 font-bold border border-red-100 shadow-sm">
            24h
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Call CTA */}
        <a href="tel:5551234567" className="block w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl text-center mb-8 shadow-lg shadow-red-500/20 transition-transform hover:scale-[1.01] active:scale-[0.99] group">
          <span className="block text-sm opacity-90 mb-1">Fastest Response</span>
          <div className="flex items-center justify-center text-2xl font-bold">
            <Phone className="w-6 h-6 mr-3 animate-pulse" />
            (555) 123-4567
          </div>
        </a>

        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR REQUEST CALLBACK</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 bg-slate-50 border-2 rounded-lg text-lg font-medium outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-slate-200 focus:border-red-500'}`}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Phone <span className="text-red-500">*</span></label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-4 bg-slate-50 border-2 rounded-lg text-lg font-medium outline-none transition-colors ${errors.phone ? 'border-red-500' : 'border-slate-200 focus:border-red-500'}`}
              placeholder="Your Phone Number"
            />
             <p className="text-xs text-slate-500 mt-1">We will call this number immediately.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Service Type</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg outline-none focus:border-red-500"
                >
                  <option value="">Unsure</option>
                  {Object.values(ServiceType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Email (Opt)</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white border-2 border-slate-200 rounded-lg outline-none focus:border-red-500"
                />
             </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-slate-900 hover:bg-black text-white font-bold text-lg py-5 rounded-xl shadow-xl transition-all flex items-center justify-center mt-4"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <Zap className="w-5 h-5 text-yellow-400 mr-2 fill-current" /> 
                ALERT DISPATCH
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceFormEmergency;