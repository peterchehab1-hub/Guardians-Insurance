
import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Plus, X, Sparkles, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { aiService } from '../src/services/aiService';

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiHistory, setAiHistory] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const phoneNumber = '(+961) 71971213';
  const cleanNumber = phoneNumber.replace(/\s/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showAIChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-4 w-80 sm:w-96 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]"
          >
            <div className="bg-steel-blue p-6 flex justify-between items-center text-white">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-primary/20 rounded-lg flex items-center justify-center text-teal-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Insurance Expert</p>
                  <p className="text-[10px] text-white/40 uppercase font-bold">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {aiHistory.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-400 text-sm italic">Hello! I'm your AI insurance expert. How can I protect you today?</p>
                </div>
              )}
              {aiHistory.map((h, i) => (
                <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                    h.role === 'user' 
                      ? 'bg-teal-primary text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-text-dark border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    {h.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-teal-primary" />
                  </div>
                </div>
              )}
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!aiMessage.trim() || aiLoading) return;
                const msg = aiMessage;
                setAiMessage('');
                setAiHistory(prev => [...prev, {role: 'user', text: msg}]);
                setAiLoading(true);
                const reply = await aiService.chatWithAI(msg);
                setAiLoading(false);
                setAiHistory(prev => [...prev, {role: 'ai', text: reply}]);
              }}
              className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2"
            >
              <input 
                type="text" 
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="Ask me anything about insurance..."
                className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all"
              />
              <button 
                disabled={aiLoading}
                className="p-3 bg-teal-primary text-white rounded-xl hover:bg-teal-primary/90 transition-all active:scale-95 shadow-md flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="absolute bottom-16 right-0 mb-2 w-48 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100"
          >
            <a
              href={`tel:${cleanNumber}`}
              className="flex items-center px-4 py-3 hover:bg-teal-primary/10 text-text-dark border-b border-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 mr-3 text-teal-primary" />
              <span className="text-sm font-medium">Call Us</span>
            </a>
            <a
              href={`https://wa.me/${cleanNumber.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 hover:bg-teal-primary/10 text-text-dark border-b border-gray-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-3 text-teal-primary" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a
              href={`sms:${cleanNumber}`}
              className="flex items-center px-4 py-3 hover:bg-teal-primary/10 text-text-dark border-b border-gray-50 transition-colors"
            >
              <Mail className="w-4 h-4 mr-3 text-teal-primary" />
              <span className="text-sm font-medium">SMS</span>
            </a>
            <button
              onClick={() => {
                setShowAIChat(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 hover:bg-teal-primary/10 text-teal-primary transition-colors group"
            >
              <Sparkles className="w-4 h-4 mr-3 group-hover:animate-pulse" />
              <span className="text-sm font-bold">Chat with AI</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-teal-primary hover:bg-teal-primary/90 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 active:scale-95 z-50 focus:outline-none"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </motion.div>
      </button>
    </div>
  );
};

export default FloatingActionButton;
