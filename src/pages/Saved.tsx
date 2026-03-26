import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../context/VocabularyContext';
import WordDetail from '../components/WordDetail';
import { Word } from '../types';

const Saved: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const { vocabulary, isLoading } = useVocabulary();

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-28 md:pb-32 w-full max-w-[800px]">
      {/* Word List */}
      <section className="mt-4 md:mt-8 space-y-2.5 md:space-y-4">
        {vocabulary.length > 0 ? (
          vocabulary.slice(0, 10).map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelectedWord(word)}
              className="bg-white rounded-xl md:rounded-full px-4 py-3 md:px-8 md:py-5 flex items-center justify-between border border-[#c1c6d4]/10 hover:bg-[#f3f3f3] transition-all group cursor-pointer active:scale-[0.98]"
            >
              <div className="flex flex-col min-w-0 flex-1 mr-2">
                <span className="text-base md:text-xl font-bold tracking-tight text-[#1a1c1c] truncate">{word.cree}</span>
                <span className="text-xs md:text-sm text-[#414752] italic truncate">{word.translation}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-4 flex-shrink-0">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 text-[#004e99] hover:scale-110 transition-transform active:scale-90"
                >
                  <span className="material-symbols-outlined fill-1 text-[20px]">bookmark</span>
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
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
          ))
        ) : (
          <div className="text-center py-16 opacity-50 space-y-3">
            <span className="material-symbols-outlined text-5xl">search_off</span>
            <p className="font-medium text-sm">No saved words found matching your search.</p>
          </div>
        )}
      </section>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Saved;
