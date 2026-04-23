import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { useAuth } from '../src/contexts/AuthContext.tsx';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  LogOut, 
  Calendar, 
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !profile) {
      navigate('/login?role=client');
    }

    const fetchData = async () => {
      if (!profile) return;
      setLoading(true);
      try {
        // First priority: Policies collection
        const policiesQuery = query(
          collection(db, 'policies'), 
          where('clientEmail', '==', profile.email || '')
        );
        const policySnap = await getDocs(policiesQuery);
        let fetchedPolicies: any[] = policySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Second priority: If no policies found in collection, check the profile fields
        if (fetchedPolicies.length === 0 && profile.policyType) {
          fetchedPolicies = [{
            id: 'legacy-policy',
            type: profile.policyType,
            policyNumber: profile.policyNumber || 'G-PENDING',
            status: 'active',
            premium: profile.premium || 'Quote Pending',
            endDate: (profile as any).endDate || new Date(Date.now() + 31536000000).toISOString() // 1 year default
          }];
        }

        setPolicies(fetchedPolicies);

        // Fetch payments for these policies
        if (fetchedPolicies.length > 0) {
          const policyIds = fetchedPolicies.map(p => p.id);
          // Firestore 'in' query has a limit of 10, but good for demo
          const paymentsQuery = query(
            collection(db, 'payments'),
            where('policyId', 'in', policyIds.slice(0, 10)),
            orderBy('date', 'desc')
          );
          const paymentSnap = await getDocs(paymentsQuery);
          setPayments(paymentSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }
      } catch (err) {
        console.error("Error fetching client data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-teal-primary/30 border-t-teal-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Client Header */}
      <nav className="bg-steel-blue text-white p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-primary p-2 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black tracking-tight text-xl">MY GUARDIANS</p>
              <p className="text-[10px] text-teal-primary font-bold uppercase tracking-widest">Client Portal</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-grow w-full">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-text-dark mb-2">Welcome back,</h1>
          <p className="text-gray-500 font-medium">{profile?.name || profile?.email || 'Valued Client'}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Policies */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-text-dark">My Active Policies</h2>
                <span className="bg-teal-primary/10 text-teal-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {policies.length} Active
                </span>
              </div>

              {policies.length === 0 ? (
                <div className="bg-white p-12 rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">You don't have any active policies yet.</p>
                  <p className="text-gray-400 text-sm">Contact your agent to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {policies.map((policy) => (
                    <motion.div 
                      key={policy.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:border-teal-primary/30 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-teal-primary/10 rounded-2xl text-teal-primary group-hover:bg-teal-primary group-hover:text-white transition-colors">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                          {policy.policyNumber}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-text-dark mb-1">{policy.type || 'Insurance Policy'}</h3>
                      <p className="text-sm text-gray-400 font-medium mb-6">Valid until {new Date(policy.endDate).toLocaleDateString()}</p>
                      
                      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-lg font-black text-teal-primary">${policy.premium}</span>
                        <div className="flex items-center text-xs font-bold text-green-500 uppercase tracking-widest">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span>Active</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-black text-text-dark mb-6">Financial Overview</h2>
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2 p-8 bg-steel-blue rounded-3xl text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Upcoming Payment</p>
                      <p className="text-3xl font-black mb-6">$120.00</p>
                      <div className="flex items-center text-sm font-bold">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Due May 15, 2024</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-primary/20 rounded-full blur-3xl"></div>
                  </div>
                  <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Paid to date</p>
                      <p className="text-xl font-bold text-text-dark">$840.00</p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Installments left</p>
                      <p className="text-xl font-bold text-text-dark">4 / 12</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar: Recent Payments & Action */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-black text-text-dark mb-6">Recent Payments</h2>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 divide-y divide-gray-50">
                {payments.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 italic text-sm">No payment history found.</p>
                ) : (
                  payments.map((payment) => (
                    <div key={payment.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-xl ${payment.status === 'paid' ? 'bg-green-50 text-green-500' : 'bg-yellow-50 text-yellow-500'}`}>
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-dark">${payment.amount}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(payment.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${payment.status === 'paid' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'}`}>
                        {payment.status}
                      </span>
                    </div>
                  ))
                )}
                
                {/* Demo Payment */}
                <div className="py-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-xl bg-green-50 text-green-500">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-dark">$120.00</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">April 15, 2024</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg text-green-600 bg-green-50">
                    Paid
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-teal-primary p-8 rounded-[2.5rem] shadow-xl text-white">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-2">Need Help?</h3>
              <p className="text-white/80 text-sm mb-8 leading-relaxed">Our support team is available 24/7 for any questions regarding your policies or payments.</p>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full bg-white text-teal-primary py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-teal-primary/20 transition-all active:scale-95"
              >
                Contact Support
              </button>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-white p-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest tracking-widest">
          &copy; {new Date().getFullYear()} Guardians Insurance Client Portal. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default ClientDashboard;
