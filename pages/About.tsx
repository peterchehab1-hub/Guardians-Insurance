
import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Users, Clock, Target, Briefcase, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS, PARTNERS } from '../constants.tsx';
import { Quote } from 'lucide-react';
import heritageImg from '../src/assets/images/about-heritage.png';

const About: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-steel-blue py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-primary rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Leading Lebanon with integrity and a commitment to local protection since 2019.
          </motion.p>
        </div>
      </section>

      {/* Story & Heritage */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-teal-primary/10 text-teal-primary text-xs font-black tracking-widest uppercase mb-6 border border-teal-primary/20">
                <Shield className="w-4 h-4 mr-2" />
                <span>Our Heritage</span>
              </div>
              <h2 className="text-4xl font-black text-text-dark mb-8">Proudly Lebanese-Owned</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Founded in 2019 in the heart of Beirut, Guardians Insurance was established to bridge the gap between corporate insurance and local needs. We understand the unique challenges faced by Lebanese citizens and businesses.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-10">
                We operate on the principle that insurance should be personal, transparent, and absolutely reliable when the unexpected happens. Our mission is to provide a safety net that allows our community to thrive.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="relative">
                <img src={heritageImg} alt="Lebanon Landscape" className="rounded-[3rem] shadow-2xl border border-white/5" />
                <div className="absolute -bottom-6 -right-6 bg-teal-primary p-8 rounded-3xl shadow-2xl hidden lg:block">
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Expanded What is Insurance Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-steel-blue p-16 rounded-[3rem] mb-24 text-center border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-primary to-transparent"></div>
            <h2 className="text-4xl font-black text-white mb-8">What is Insurance?</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-blue-100 text-xl leading-relaxed">
                Insurance is more than just a policy; it's your financial safety net in an unpredictable world. It works on the principle of risk sharing—where many contribute to a pool that protects any individual when disaster strikes.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed italic">
                Whether it's protecting your home from fire, ensuring your business's continuity, or securing your family's health, insurance provides the liquid capital needed to rebuild and recover without draining your life savings. At Guardians, we simplify this process, offering clear contracts that prioritize your peace of mind.
              </p>
            </div>
          </motion.div>

          {/* Feature Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[
              { t: 'Expert Advice', d: 'Personalized risk assessment by industry veterans.', icon: <Users className="w-8 h-8" /> },
              { t: 'Top Insurers', d: 'Partnered with the strongest names in Lebanon.', icon: <Briefcase className="w-8 h-8" /> },
              { t: '24/7 Support', d: 'Always available when you need us most.', icon: <Clock className="w-8 h-8" /> },
              { t: 'Tailored Solutions', d: 'Plans built specifically for your lifestyle.', icon: <Target className="w-8 h-8" /> }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 hover:border-teal-primary/30 transition-all text-center group hover:-translate-y-2 shadow-xl"
              >
                <div className="text-teal-primary mb-6 flex justify-center transform group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-xl font-black text-text-dark mb-4">{card.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.d}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Guardians Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-text-dark mb-4">Why Choose Guardians?</h2>
              <p className="text-gray-500 text-lg">Four reasons why we are Lebanon's trusted protection partner.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { title: 'Local Expertise', desc: 'We are deeply rooted in the Lebanese market, understanding the local economy and challenges better than any global corporation.' },
                { title: 'Claims Excellence', desc: 'Our reputation is built on how we handle the "worst-case scenario". We process claims with speed, transparency, and absolute empathy.' },
                { title: 'Transparency First', desc: 'No hidden clauses. No confusing jargon. We believe you should always know exactly what you are paying for and what is covered.' },
                { title: 'Long-term Partnerships', desc: 'We don\'t just sell policies; we build relationships. Most of our clients have been with us since our very first year in 2019.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 rounded-[2.5rem] border-l-8 border-teal-primary shadow-lg flex items-start space-x-6"
                >
                  <div className="w-12 h-12 bg-teal-primary/10 rounded-full flex items-center justify-center text-teal-primary shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-text-dark mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed italic">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl font-black text-white mb-4">Strategic Partners</h2>
          <p className="text-blue-100 text-lg">We work with the strongest names in the industry to ensure your total safety.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {PARTNERS.map((partner, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-teal-primary/30 transition-all group flex items-center justify-center grayscale hover:grayscale-0"
              >
                <img src={partner.logo} alt={partner.name} className="max-h-10 w-auto opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-5xl font-black text-text-dark mb-4">Testimonies from Clients</h2>
          <p className="text-gray-500 text-lg">Real stories of protection and trust from the Guardians community.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 flex flex-col relative group hover:-translate-y-2 transition-all"
              >
                <div className="absolute -top-6 left-12 w-12 h-12 bg-teal-primary text-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                  <Quote className="w-6 h-6" />
                </div>
                <p className="text-gray-500 text-lg leading-relaxed italic mb-10 flex-grow pt-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-6 border-t border-gray-100 pt-8">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                  <div>
                    <h4 className="text-text-dark font-black text-lg leading-tight mb-1">{testimonial.name}</h4>
                    <p className="text-teal-primary text-[10px] font-bold uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
