import React, { useState } from 'react';
import { Loader2, ChevronDown, ChevronUp, User, Wrench, FileText, Send } from 'lucide-react';
import { ServiceFormData, ServiceType, UrgencyLevel, ContactMethod, FormErrors } from '../types';

interface SectionProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  isComplete?: boolean;
}

const FormSection: React.FC<SectionProps> = ({ title, icon: Icon, isOpen, onToggle, children, isComplete }) => (
  <div className={`border rounded-xl transition-all duration-300 overflow-hidden mb-4 ${isOpen ? 'border-[#1a73e8] shadow-md' : 'border-slate-200'}`}>
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-4 ${isOpen ? 'bg-[#f8fbff]' : 'bg-white hover:bg-slate-50'}`}
    >
      <div className="flex items-center">
        <div className={`p-2 rounded-lg mr-3 ${isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h3 className={`font-semibold ${isOpen ? 'text-[#1a73e8]' : 'text-slate-800'}`}>{title}</h3>
          {!isOpen && isComplete && <span className="text-xs text-emerald-600 font-medium">Completed</span>}
        </div>
      </div>
      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
    </button>
    
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-5 border-t border-slate-100 bg-white">
        {children}
      </div>
    </div>
  </div>
);

const ServiceFormCard: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>('contact');
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    urgency: UrgencyLevel.Scheduled,
    description: '',
    preferredContact: ContactMethod.Phone,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isContactComplete = !!(formData.name && formData.phone && formData.email);
  const isServiceComplete = !!(formData.serviceType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(formData);
    setIsSubmitting(false);
    alert('Request Sent!');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">New Request</h2>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">
          Licensed & Insured
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <FormSection 
          title="Contact Details" 
          icon={User} 
          isOpen={openSection === 'contact'} 
          onToggle={() => setOpenSection(openSection === 'contact' ? '' : 'contact')}
          isComplete={isContactComplete}
        >
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#1a73e8] outline-none transition-colors"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#1a73e8] outline-none transition-colors"
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#1a73e8] outline-none transition-colors"
            />
            <button 
              type="button" 
              onClick={() => setOpenSection('service')}
              className="w-full py-2 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200"
            >
              Continue
            </button>
          </div>
        </FormSection>

        <FormSection 
          title="Service Information" 
          icon={Wrench} 
          isOpen={openSection === 'service'} 
          onToggle={() => setOpenSection(openSection === 'service' ? '' : 'service')}
          isComplete={isServiceComplete}
        >
          <div className="space-y-4">
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#1a73e8] outline-none"
            >
              <option value="">Select Service Type...</option>
              {Object.values(ServiceType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <div className="flex gap-2">
               {Object.values(UrgencyLevel).map(level => (
                 <label key={level} className={`flex-1 cursor-pointer border rounded-lg p-3 text-center text-sm transition-colors ${formData.urgency === level ? 'bg-[#1a73e8] text-white border-[#1a73e8]' : 'hover:bg-slate-50 text-slate-600'}`}>
                   <input type="radio" name="urgency" value={level} checked={formData.urgency === level} onChange={handleChange} className="sr-only" />
                   {level}
                 </label>
               ))}
            </div>
             <button 
              type="button" 
              onClick={() => setOpenSection('details')}
              className="w-full py-2 bg-slate-100 text-slate-600 font-medium rounded-lg hover:bg-slate-200"
            >
              Continue
            </button>
          </div>
        </FormSection>

        <FormSection 
          title="Additional Details" 
          icon={FileText} 
          isOpen={openSection === 'details'} 
          onToggle={() => setOpenSection(openSection === 'details' ? '' : 'details')}
          isComplete={!!formData.description}
        >
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the problem..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-[#1a73e8] outline-none resize-none mb-3"
          />
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
             <span className="text-sm text-slate-500">Contact me via:</span>
             <div className="flex gap-2">
               {Object.values(ContactMethod).map(m => (
                 <label key={m} className="cursor-pointer">
                    <input type="radio" name="preferredContact" value={m} checked={formData.preferredContact === m} onChange={handleChange} className="sr-only peer" />
                    <span className="text-xs px-2 py-1 rounded bg-white border border-slate-200 text-slate-500 peer-checked:bg-[#1a73e8] peer-checked:text-white peer-checked:border-[#1a73e8] transition-colors">{m}</span>
                 </label>
               ))}
             </div>
          </div>
        </FormSection>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-[#1a73e8] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 hover:bg-[#1557b0] transition-all flex justify-center items-center"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Send Request</>}
        </button>
      </form>
    </div>
  );
};

export default ServiceFormCard;