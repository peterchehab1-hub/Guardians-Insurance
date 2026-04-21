
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Info, Phone, Mail, User, ShieldCheck, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../constants.tsx';
import { InsuranceType, Service } from '../types.ts';
import PlanComparer from '../src/components/ComparePlans/PlanComparer.tsx';
import { insuranceService } from '../src/services/insuranceService';

// Extended type for internal use
interface ExtendedService extends Service {
  agent?: string;
  contact?: string;
  email?: string;
  relevantInfo?: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [loadingServices, setLoadingServices] = useState(true);
  const [selectedService, setSelectedService] = useState<ExtendedService | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isComparerOpen, setIsComparerOpen] = useState(false);
  const [initialComparerType, setInitialComparerType] = useState<InsuranceType | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const firestoreServices = await insuranceService.getAllServices();
        if (firestoreServices && firestoreServices.length > 0) {
          setServices(firestoreServices);
        }
      } catch (error) {
        console.error('Error fetching services from Firestore:', error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const openComparer = (type: InsuranceType | null = null) => {
    setInitialComparerType(type);
    setIsComparerOpen(true);
  };

  const openModal = (service: Service) => {
    const extended: ExtendedService = {
      ...service,
      agent: 'Agent Support Team',
      contact: '(+961) 71971213',
      email: 'peterchehab98@gmail.com',
      relevantInfo: 'This policy includes 24/7 priority support and expedited claim processing.'
    };
    setSelectedService(extended);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowQuoteForm(false);
    setIsSubmitted(false);
    document.body.style.overflow = 'auto';
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-steel-blue py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-teal-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-primary rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Our Protection Plans
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Explore our comprehensive range of insurance products designed to provide total security for your life, health, and assets.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-teal-primary/40 transition-all hover:shadow-2xl flex flex-col h-full group"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={service.imageUrl || service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md rounded-2xl w-14 h-14 flex items-center justify-center text-3xl border border-white/20 shadow-xl">
                    {service.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-bold text-text-dark mb-4">{service.title}</h3>
                  <p className="text-gray-500 mb-10 flex-grow leading-relaxed text-lg">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-col gap-3 mt-auto">
                    <button 
                      onClick={() => openModal(service)}
                      className="w-full bg-teal-primary hover:bg-teal-primary/90 text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center group/btn uppercase tracking-widest text-sm shadow-xl"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    <button 
                      onClick={() => openComparer(service.id as InsuranceType)}
                      className="w-full bg-teal-primary/10 hover:bg-teal-primary text-teal-primary hover:text-white py-4 rounded-2xl font-black transition-all flex items-center justify-center space-x-2 group/btn border border-teal-primary/30 uppercase tracking-widest text-sm"
                    >
                      <span>Compare Plans</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
              onClick={closeModal}
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-y-auto relative z-10"
            >
              <button 
                onClick={closeModal}
                className="absolute top-8 right-8 p-3 rounded-full bg-gray-100 hover:bg-teal-primary hover:text-white text-gray-400 z-20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 h-80 lg:h-auto overflow-hidden relative">
                  <img src={selectedService.imageUrl || selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white hidden lg:block"></div>
                </div>
                <div className="lg:w-1/2 p-10 lg:p-16">
                  {!showQuoteForm ? (
                    <>
                      <div className="inline-flex items-center px-4 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-black tracking-widest uppercase mb-8 border border-teal-primary/20">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        <span>{selectedService.title} PLAN</span>
                      </div>
                      <h2 className="text-5xl font-black text-text-dark mb-8">{selectedService.title}</h2>
                      <div className="prose text-gray-500 mb-10 text-lg leading-relaxed">
                        <p>{selectedService.fullDescription}</p>
                      </div>

                      {/* Contact & Relevant Info Box */}
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4 mb-10">
                          <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                <User className="w-4 h-4 mr-2" />
                                <span>Consultant</span>
                              </div>
                              <span className="text-text-dark font-bold">{selectedService.agent}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                <Phone className="w-4 h-4 mr-2" />
                                <span>Phone</span>
                              </div>
                              <span className="text-teal-primary font-bold">{selectedService.contact}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>Email</span>
                              </div>
                              <span className="text-gray-600 font-medium">{selectedService.email}</span>
                          </div>
                          <div className="pt-4 border-t border-gray-100 mt-4">
                              <p className="text-xs text-gray-400 italic leading-relaxed">
                                <span className="font-bold text-gray-400 uppercase not-italic mr-2">Policy Info:</span> 
                                {selectedService.relevantInfo}
                              </p>
                          </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => setShowQuoteForm(true)}
                          className="w-full bg-teal-primary hover:bg-teal-primary/90 text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all transform active:scale-95 uppercase tracking-widest"
                        >
                          GET QUOTE
                        </button>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="h-full flex flex-col"
                    >
                      {!isSubmitted ? (
                        <>
                          <button 
                            onClick={() => setShowQuoteForm(false)}
                            className="flex items-center text-gray-400 hover:text-teal-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8 group"
                          >
                            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Back to Details
                          </button>
                          <h2 className="text-4xl font-black text-text-dark mb-4">Request a Quote</h2>
                          <p className="text-gray-500 mb-8 font-medium">Please provide your details for <span className="text-teal-primary font-bold">{selectedService.title}</span>.</p>
                          
                          <form onSubmit={handleQuoteSubmit} className="space-y-6">
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Full Name</label>
                              <input 
                                required 
                                type="text" 
                                placeholder="e.g. Jean Khoury" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phone or Email</label>
                              <input 
                                required 
                                type="text" 
                                placeholder="+961 or email@example.com" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Additional Note</label>
                              <textarea 
                                rows={3} 
                                placeholder="Tell us more about your specific needs..." 
                                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium resize-none" 
                              />
                            </div>
                            <button 
                              type="submit"
                              className="w-full bg-teal-primary hover:bg-teal-primary/90 text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest"
                            >
                              <span>Send Request</span>
                              <Send className="w-5 h-5" />
                            </button>
                          </form>
                        </>
                      ) : (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex flex-col items-center justify-center text-center h-full py-12"
                        >
                          <div className="w-24 h-24 bg-teal-primary/10 rounded-full flex items-center justify-center mb-8">
                            <CheckCircle2 className="w-12 h-12 text-teal-primary" />
                          </div>
                          <h2 className="text-4xl font-black text-text-dark mb-4">Request Sent!</h2>
                          <p className="text-gray-500 text-lg mb-10 max-w-sm">Thank you for your interest. A consultant will reach out to you within 24 hours.</p>
                          <button 
                            onClick={closeModal}
                            className="bg-steel-blue text-white px-10 py-4 rounded-2xl font-bold transition-all hover:bg-deep-blue"
                          >
                            Close Window
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PlanComparer 
        isOpen={isComparerOpen} 
        onClose={() => setIsComparerOpen(false)} 
        initialType={initialComparerType}
      />
    </div>
  );
};

export default Services;
