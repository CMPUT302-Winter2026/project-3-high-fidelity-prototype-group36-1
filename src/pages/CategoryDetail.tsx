import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVocabulary } from '../context/VocabularyContext';
import WordDetail from '../components/WordDetail';
import { Word } from '../types';
import { useSettings } from '../context/SettingsContext';

const CategoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const { vocabulary, isLoading, savedWordIds, toggleSavedWord } = useVocabulary();
  const { learningMode } = useSettings();
  
  const categoryWords = vocabulary.filter(w => w.category.toLowerCase() === id?.toLowerCase());
  const wordOfTheDay = categoryWords[0] || (vocabulary.length > 0 ? vocabulary[0] : null);

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-28 md:pb-32 w-full max-w-[800px]">
      {/* Top Bar */}
      <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-50 bg-[#f9f9f9]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 hover:bg-[#e8e8e8] transition-colors active:scale-95 duration-150 rounded-full flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[#004e99]">arrow_back</span>
          </button>
          <motion.h1
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold tracking-tighter text-2xl md:text-3xl text-[#1a1c1c] capitalize whitespace-nowrap flex items-center"
          >
            {id}
            <span
              className={`inline-flex items-center gap-0.5 ml-2 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider align-middle transition-colors duration-300 ${
                learningMode === 'expert'
                  ? 'bg-[#fff3e0] text-[#e65100]'
                  : 'bg-[#d6e3ff] text-[#004e99]'
              }`}
            >
              <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-1">
                {learningMode === 'expert' ? 'science' : 'school'}
              </span>
              {learningMode === 'expert' ? 'Expert' : 'Simple'}
            </span>
          </motion.h1>
        </div>
        <button className="p-1.5 hover:bg-[#e8e8e8] transition-colors active:scale-95 duration-150 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[#414752]">search</span>
        </button>
      </header>

      {/* Header Editorial Section */}
      <section className="mb-5 md:mb-12">
        <p className="text-[#414752] text-[10px] md:text-xs uppercase tracking-widest font-semibold mb-1 md:mb-2">Category Detail</p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#1a1c1c] mb-3 md:mb-4 capitalize">{id?.replace('-', ' ')}</h2>
        <div className="w-16 md:w-24 h-1 bg-[#004e99] mb-4 md:mb-8"></div>
        <p className="text-[#414752] text-sm md:text-base leading-relaxed max-w-xl">
          Explore the descriptive language of the elements. In Cree, weather terms often function as verbs, describing the state of the world as it unfolds around us.
        </p>
      </section>

      {/* Word of the Day Card */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#0b66c2] text-white p-5 md:p-8 mb-6 md:mb-8 shadow-xl group">
        <div className="relative z-10">
          <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1.5 md:mb-2 block">Word of the Day</span>
          <h4 className="text-xl md:text-3xl font-black mb-0.5 md:mb-1">{wordOfTheDay.cree}</h4>
          <p className="text-sm md:text-lg opacity-90 mb-4 md:mb-6">{wordOfTheDay.translation}</p>
          <button 
            onClick={() => setSelectedWord(wordOfTheDay)}
            className="px-4 md:px-6 py-2 bg-white text-[#004e99] text-xs md:text-sm font-bold rounded-full transition-all active:scale-95 hover:shadow-lg"
          >
            Deep Dive
          </button>
        </div>
        <div className="absolute -right-8 -top-8 w-36 md:w-48 h-36 md:h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-20">
          <span className="material-symbols-outlined text-[60px] md:text-[120px] fill-1">wb_sunny</span>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="space-y-2.5 md:space-y-4">
        {categoryWords.map((word, idx) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            onClick={() => setSelectedWord(word)}
            className="group bg-white p-3.5 md:p-6 rounded-xl md:rounded-2xl flex items-center justify-between transition-all duration-300 hover:bg-[#e8e8e8] shadow-sm border border-[#c1c6d4]/10 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 md:gap-6 min-w-0 flex-1">
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#d6e3ff] flex items-center justify-center text-[#004e99] group-hover:scale-110 transition-transform flex-shrink-0">
                <span className="material-symbols-outlined fill-1 text-[18px] md:text-[24px]">
                  {word.id === 'yikwaskwan' ? 'cloud' : word.id === 'kimiwan' ? 'rainy' : word.id === 'yotin' ? 'air' : word.id === 'mispon' ? 'ac_unit' : 'thunderstorm'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base md:text-xl font-bold text-[#004e99] mb-0 md:mb-0.5 tracking-tight truncate">{word.cree}</h3>
                <p className="text-[#414752] text-xs md:text-sm font-medium truncate">{word.translation}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-4 flex-shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); toggleSavedWord(word.id); }}
                className={`p-1.5 transition-transform active:scale-90 ${savedWordIds.includes(word.id) ? 'text-[#004e99] hover:scale-110' : 'text-[#727783] hover:text-[#004e99]'}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${savedWordIds.includes(word.id) ? 'fill-1' : ''}`}>bookmark</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/nodes/${word.id}`); }}
                className="p-1.5 text-[#727783] hover:text-[#004e99] transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-[#727783] hover:text-[#004e99] transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryDetail;
