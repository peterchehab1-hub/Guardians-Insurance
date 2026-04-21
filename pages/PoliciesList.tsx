import React, { useState, useEffect } from 'react';
import { Plus, Search, ShieldCheck, Calendar, FileText, X, Loader2, CheckCircle2, User, ExternalLink, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceService } from '../src/services/insuranceService';

export const PoliciesView: React.FC = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const data = await insuranceService.getAllPolicies();
      setPolicies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const filteredPolicies = policies.filter(p => 
    p.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-50 text-green-600';
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'expired': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search policies by number, client or insurance type..." 
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
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Policies...</p>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="text-center py-20 italic text-gray-400">
            {searchTerm ? 'No policies match your search.' : 'No policies found. Start by adding your first policy.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Policy Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Premium</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Validity</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPolicies.map((policy) => (
                  <tr key={policy.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-teal-primary/10 rounded-xl text-teal-primary">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-text-dark">{policy.type}</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{policy.policyNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-sm text-gray-600 font-medium">
                        <User className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>{policy.clientName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-teal-primary">${policy.premium}</span>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>{new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {policy.pdfUrl ? (
                        <a 
                          href={policy.pdfUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center text-teal-primary font-bold text-xs uppercase tracking-widest hover:underline px-4 py-2 hover:bg-teal-primary/5 rounded-lg transition-all"
                        >
                          <span>PDF</span>
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs italic">No PDF</span>
                      )}
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
          <AddPolicyModal 
            onClose={() => setShowAddModal(false)} 
            onSuccess={() => {
              setShowAddModal(false);
              fetchPolicies();
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddPolicyModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '', // Redundant but good for quick display
    clientEmail: '', // Needed for client dashboard filtering
    serviceId: '',
    type: 'Car Insurance',
    policyNumber: '',
    premium: '',
    status: 'active',
    startDate: '',
    endDate: ''
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      const [allClients, allServices] = await Promise.all([
        insuranceService.getAllClients(),
        insuranceService.getAllServices()
      ]);
      setClients(allClients);
      setServices(allServices);
    };
    fetchMetadata();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await insuranceService.createPolicy(formData, pdfFile || undefined);
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to add policy.');
    } finally {
      setLoading(false);
    }
  };

  const selectedClient = clients.find(c => c.id === formData.clientId);

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
            <h2 className="text-3xl font-black text-text-dark mb-2">Policy Created!</h2>
            <p className="text-gray-500">The policy has been successfully linked to the client.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-text-dark mb-2">Issue New Policy</h2>
              <p className="text-gray-500">Attach an insurance product to a client.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Client</label>
                  <select 
                    required
                    value={formData.clientId}
                    onChange={(e) => {
                      const client = clients.find(c => c.id === e.target.value);
                      setFormData({
                        ...formData, 
                        clientId: e.target.value,
                        clientName: client?.name || '',
                        clientEmail: client?.email || ''
                      });
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-bold text-sm"
                  >
                    <option value="">Choose a client...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Insurance Type</label>
                  <select 
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-bold text-sm"
                  >
                    <option value="Car Insurance">Car Insurance</option>
                    <option value="Medical Insurance">Medical Insurance</option>
                    <option value="Travel Insurance">Travel Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Home Insurance">Home Insurance</option>
                    <option value="Business Insurance">Business Insurance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Policy Number</label>
                  <input 
                    required
                    type="text" 
                    placeholder="POL-123456789" 
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({...formData, policyNumber: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Total Premium ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="1200" 
                    value={formData.premium}
                    onChange={(e) => setFormData({...formData, premium: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Start Date</label>
                  <input 
                    required
                    type="date" 
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">End Date</label>
                  <input 
                    required
                    type="date" 
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Policy PDF Document</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={(e) => e.target.files && setPdfFile(e.target.files[0])}
                    className="hidden" 
                    id="pdf-upload"
                  />
                  <label 
                    htmlFor="pdf-upload"
                    className="w-full flex items-center space-x-4 border-2 border-dashed border-gray-200 rounded-3xl p-6 bg-gray-50 hover:bg-gray-100 hover:border-teal-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="p-4 bg-white rounded-2xl shadow-sm text-gray-400 group-hover:text-teal-primary transition-colors">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-text-dark font-bold text-sm tracking-tight">
                        {pdfFile ? pdfFile.name : 'Upload Policy PDF'}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Click to browse files</p>
                    </div>
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
                      <span>Issue Policy</span>
                      <ShieldCheck className="w-5 h-5" />
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
