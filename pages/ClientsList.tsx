import React, { useState, useEffect } from 'react';
import { Plus, Search, User, Phone, Mail, MapPin, Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceService } from '../src/services/insuranceService';

export const ClientsView: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await insuranceService.getAllClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search clients by name, email or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all shadow-sm"
          />
        </div>
        <button 
          id="add-client-trigger"
          onClick={() => setShowAddModal(true)}
          className="hidden"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 translate-y-4">
            <Loader2 className="w-10 h-10 text-teal-primary animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-20 italic text-gray-400">
            {searchTerm ? 'No clients match your search.' : 'No clients found. Start by adding your first client.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Address</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Added On</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-primary/10 text-teal-primary flex items-center justify-center font-bold">
                          {client.name?.charAt(0)}
                        </div>
                        <span className="font-bold text-text-dark">{client.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="w-3.5 h-3.5 mr-2 text-gray-400" />
                          <span>{client.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-3.5 h-3.5 mr-2 text-gray-400" />
                          <span>{client.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span className="max-w-[200px] truncate">{client.address || 'Lebanon'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      {client.createdAt ? new Date(client.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-teal-primary font-bold text-xs uppercase tracking-widest hover:underline px-4 py-2 hover:bg-teal-primary/5 rounded-lg transition-all">
                        View Profile
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
          <AddClientModal 
            onClose={() => setShowAddModal(false)} 
            onSuccess={() => {
              setShowAddModal(false);
              fetchClients();
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddClientModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [idFiles, setIdFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await insuranceService.createClient(formData, idFiles);
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to add client. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIdFiles(Array.from(e.target.files));
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
            <h2 className="text-3xl font-black text-text-dark mb-2">Client Added!</h2>
            <p className="text-gray-500">Perfect, the new client has been saved.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-text-dark mb-2">Add New Client</h2>
              <p className="text-gray-500">Enter client details and upload documents.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Jean Khoury" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+961 XX XXX XXX" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Home Address</label>
                <input 
                  type="text" 
                  placeholder="Street, City, Lebanon" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Identity Documents (ID/Passport)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleFileChange}
                    className="hidden" 
                    id="id-upload"
                  />
                  <label 
                    htmlFor="id-upload"
                    className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl py-10 bg-gray-50 hover:bg-gray-100 hover:border-teal-primary/30 transition-all cursor-pointer group"
                  >
                    <Upload className="w-8 h-8 text-gray-300 group-hover:text-teal-primary mb-4 transition-colors" />
                    <p className="text-gray-400 font-bold text-sm tracking-tight">
                      {idFiles.length > 0 ? `${idFiles.length} files selected` : 'Click to upload or drag & drop'}
                    </p>
                    <p className="text-[10px] font-medium text-gray-300 uppercase tracking-widest mt-2">Max 5MB per file</p>
                  </label>
                </div>
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
                      <span>Save Client</span>
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
