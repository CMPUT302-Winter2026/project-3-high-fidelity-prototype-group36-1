import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useVocabulary } from '../context/VocabularyContext';
import { useSettings } from '../context/SettingsContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Contribute: React.FC = () => {
  const navigate = useNavigate();
  const { submitSuggestion } = useVocabulary();
  const { learningMode } = useSettings();
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word) return;
    
    setIsSubmitting(true);
    try {
      await submitSuggestion({ word, description, category: 'general' });
      setSubmitted(true);
      setWord('');
      setDescription('');
    } catch (error) {
           // For now, fail silently or fallback
    } finally {
      setIsSubmitting(false);
    }
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-28 md:pb-32 w-full max-w-[800px]">
      {/* Top Bar */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-50 bg-[#f9f9f9]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-tighter text-2xl md:text-3xl text-[#1a1c1c] whitespace-nowrap flex items-center"
          >
            Contribute
            <span
              className={`inline-flex items-center gap-0.5 ml-2 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider align-middle transition-colors duration-300 ${
                learningMode === 'expert'
                  ? 'bg-[#fff3e0] text-[#e65100]'
                  : 'bg-[#d6e3ff] text-[#004e99]'
              }`}
            >
              <span className="material-symbols-outlined text-[10px] md:text-[12px] fill-1">
                {learningMode === 'expert' ? 'psychology' : 'school'}
              </span>
              {learningMode === 'expert' ? 'Expert' : 'Simple'}
            </span>
          </motion.h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mt-4 md:mt-12 mb-6 md:mb-12 space-y-2">
        <p className="text-[#414752] text-sm md:text-lg font-light leading-relaxed">
          Help us preserve and expand the Cree Language dictionary. Choose how you would like to contribute today.
        </p>
      </section>

      {/* Contribution Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-start">
        <button className="group flex flex-row md:flex-col items-center md:items-start text-left p-4 md:p-8 bg-white rounded-xl border border-[#c1c6d4]/20 hover:bg-[#f3f3f3] hover:shadow-lg transition-all duration-300 gap-4 md:gap-0">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#d6e3ff] rounded-xl md:mb-6 group-active:scale-95 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[#004e99] text-[20px] md:text-[24px]">add_comment</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-xl font-bold text-[#1a1c1c] mb-0.5 md:mb-2 tracking-tight">Suggest a Word</h3>
            <p className="text-[#414752] text-xs md:text-sm leading-relaxed">Add a new word, its pronunciation, or a regional variation to our database.</p>
          </div>
        </button>

        <button className="group flex flex-row md:flex-col items-center md:items-start text-left p-4 md:p-8 bg-white rounded-xl border border-[#c1c6d4]/20 hover:bg-[#f3f3f3] hover:shadow-lg transition-all duration-300 gap-4 md:gap-0 mt-0 md:mt-12">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#ffdad6] rounded-xl md:mb-6 group-active:scale-95 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px] md:text-[24px]">report_gmailerrorred</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-xl font-bold text-[#1a1c1c] mb-0.5 md:mb-2 tracking-tight">Report an Error</h3>
            <p className="text-[#414752] text-xs md:text-sm leading-relaxed">Notice a typo or a wrong definition? Help us maintain accuracy by reporting it.</p>
          </div>
        </button>

        <button className="group flex flex-row md:flex-col items-center md:items-start text-left p-4 md:p-8 bg-white rounded-xl border border-[#c1c6d4]/20 hover:bg-[#f3f3f3] hover:shadow-lg transition-all duration-300 gap-4 md:gap-0">
          <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#e8e8e8] rounded-xl md:mb-6 group-active:scale-95 transition-transform flex-shrink-0">
            <span className="material-symbols-outlined text-[#414752] text-[20px] md:text-[24px]">rate_review</span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-xl font-bold text-[#1a1c1c] mb-0.5 md:mb-2 tracking-tight">General Feedback</h3>
            <p className="text-[#414752] text-xs md:text-sm leading-relaxed">Share your thoughts on the app experience or suggest new features.</p>
          </div>
        </button>

        <div className="p-6 md:p-8 border border-dashed border-[#c1c6d4]/30 rounded-xl flex flex-col items-center justify-center text-center space-y-3 opacity-50 hidden md:flex">
          <span className="material-symbols-outlined text-4xl text-[#727783]">volunteer_activism</span>
          <p className="text-xs font-medium tracking-widest uppercase">Community Driven</p>
        </div>
      </div>

      {/* Quick Suggestion Form */}
      <section className="mt-8 md:mt-16 p-5 md:p-8 bg-[#f3f3f3] rounded-2xl md:rounded-3xl">
        <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#414752] mb-4 md:mb-6">Quick Suggestion</h2>
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label className="block text-[10px] md:text-xs font-semibold text-[#414752] mb-1.5 md:mb-2 px-1">WORD OR PHRASE</label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter Cree or English word..."
              required
              className="w-full bg-white border-0 ring-1 ring-[#c1c6d4]/20 rounded-xl py-3 md:py-4 px-4 md:px-5 focus:ring-[#004e99] focus:ring-2 transition-all outline-none text-sm md:text-base"
            />
          </div>
          <div>
            <label className="block text-[10px] md:text-xs font-semibold text-[#414752] mb-1.5 md:mb-2 px-1">DESCRIPTION (OPTIONAL)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Additional context..."
              rows={3}
              className="w-full bg-white border-0 ring-1 ring-[#c1c6d4]/20 rounded-xl py-3 md:py-4 px-4 md:px-5 focus:ring-[#004e99] focus:ring-2 transition-all outline-none resize-none text-sm md:text-base"
            />
          </div>
          
          <div className="pt-2 md:pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !word}
              className={cn(
                "w-full py-3 md:py-4 px-8 rounded-xl font-bold tracking-tight flex items-center justify-center gap-2 transition-all shadow-lg text-sm md:text-base",
                submitted ? "bg-green-500 text-white" : "bg-[#004e99] text-white shadow-[#004e99]/10 active:scale-95",
                (isSubmitting || !word) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
              ) : submitted ? (
                <>
                  Success!
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </>
              ) : (
                <>
                  Submit Contribution
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] md:text-xs text-[#414752] mt-3 font-medium">Thank you for helping the Vocabulary Explorer community.</p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contribute;
