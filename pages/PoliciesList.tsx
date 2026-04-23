import React, { useState, useEffect } from 'react';
import { Plus, Search, ShieldCheck, Calendar, FileText, X, Loader2, CheckCircle2, User, ExternalLink, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceService } from '../src/services/insuranceService';

export const ServicesView: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await insuranceService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await insuranceService.deleteService(id);
        fetchServices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search services by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all shadow-sm"
          />
        </div>
        <button 
          id="add-policy-trigger"
          onClick={() => setShowAddModal(true)}
          className="hidden"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 translate-y-4">
            <Loader2 className="w-10 h-10 text-teal-primary animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 italic text-gray-400">
            {searchTerm ? 'No services match your search.' : 'No services found. Add your first insurance product.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Service Title</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-teal-primary/10 rounded-xl overflow-hidden flex items-center justify-center text-xl">
                          {service.imageUrl || service.image ? (
                            <img src={service.imageUrl || service.image} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <span>{service.icon || '🛡️'}</span>
                          )}
                        </div>
                        <span className="font-bold text-text-dark">{service.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      <p className="max-w-md line-clamp-2">{service.shortDescription}</p>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                       <button 
                        onClick={() => handleDelete(service.id)}
                        className="text-red-400 font-bold text-[10px] uppercase tracking-widest hover:bg-red-50 px-3 py-2 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <AddServiceModal 
            onClose={() => setShowAddModal(false)} 
            onSuccess={() => {
              setShowAddModal(false);
              fetchServices();
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddServiceModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'General',
    icon: '🛡️'
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await insuranceService.createService(formData, imageFile || undefined);
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to add service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 lg:p-12 relative z-10 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-all">
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-text-dark mb-2">Service Created!</h2>
            <p className="text-gray-500">Your new insurance product is now live.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-text-dark mb-2">Create New Service</h2>
              <p className="text-gray-500">Define a new insurance product for your clients.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Service Picture</label>
                <div className="flex items-center space-x-6">
                  <div className="w-32 h-32 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-300 group-hover:text-teal-primary transition-colors" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-text-dark mb-1">Upload a high-quality photo</p>
                    <p className="text-xs text-gray-400 leading-relaxed">This image will appear on the main services grid. Recommended: 800x600px.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Service Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="Premium Car Insurance" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Detailed information about coverage..." 
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({...formData, fullDescription: e.target.value, shortDescription: e.target.value.substring(0, 100) + (e.target.value.length > 100 ? '...' : '')})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium resize-none" 
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  disabled={loading}
                  className="flex-[2] bg-teal-primary hover:bg-teal-primary/90 text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 uppercase tracking-widest"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span>Save Service</span>
                      <Plus className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};
