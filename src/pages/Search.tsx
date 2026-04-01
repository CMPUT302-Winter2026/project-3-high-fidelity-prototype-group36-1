import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../context/VocabularyContext';
import WordDetail from '../components/WordDetail';
import { Word } from '../types';

const normalize = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const { vocabulary, isLoading, savedWordIds, toggleSavedWord } = useVocabulary();

  const normalizedQuery = normalize(query);
  const suggestions = vocabulary.filter(
    (w) =>
      normalize(w.cree).includes(normalizedQuery) ||
      normalize(w.translation).includes(normalizedQuery)
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[#004e99] font-black">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-28 md:pb-32 w-full max-w-[800px]">
      {/* Search Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
        <div className="flex-1 flex items-center gap-2 bg-[#f3f3f3] rounded-full px-4 py-3 border border-[#c1c6d4]/20 focus-within:border-[#004e99]/50 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[#414752] text-xl">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a word..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-[#1a1c1c] font-medium outline-none text-base"
            autoFocus
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

      {/* Suggestions */}
      <div className="flex flex-col gap-2.5 md:gap-4">
        <h2 className="text-[11px] font-bold tracking-widest text-[#414752] uppercase mb-1 md:mb-2 px-1">
          {query ? 'Search Results' : 'Suggestions'}
        </h2>

        {(query ? suggestions : vocabulary.slice(0, 4)).map((word, index) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedWord(word)}
            className="group flex items-center justify-between px-6 py-4 md:px-8 md:py-5 bg-white rounded-full hover:bg-[#e8e8e8] transition-all duration-300 cursor-pointer border border-transparent active:scale-[0.98] shadow-sm"
          >
            <div className="flex flex-col gap-0.5 min-w-0 flex-1 mr-3">
              <div className="font-bold text-base md:text-lg text-[#1a1c1c] truncate">
                {highlightMatch(word.cree, query)}
                <span className="text-[#414752] font-medium ml-2 text-xs md:text-sm">({word.wordClass.split(' ')[0]})</span>
              </div>
              <div className="text-xs md:text-sm text-[#414752] truncate">{highlightMatch(word.translation, query)}</div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-4 flex-shrink-0">
              <button
                title={savedWordIds.includes(word.id) ? 'Unsave word' : 'Save word'}
                onClick={(e) => { e.stopPropagation(); toggleSavedWord(word.id); }}
                className={`p-1.5 transition-transform active:scale-90 ${savedWordIds.includes(word.id) ? 'text-[#004e99] hover:scale-110' : 'text-[#727783] hover:text-[#004e99]'}`}
              >
                <span className={`material-symbols-outlined text-[20px] ${savedWordIds.includes(word.id) ? 'fill-1' : ''}`}>bookmark</span>
              </button>
              <button
                title="View word connections"
                onClick={(e) => { e.stopPropagation(); navigate(`/nodes/${word.id}`); }}
                className="p-1.5 text-[#727783] hover:text-[#004e99] transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </button>
              <button
                title="Play pronunciation"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-[#727783] hover:text-[#004e99] transition-colors active:scale-90"
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </button>
            </div>
          </motion.div>
        ))}
        
        {query && suggestions.length === 0 && (
          <div className="text-center py-16 md:py-20 opacity-50 space-y-3">
            <span className="material-symbols-outlined text-5xl md:text-6xl">search_off</span>
            <p className="font-medium text-sm md:text-base">No results found for "{query}"</p>
          </div>
        )}
      </div>

      {/* Did you know card */}
      {!query && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 md:mt-16 p-5 md:p-8 bg-[#f3f3f3] rounded-2xl md:rounded-3xl flex items-start gap-4 md:gap-6 border border-[#c1c6d4]/10"
        >
          <div className="w-10 h-10 bg-[#004e99] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#004e99]/20 shrink-0">
            <span className="material-symbols-outlined text-xl">lightbulb</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1a1c1c] text-sm">Did you know?</h3>
            <p className="text-xs md:text-sm text-[#414752] mt-1 leading-relaxed">
              The word <span className="font-bold">nêhiyawêwin</span> refers not just to speech, but to the entire
              cultural way of being and relating.
            </p>
          </div>
        </motion.div>
      )}

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
