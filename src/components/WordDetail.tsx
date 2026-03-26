import React from 'react';
import { motion } from 'motion/react';
import { Word } from '../types';
import { useSettings } from '../context/SettingsContext';

interface WordDetailProps {
  word: Word;
  onClose: () => void;
}

const WordDetail: React.FC<WordDetailProps> = ({ word, onClose }) => {
  const { learningMode } = useSettings();
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/5 backdrop-blur-sm -z-10 h-screen translate-y-[-100%]"
        onClick={onClose}
      />

      <section className="w-full max-w-2xl bg-white rounded-t-[2rem] md:rounded-t-[2.5rem] shadow-2xl border-x border-t border-[#c1c6d4]/10 overflow-hidden">
        {/* Drag Handle */}
        <div className="w-full flex justify-center py-3 md:py-4 cursor-pointer" onClick={onClose}>
          <div className="w-10 md:w-12 h-1.5 bg-[#e2e2e2] rounded-full" />
        </div>

        <div className="px-4 md:px-8 pb-28 md:pb-32 pt-2 md:pt-4 max-h-[85vh] overflow-y-auto overscroll-contain">
          {/* Header Section */}
          <div className="flex flex-col gap-1.5 md:gap-2 mb-5 md:mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#1a1c1c]">{word.cree}</h2>
              <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#f3f3f3] flex items-center justify-center hover:bg-[#e8e8e8] transition-colors flex-shrink-0 ml-3 active:scale-90">
                <span className="material-symbols-outlined text-[#004e99] text-[20px] md:text-[24px]">volume_up</span>
              </button>
            </div>
            <span className="text-[#414752] font-medium text-sm md:text-lg italic tracking-wide">{word.phonetic}</span>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-4">
              <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-[#d6e3ff] text-[#00468a] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {word.wordClass.split(' ')[0]}
              </span>
              {word.tags.map((tag) => (
                <span key={tag} className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-[#ffdad2] text-[#8c1900] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Translation Section */}
          <div className="mb-6 md:mb-10">
            <h3 className="text-[10px] md:text-xs font-bold text-[#727783] uppercase tracking-widest mb-1.5 md:mb-3">Translation</h3>
            <p className="text-lg md:text-2xl font-semibold text-[#1a1c1c] leading-tight">{word.translation}</p>
          </div>

          {/* Example Sentences */}
          <div className="space-y-2.5 md:space-y-4 mb-6 md:mb-10">
            <h3 className="text-[10px] md:text-xs font-bold text-[#727783] uppercase tracking-widest mb-1.5 md:mb-3">Example Sentences</h3>
            {word.examples.map((example, idx) => (
              <div key={idx} className="p-3.5 md:p-6 bg-[#f3f3f3] rounded-xl border-none">
                <p className="text-sm md:text-lg font-bold text-[#004e99] mb-0.5 md:mb-2">{example.cree}</p>
                <p className="text-xs md:text-base text-[#414752]">{example.english}</p>
              </div>
            ))}
          </div>

          {/* Usage Note */}
          {word.usageNote && (
            <div className="mb-6 md:mb-10">
              <h3 className="text-[10px] md:text-xs font-bold text-[#727783] uppercase tracking-widest mb-1.5 md:mb-3">Usage Note</h3>
              <div className="flex gap-2.5 md:gap-4 items-start p-3.5 md:p-4 bg-[#eeeeee]/50 rounded-lg">
                <span className="material-symbols-outlined text-[#b22200] text-[18px] md:text-[24px] flex-shrink-0 mt-0.5">info</span>
                <p className="text-[#414752] text-xs md:text-sm leading-relaxed">{word.usageNote}</p>
              </div>
            </div>
          )}

          {/* Advanced Toggle & Reveal */}
          {learningMode === 'expert' && (
          <div className="pt-4 md:pt-8 border-t border-[#c1c6d4]/20">
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <span className="material-symbols-outlined text-[#727783] text-[18px] md:text-[24px]">psychology</span>
              <span className="font-bold text-[#1a1c1c] text-xs md:text-base">Advanced Linguistic Data</span>
            </div>

            {/* Morphological Grid */}
            <div className="grid grid-cols-2 gap-2.5 md:gap-4">
              <div className="p-3 md:p-4 bg-white border border-[#c1c6d4]/30 rounded-xl">
                <span className="text-[9px] md:text-[10px] font-bold text-[#727783] uppercase">Prefix</span>
                <p className="font-mono text-xs md:text-sm text-[#1a1c1c]">{word.linguisticAnalysis.prefix || 'None'}</p>
              </div>
              <div className="p-3 md:p-4 bg-white border border-[#c1c6d4]/30 rounded-xl">
                <span className="text-[9px] md:text-[10px] font-bold text-[#727783] uppercase">Root</span>
                <p className="font-mono text-xs md:text-sm text-[#1a1c1c]">{word.linguisticAnalysis.root}</p>
              </div>
              <div className="p-3 md:p-4 bg-white border border-[#c1c6d4]/30 rounded-xl">
                <span className="text-[9px] md:text-[10px] font-bold text-[#727783] uppercase">Suffix</span>
                <p className="font-mono text-xs md:text-sm text-[#1a1c1c]">{word.linguisticAnalysis.suffix || 'None'}</p>
              </div>
              <div className="p-3 md:p-4 bg-white border border-[#c1c6d4]/30 rounded-xl">
                <span className="text-[9px] md:text-[10px] font-bold text-[#727783] uppercase">Aspect</span>
                <p className="font-mono text-xs md:text-sm text-[#1a1c1c]">{word.linguisticAnalysis.aspect || 'None'}</p>
              </div>
            </div>

            {/* Flag Button */}
            <button className="mt-6 md:mt-8 w-full flex items-center justify-center gap-2 py-3 md:py-4 rounded-full bg-[#e8e8e8] text-[#414752] hover:bg-[#e2e2e2] transition-colors active:scale-95 duration-200">
              <span className="material-symbols-outlined text-xs md:text-sm">flag</span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Report Linguistic Error</span>
            </button>
          </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default WordDetail;
