
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Phone, Mail, Globe, Share2, MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-blue text-gray-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-6 h-6 text-teal-primary" />
              <span className="text-white text-xl font-black tracking-tighter">GUARDIANS</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Providing reliable protection since 2019. Lebanese-owned and committed to safeguarding your most valued assets with integrity and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-primary transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-teal-primary transition-colors"><Share2 className="w-5 h-5" /></a>
              <a href="#" className="hover:text-teal-primary transition-colors"><MessageSquare className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold mb-6 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-teal-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-teal-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-teal-primary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-teal-primary transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-teal-primary transition-colors opacity-50">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold mb-6 uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-teal-primary transition-colors">Car Insurance</Link></li>
              <li><Link to="/services" className="hover:text-teal-primary transition-colors">Home Insurance</Link></li>
              <li><Link to="/services" className="hover:text-teal-primary transition-colors">Medical Care</Link></li>
              <li><Link to="/services" className="hover:text-teal-primary transition-colors">Life Protection</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold mb-6 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-teal-primary shrink-0" />
                <span>(+961) 71971213</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-teal-primary shrink-0" />
                <span>peterchehab98@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>&copy; {new Date().getFullYear()} Guardians Insurance. All rights reserved. Lebanese Ministry of Economy Licensed.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
