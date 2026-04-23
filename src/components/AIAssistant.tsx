import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { aiService } from '../services/aiService';

export const AIAssistant: React.FC<{ dataSummary?: string }> = ({ dataSummary = "General insurance agency statistics." }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const result = await aiService.dashboardAssistant(userMsg, dataSummary);
    setLoading(false);
    setMessages(prev => [...prev, { role: 'ai', text: result }]);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col h-[600px] overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-teal-primary/10 text-teal-primary rounded-2xl flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-text-dark">Management Assistant</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dashboard Brain</p>
          </div>
        </div>
      </div>

      <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-gray-50/30">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <Bot className="w-10 h-10" />
            </div>
            <div>
              <p className="text-gray-500 font-bold">How can I help you manage Guardians today?</p>
              <p className="text-xs text-gray-400 max-w-xs mt-2 italic">I can analyze client trends, help draft emails, or explain dashboard metrics.</p>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-teal-primary text-white rounded-tr-none shadow-lg' 
                : 'bg-white text-text-dark border border-gray-100 rounded-tl-none shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 rounded-tl-none">
              <Loader2 className="w-5 h-5 animate-spin text-teal-primary" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-6 bg-white border-t border-gray-100 flex items-center space-x-4">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your business data..."
          className="flex-grow bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all font-medium"
        />
        <button 
          disabled={loading}
          className="w-14 h-14 bg-steel-blue text-white rounded-2xl flex items-center justify-center hover:bg-steel-blue/90 transition-all shadow-xl active:scale-95"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};
