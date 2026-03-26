import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../context/VocabularyContext';
import WordDetail from '../components/WordDetail';
import { Word } from '../types';

const Saved: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const { vocabulary, savedWordIds, toggleSavedWord } = useVocabulary();

  const savedWords = useMemo(() => {
    let list = vocabulary.filter(w => savedWordIds.includes(w.id));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(w => w.cree.toLowerCase().includes(q) || w.translation.toLowerCase().includes(q));
    }
    return list;
  }, [vocabulary, savedWordIds, query]);

  const highlightMatch = (text: string, q: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${q})`, 'gi'));
    return (
      <span className="truncate">
        {parts.map((part, i) =>
          part.toLowerCase() === q.toLowerCase() ? (
            <span key={i} className="bg-[#004e99]/15 text-[#004e99] font-bold rounded-sm px-0.5">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-28 md:pb-32 w-full max-w-[800px]">
      
      {/* Search Bar */}
      {savedWordIds.length > 0 && (
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8 mt-2 md:mt-0">
          <div className="flex-1 flex items-center gap-2 bg-[#f3f3f3] rounded-xl px-4 py-3 border border-[#c1c6d4]/20 focus-within:border-[#004e99]/50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[#414752] text-xl">search</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your saved words..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-[#1a1c1c] font-medium outline-none text-base"
            />
            {query && (
              <button 
                onClick={() => setQuery('')} 
                className="p-1.5 hover:bg-[#e8e8e8] rounded-full transition-colors text-[#414752] hover:text-[#1a1c1c] active:scale-90"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Word List */}
      <section className="mt-4 md:mt-8 space-y-2.5 md:space-y-4">
        {savedWords.length > 0 ? (
          savedWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => setSelectedWord(word)}
              className="bg-white rounded-xl md:rounded-full px-4 py-3 md:px-8 md:py-5 flex items-center justify-between border border-[#c1c6d4]/10 hover:bg-[#f3f3f3] transition-all group cursor-pointer active:scale-[0.98]"
            >
              <div className="flex flex-col min-w-0 flex-1 mr-2">
                <span className="text-base md:text-xl font-bold tracking-tight text-[#1a1c1c] truncate">{highlightMatch(word.cree, query)}</span>
                <span className="text-xs md:text-sm text-[#414752] italic truncate">{highlightMatch(word.translation, query)}</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-4 flex-shrink-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleSavedWord(word.id); }}
                  className={`p-1.5 transition-transform active:scale-90 text-[#004e99] hover:scale-110`}
                >
                  <span className="material-symbols-outlined fill-1 text-[20px]">bookmark</span>
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
