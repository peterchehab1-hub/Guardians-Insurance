import React, { useState, useEffect } from 'react';
import { Plus, Search, CreditCard, Calendar, FileText, X, Loader2, CheckCircle2, User, Hash, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { insuranceService } from '../src/services/insuranceService';

export const PaymentsView: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await insuranceService.getAllPayments();
      setPayments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter(p => 
    p.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.policyNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'bg-green-50 text-green-600';
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'overdue': return 'bg-red-50 text-red-600';
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
            placeholder="Search payments by client, policy number or status..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all shadow-sm"
          />
        </div>
        <button 
          id="add-payment-trigger"
          onClick={() => setShowAddModal(true)}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Received', value: `$${payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount), 0)}`, color: 'bg-green-500' },
          { label: 'Pending Collections', value: `$${payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + Number(p.amount), 0)}`, color: 'bg-yellow-500' },
          { label: 'Overdue Amount', value: `$${payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + Number(p.amount), 0)}`, color: 'bg-red-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-text-dark">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 translate-y-4">
            <Loader2 className="w-10 h-10 text-teal-primary animate-spin mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Payments...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-20 italic text-gray-400">
            {searchTerm ? 'No payments match your search.' : 'No payment records found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Info</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Policy Reference</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-teal-primary/10 rounded-xl text-teal-primary">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <span className="font-black text-text-dark text-lg">${payment.amount}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-sm text-gray-600 font-medium">
                        <User className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>{payment.clientName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <Hash className="w-3 h-3 mr-2" />
                        <span>{payment.policyNumber}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400" />
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
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
          <AddPaymentModal 
            onClose={() => setShowAddModal(false)} 
            onSuccess={() => {
              setShowAddModal(false);
              fetchPayments();
            }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AddPaymentModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  const [policies, setPolicies] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    policyId: '',
    policyNumber: '',
    clientId: '',
    clientName: '',
    amount: '',
    status: 'paid',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      const allPolicies = await insuranceService.getAllPolicies();
      setPolicies(allPolicies);
    };
    fetchMetadata();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await insuranceService.createPayment(formData);
      setSuccess(true);
      setTimeout(onSuccess, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to record payment.');
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
        className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 lg:p-12 relative z-10"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-all">
          <X className="w-6 h-6" />
        </button>

        {success ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-text-dark mb-2">Payment Recorded!</h2>
            <p className="text-gray-500">The transaction has been successfully logged.</p>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-3xl font-black text-text-dark mb-2">Record Payment</h2>
              <p className="text-gray-500">Add a transaction record for a policy installment.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Active Policy</label>
                <select 
                  required
                  value={formData.policyId}
                  onChange={(e) => {
                    const policy = policies.find(p => p.id === e.target.value);
                    setFormData({
                      ...formData, 
                      policyId: e.target.value,
                      policyNumber: policy?.policyNumber || '',
                      clientId: policy?.clientId || '',
                      clientName: policy?.clientName || '',
                      amount: policy?.premium || '' // Pre-fill with premium or installment guess
                    });
                  }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-bold text-sm"
                >
                  <option value="">Choose a policy...</option>
                  {policies.map(p => (
                    <option key={p.id} value={p.id}>{p.policyNumber} - {p.clientName} ({p.type})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Amount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="number" 
                      placeholder="120" 
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-black text-lg" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Status</label>
                  <select 
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-bold text-sm"
                  >
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment Date</label>
                <input 
                  required
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
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
                      <span>Record Payment</span>
                      <DollarSign className="w-5 h-5" />
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
