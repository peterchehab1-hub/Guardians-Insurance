
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  Zap, 
  MapPin,
  Heart,
  Home as HomeIcon,
  Plane,
  Car,
  Users,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../constants.tsx';
import PlanComparer from '../src/components/ComparePlans/PlanComparer.tsx';
import { InsuranceType } from '../types.ts';

const Home: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isComparerOpen, setIsComparerOpen] = useState(false);
  const [initialComparerType, setInitialComparerType] = useState<InsuranceType | null>(null);

  const openComparer = (type: InsuranceType | null = null) => {
    setInitialComparerType(type);
    setIsComparerOpen(true);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-steel-blue overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/hero-background.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Protect What <br />
              <span className="text-teal-primary">You Value Most.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Reliable insurance solutions tailored for the Lebanese community. Safeguarding your family, health, and assets since 2019.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="bg-teal-primary hover:bg-teal-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center space-x-2">
                <span>Get a Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => openComparer(null)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Compare Plans
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Is Insurance? */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-bold tracking-widest uppercase mb-4">
                Insurance Guide
              </div>
              <h2 className="text-4xl font-black text-text-dark mb-6">Get the Best Insurance in Lebanon — Without Overpaying</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                We compare top insurance companies like Fidelity, Bankers, UFA & Solidarity to find you the best coverage at the best price.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Instant comparison',
                  'Personalized plans',
                  'No hidden fees'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-teal-primary mr-3 w-6 h-6 shrink-0" />
                    <span className="text-gray-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services" className="bg-teal-primary hover:bg-teal-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                  <span>Get My Best Plan Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => openComparer(null)}
                  className="bg-white hover:bg-gray-50 text-text-dark border-2 border-gray-100 px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center"
                >
                  Compare Plans
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img src="/what-is-insurance.png" alt="Insurance Guide" className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-teal-primary p-10 rounded-3xl shadow-2xl hidden lg:block">
                <div className="text-5xl font-black text-white">7+</div>
                <div className="text-white/80 font-bold uppercase tracking-widest text-xs mt-1">Years of Trust</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="py-24 bg-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Our Services</h2>
              <p className="text-blue-100 text-lg">Discover our wide range of premium insurance products.</p>
            </div>
            <div className="flex space-x-3">
              <button onClick={scrollLeft} className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg active:scale-90 border border-white/10">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={scrollRight} className="p-4 rounded-2xl bg-teal-primary hover:bg-teal-primary/90 text-white transition-all shadow-lg active:scale-90">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto space-x-8 pb-12 hide-scrollbar snap-x"
          >
            {SERVICES_DATA.map((service) => (
              <motion.div 
                key={service.id} 
                whileHover={{ y: -10 }}
                className="min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-xl snap-start border border-blue-100/10 hover:border-teal-primary/50 transition-all group"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                </div>
                <div className="p-8">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-text-dark mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">{service.shortDescription}</p>
                  <button 
                    onClick={() => openComparer(service.id as InsuranceType)}
                    className="w-full bg-teal-primary/10 hover:bg-teal-primary text-teal-primary hover:text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>Compare Plans</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-text-dark mb-6">Why Choose Guardians?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-xl leading-relaxed">We stand out by providing more than just a policy; we provide a promise of security and local expertise.</p>
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Local Expertise', desc: '100% Lebanese-owned with deep understanding of local market risks and regulations.', icon: <MapPin className="w-10 h-10 text-teal-primary" /> },
              { title: '24/7 Assistance', desc: 'Always available for emergency support and claim inquiries, anytime, anywhere.', icon: <PhoneCall className="w-10 h-10 text-teal-primary" /> },
              { title: 'Fast Settlements', desc: 'We pride ourselves on the fastest claim settlement times in the industry.', icon: <Zap className="w-10 h-10 text-teal-primary" /> }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 hover:border-teal-primary/30 transition-all shadow-xl"
              >
                <div className="mb-8">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-text-dark mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-steel-blue rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-blue-100/10">
            <div className="lg:w-1/2 p-12 lg:p-20">
              <h2 className="text-4xl font-black text-white mb-4">Request a Call</h2>
              <p className="text-blue-100 mb-10 text-lg">Leave your details and our experts will contact you within 2 hours for a personalized consultation.</p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Full Name</label>
                    <input type="text" className="w-full bg-deep-blue/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Phone Number</label>
                    <input type="tel" className="w-full bg-deep-blue/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all" placeholder="+961" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Insurance Type</label>
                  <select className="w-full bg-deep-blue/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all appearance-none">
                    <option>Select an option</option>
                    <option>Car Insurance</option>
                    <option>Medical Insurance</option>
                    <option>Life Insurance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 uppercase tracking-widest mb-3">Message</label>
                  <textarea rows={4} className="w-full bg-deep-blue/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-teal-primary hover:bg-teal-primary/90 text-white font-black py-5 rounded-xl transition-all shadow-xl text-lg uppercase tracking-widest">
                  Submit Request
                </button>
              </form>
            </div>
            <div className="lg:w-1/2 h-80 lg:h-auto relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106037.28479528642!2d35.4116039!3d33.889212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a787%3A0x7a3b8474f970751b!2sBeirut%2C%20Lebanon!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                className="w-full h-full border-0 grayscale opacity-40 hover:opacity-100 transition-opacity"
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-r from-steel-blue to-transparent pointer-events-none hidden lg:block"></div>
            </div>
          </div>
        </div>
      </section>

      <PlanComparer 
        isOpen={isComparerOpen} 
        onClose={() => setIsComparerOpen(false)} 
        initialType={initialComparerType}
      />
    </div>
  );
};

export default Home;
