import React, { useState } from 'react';
import ServiceFormMinimal from './components/ServiceFormMinimal';
import ServiceFormSplit from './components/ServiceFormSplit';
import ServiceFormStepper from './components/ServiceFormStepper';
import ServiceFormCard from './components/ServiceFormCard';
import ServiceFormEmergency from './components/ServiceFormEmergency';

const App: React.FC = () => {
  const [variant, setVariant] = useState<string>('minimal');

  const renderVariant = () => {
    switch (variant) {
      case 'minimal': return <ServiceFormMinimal />;
      case 'split': return <ServiceFormSplit />;
      case 'stepper': return <ServiceFormStepper />;
      case 'card': return <ServiceFormCard />;
      case 'emergency': return <ServiceFormEmergency />;
      default: return <ServiceFormMinimal />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-[Plus Jakarta Sans]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1a73e8] rounded-lg mr-3 flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-slate-800">Flood Doctor</span>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto">
            {['minimal', 'split', 'stepper', 'card', 'emergency'].map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
                  ${variant === v 
                    ? 'bg-[#1a73e8] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)} Variant
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            {renderVariant()}
          </div>
          
          <div className="mt-12 text-slate-400 text-sm text-center">
            <p>Component Variant: <span className="font-mono text-slate-600">{variant}</span></p>
            <p className="mt-2">Built with React + Tailwind CSS</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;