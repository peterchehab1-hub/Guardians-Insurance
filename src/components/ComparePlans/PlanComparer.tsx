
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Car, 
  Heart, 
  Plane, 
  Home as HomeIcon, 
  Briefcase,
  CheckCircle2,
  MessageCircle,
  TrendingUp,
  Clock,
  Layout
} from 'lucide-react';
import { InsuranceType, ComparisonResult } from '../../../types.ts';
import { COMPARISON_DATA } from '../../data/comparisonData.ts';

interface PlanComparerProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: InsuranceType | null;
}

const PlanComparer: React.FC<PlanComparerProps> = ({ isOpen, onClose, initialType }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<InsuranceType | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Sync initial type if provided when modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (initialType) {
        setType(initialType);
        setStep(2);
      } else {
        setType(null);
        setStep(1);
      }
      setInputs({});
      setShowResults(false);
    }
  }, [isOpen, initialType]);

  const steps = [
    { id: 1, title: 'Select Insurance Type' },
    { id: 2, title: 'Tell us more' },
    { id: 3, title: 'Your Recommendations' }
  ];

  const insuranceOptions: { id: InsuranceType; label: string; icon: React.ReactNode }[] = [
    { id: 'car', label: 'Car Insurance', icon: <Car className="w-6 h-6" /> },
    { id: 'medical', label: 'Medical Insurance', icon: <Heart className="w-6 h-6" /> },
    { id: 'travel', label: 'Travel Insurance', icon: <Plane className="w-6 h-6" /> },
    { id: 'life', label: 'Life Insurance', icon: <Shield className="w-6 h-6" /> },
    { id: 'home', label: 'Home Insurance', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'business', label: 'Business Insurance', icon: <Briefcase className="w-6 h-6" /> },
  ];

  const handleTypeSelect = (selectedType: InsuranceType) => {
    setType(selectedType);
    setStep(2);
  };

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleCompare = () => {
    setStep(3);
    setShowResults(true);
  };

  const renderStep2 = () => {
    if (!type) return null;

    const renderInput = (label: string, key: string, options: string[]) => (
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">{label}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => handleInputChange(key, opt)}
              className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                inputs[key] === opt 
                  ? 'border-teal-primary bg-teal-primary/5 text-teal-primary' 
                  : 'border-gray-100 text-gray-500 hover:border-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );

    switch (type) {
      case 'car':
        return (
          <div className="space-y-6">
            {renderInput('Car Value', 'carValue', ['$0 - $10k', '$10k - $30k', '$30k - $60k', '$60k+'])}
            {renderInput('Budget', 'budget', ['Economy', 'Medium', 'Premium'])}
            {renderInput('Coverage Type', 'coverage', ['Third Party', 'Comprehensive'])}
          </div>
        );
      case 'medical':
        return (
          <div className="space-y-6">
            {renderInput('Who is it for?', 'who', ['Individual', 'Family', 'Group'])}
            {renderInput('Coverage Class', 'class', ['Class B', 'Class A', 'Premium/International'])}
            {renderInput('Age Range', 'age', ['18-35', '36-50', '51+'])}
          </div>
        );
      case 'travel':
        return (
          <div className="space-y-6">
            {renderInput('Destination', 'destination', ['Schengen', 'Worldwide', 'Middle East'])}
            {renderInput('Duration', 'duration', ['Up to 15 days', '30 days', '90 days', 'Annual'])}
          </div>
        );
      case 'life':
        return (
          <div className="space-y-6">
            {renderInput('Purpose', 'purpose', ['Family Protection', 'Savings & Retirement', 'Education Fund'])}
            {renderInput('Monthly Budget', 'budget', ['$50 - $100', '$100 - $300', '$300+'])}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            {renderInput('Standard Requirement', 'req', ['Basic', 'Enhanced', 'Full Coverage'])}
            {renderInput('Budget Range', 'budget', ['Economy', 'Standard', 'Premium'])}
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!type) return null;
    const results = COMPARISON_DATA[type];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {results.map((res, i) => (
          <motion.div
            key={res.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-3xl border-2 transition-all ${
              res.isRecommended 
                ? 'border-teal-primary bg-white shadow-2xl ring-4 ring-teal-primary/5' 
                : 'border-gray-100 bg-white shadow-lg'
            }`}
          >
            {res.isRecommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-primary text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Our Recommendation
              </div>
            )}
            
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-black text-text-dark">{res.company}</h3>
              <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${
                res.priceLevel === 'Low' ? 'bg-green-100 text-green-700' :
                res.priceLevel === 'Medium' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {res.priceLevel} Price
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-start space-x-3">
                <Layout className="w-5 h-5 text-teal-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flexibility</div>
                  <div className="text-gray-700 font-medium">{res.flexibility}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-teal-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Claims Speed</div>
                  <div className="text-gray-700 font-medium">{res.claimsSpeed}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-teal-primary shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Network Strength</div>
                  <div className="text-gray-700 font-medium">{res.networkStrength}</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-light p-4 rounded-xl mb-8 border border-gray-100">
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Best For</div>
               <div className="text-text-dark font-bold text-sm leading-tight italic">"{res.bestUseCase}"</div>
            </div>

            <button className="w-full py-4 rounded-xl bg-text-dark text-white font-bold text-sm hover:bg-black transition-all mb-3 flex items-center justify-center space-x-2">
              <span>View Full Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-text-dark/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="text-teal-primary w-6 h-6" />
              <div className="text-teal-primary font-black uppercase tracking-widest text-xs">Smart Advisor Tool</div>
            </div>
            <h2 className="text-3xl font-black text-text-dark">Plan Comparison</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full hover:bg-gray-100 transition-all text-gray-400 hover:text-text-dark"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 sm:p-12 scrollbar-thin scrollbar-thumb-gray-200">
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-12 max-w-md mx-auto">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                    step >= s.id ? 'bg-teal-primary text-white shadow-lg shadow-teal-primary/20' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {s.id}
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 transition-all ${
                    step >= s.id ? 'text-teal-primary' : 'text-gray-300'
                  }`}>
                    {s.title}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-grow h-0.5 mx-4 transition-all ${
                    step > s.id ? 'bg-teal-primary' : 'bg-gray-100'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {insuranceOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleTypeSelect(opt.id!)}
                    className="group bg-bg-light p-10 rounded-[2.5rem] border-2 border-transparent hover:border-teal-primary/30 hover:bg-white transition-all text-left shadow-lg hover:shadow-2xl"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-primary mb-8 shadow-sm group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </div>
                    <h3 className="text-xl font-black text-text-dark mb-2 tracking-tight">{opt.label}</h3>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">Compare top providers for {opt.label.toLowerCase()} in Lebanon.</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="mb-10 text-center">
                   <div className="inline-flex items-center space-x-2 text-teal-primary mb-4">
                      <div className="w-8 h-8 bg-teal-primary/10 rounded-lg flex items-center justify-center">
                        {insuranceOptions.find(o => o.id === type)?.icon}
                      </div>
                      <span className="font-black uppercase tracking-widest text-sm">{type} Insurance</span>
                   </div>
                   <h3 className="text-3xl font-black text-text-dark leading-tight">Help us tailor your results</h3>
                </div>
                
                {renderStep2()}

                <div className="flex space-x-4 mt-12 bg-white sticky bottom-0 py-6 border-t border-gray-50">
                  <button 
                    onClick={() => { setStep(1); setInputs({}); }}
                    className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  <button 
                    onClick={handleCompare}
                    className="flex-[2] py-5 rounded-2xl bg-teal-primary hover:bg-teal-primary/90 text-white font-black text-lg transition-all shadow-xl shadow-teal-primary/20 flex items-center justify-center space-x-2"
                  >
                    <span>Compare Now</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-12">
                   <h3 className="text-4xl font-black text-text-dark mb-4">Best Plans for You</h3>
                   <p className="text-gray-500 max-w-xl mx-auto">Based on your preferences, we've identified the top providers that match your needs. Remember, final pricing depends on your specific profile.</p>
                </div>

                {renderResults()}

                <div className="mt-16 flex flex-col items-center">
                   <div className="bg-bg-light p-10 rounded-[3rem] w-full max-w-4xl border border-gray-100 text-center">
                      <h4 className="text-2xl font-black text-text-dark mb-4">Still unsure about your choice?</h4>
                      <p className="text-gray-500 mb-10 max-w-2xl mx-auto">Our local experts can provide a deeper analysis including the latest discount offers and network updates.</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-teal-primary hover:bg-teal-primary/90 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-teal-primary/20 flex items-center justify-center space-x-3 transition-all transform hover:scale-105">
                           <MessageCircle className="w-6 h-6" />
                           <span>Talk on WhatsApp</span>
                        </button>
                        <button className="bg-text-dark hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl flex items-center justify-center space-x-3 transition-all transform hover:scale-105">
                           <Shield className="w-6 h-6" />
                           <span>Get Final Recommendation</span>
                        </button>
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => { setStep(1); setShowResults(false); setType(null); setInputs({}); }}
                  className="mt-12 mx-auto block text-gray-400 hover:text-teal-primary font-bold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-teal-primary transition-all pb-1"
                >
                  Start New Comparison
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanComparer;
