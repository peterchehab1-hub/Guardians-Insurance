import React, { useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../src/lib/firebase';
import { seedInitialData } from '../src/lib/seed';
import { useAuth } from '../src/contexts/AuthContext.tsx';
import { motion } from 'motion/react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  ShieldCheck,
  Plus,
  Database,
  Sparkles
} from 'lucide-react';
import { ClientsView } from './ClientsList';
import { ServicesView } from './PoliciesList';
import { PaymentsView } from './PaymentsList';
import { AIAssistant } from '../src/components/AIAssistant';

const DashboardHome: React.FC = () => {
  const [seeding, setSeeding] = React.useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const result = await seedInitialData();
      if (result) {
        alert('Data initialization complete. Services and test client added!');
      } else {
        alert('Initial data already exists.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to initialize data. Check console for errors.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button 
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 transition-all"
        >
          <Database className="w-4 h-4" />
          <span>{seeding ? 'Seeding...' : 'Seed Initial Services'}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Clients', value: '0', icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
          { label: 'Active Policies', value: '0', icon: <ShieldCheck className="w-6 h-6" />, color: 'bg-green-500' },
          { label: 'Pending Payments', value: '0', icon: <CreditCard className="w-6 h-6" />, color: 'bg-yellow-500' },
          { label: 'Total Revenue', value: '$0', icon: <FileText className="w-6 h-6" />, color: 'bg-purple-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-text-dark">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-2xl font-black mb-6">Recent Activity</h2>
        <div className="text-gray-400 text-center py-12 italic">
          No activity recorded yet. Start by adding your first client.
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showGlobalAdd, setShowGlobalAdd] = React.useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login?role=admin');
    }
    // If a client tries to access admin dashboard, send them to client dashboard
    if (!loading && profile && profile.role === 'client') {
      navigate('/client-dashboard');
    }
  }, [user, profile, loading, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-teal-primary/30 border-t-teal-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { label: 'Clients', icon: <Users className="w-5 h-5" />, path: '/dashboard/clients' },
    { label: 'Services', icon: <ShieldCheck className="w-5 h-5" />, path: '/dashboard/policies' },
    { label: 'Payments', icon: <CreditCard className="w-5 h-5" />, path: '/dashboard/payments' },
    { label: 'AI Assistant', icon: <Sparkles className="w-5 h-5" />, path: '/dashboard/ai' },
    { label: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/dashboard/settings' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-[90vh] bg-gray-50">
      {/* Sidebar */}
      <aside className="lg:w-64 bg-steel-blue p-8 flex flex-col">
        <div className="mb-12">
          <p className="text-teal-primary font-black uppercase tracking-tighter text-xl">GUARDIANS</p>
          <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">Management Hub</p>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                  isActive 
                    ? 'bg-teal-primary text-white shadow-lg' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-primary/20 flex items-center justify-center text-teal-primary">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white text-xs font-bold truncate">{user.email}</p>
              <p className="text-white/40 text-[10px] font-medium uppercase">Active Session</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          key={location.pathname}
        >
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <p className="text-teal-primary text-xs font-black tracking-widest uppercase mb-1">Authenticated</p>
              <h1 className="text-4xl font-black text-text-dark">Admin Dashboard</h1>
            </div>
            <button 
              onClick={() => {
                if (location.pathname === '/dashboard/clients') {
                  const btn = document.getElementById('add-client-trigger');
                  if (btn) btn.click();
                } else if (location.pathname === '/dashboard/policies') {
                  const btn = document.getElementById('add-policy-trigger');
                  if (btn) btn.click();
                } else if (location.pathname === '/dashboard/payments') {
                  const btn = document.getElementById('add-payment-trigger');
                  if (btn) btn.click();
                } else {
                  alert('Quick add for this section coming soon!');
                }
              }}
              className="bg-teal-primary hover:bg-teal-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg transition-transform active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>
                {location.pathname === '/dashboard/clients' ? 'Add Client' : 
                 location.pathname === '/dashboard/policies' ? 'Add Service' :
                 location.pathname === '/dashboard/payments' ? 'Record Payment' :
                 'Create New Record'}
              </span>
            </button>
          </header>

          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="clients" element={<ClientsView />} />
            <Route path="policies" element={<ServicesView />} />
            <Route path="payments" element={<PaymentsView />} />
            <Route path="ai" element={<AIAssistant />} />
            <Route path="settings" element={<div className="bg-white p-20 rounded-[3rem] text-center italic text-gray-400">Settings section coming soon...</div>} />
          </Routes>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
