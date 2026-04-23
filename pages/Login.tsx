import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../src/lib/firebase';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, Shield, User } from 'lucide-react';
import { useAuth } from '../src/contexts/AuthContext.tsx';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setProfile } = useAuth();
  const roleParam = searchParams.get('role') || 'client'; // Default to client

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (roleParam === 'client') {
        // Custom Logic: Check client collection for name=email and phone=password
        const q = query(
          collection(db, 'clients'), 
          where('name', '==', email), 
          where('phone', '==', password)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const clientData = querySnapshot.docs[0].data();
          setProfile({
            uid: querySnapshot.docs[0].id,
            email: clientData.email || `${clientData.name}@client.com`,
            role: 'client',
            ...clientData
          } as any);
          navigate('/client-dashboard');
          return;
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user profile to verify role
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === 'client') {
          navigate('/client-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        // If no profile, we can't be sure, but let's try to infer from roleParam for now
        // This is a fallback if user doc hasn't been created yet
        if (roleParam === 'admin' || roleParam === 'staff') {
          navigate('/dashboard');
        } else {
          navigate('/client-dashboard');
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isClient = roleParam === 'client';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-bg-light px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${isClient ? 'bg-teal-primary/10 text-teal-primary' : 'bg-steel-blue/10 text-steel-blue'}`}>
            {isClient ? <User className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
          </div>
          <h1 className="text-3xl font-black text-text-dark mb-2">
            {isClient ? 'Client Login' : 'Admin Login'}
          </h1>
          <p className="text-gray-500">
            {isClient 
              ? 'Access your policies and track payments' 
              : 'Access the Guardians management system'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              {isClient ? 'Full Name' : 'Email Address'}
            </label>
            <div className="relative">
              {isClient ? (
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              ) : (
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              <input 
                id="login-identifier"
                name="identifier"
                required
                type={isClient ? 'text' : 'email'} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isClient ? 'e.g. Peter' : 'admin@guardians.com'} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                autoComplete={isClient ? 'username' : 'email'}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3" htmlFor="login-password">
              {isClient ? 'Phone Number' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                id="login-password"
                name="password"
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isClient ? 'e.g. 71971213' : '••••••••'} 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-14 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium" 
                autoComplete="current-password"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-teal-primary hover:bg-teal-primary/90 text-white font-black py-5 rounded-xl transition-all shadow-xl text-lg uppercase tracking-widest flex items-center justify-center space-x-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
