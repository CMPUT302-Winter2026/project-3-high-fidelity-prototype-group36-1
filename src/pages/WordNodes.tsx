import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useVocabulary } from '../context/VocabularyContext';
import WordDetail from '../components/WordDetail';
import { Word } from '../types';

const WordNodes: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vocabulary, isLoading } = useVocabulary();
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  const currentWord = useMemo(() => {
    return vocabulary.find((w) => w.id === id);
  }, [vocabulary, id]);

  const relatedWords = useMemo(() => {
    if (!currentWord) return [];
    // Find other words in the same category
    return vocabulary
      .filter((w) => w.id !== currentWord.id && w.category === currentWord.category)
      .slice(0, 4);
  }, [vocabulary, currentWord]);

  // Generate fixed positions for up to 4 tags
  const getPeripheralNodeStyle = (index: number) => {
    const positions = [
      { top: '25%', left: '25%' },
      { top: '22%', left: '75%' },
      { top: '65%', left: '75%' },
      { top: '68%', left: '25%' },
    ];
    return positions[index % positions.length];
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] node-network w-full flex items-center justify-center">
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
           className="w-8 h-8 rounded-full border-4 border-[#c1c6d4]/30 border-t-[#004e99]"
        />
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] node-network w-full flex flex-col items-center justify-center">
        <p className="text-[#414752] mb-4">Word not found.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-[#004e99] text-white rounded-full font-bold">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full node-network pt-20 pb-24 overflow-hidden cursor-grab active:cursor-grabbing">
      {/* SVG Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          {/* Central Connections to main tags */}
          {relatedWords.length > 0 && <line stroke="#c1c6d4" strokeWidth="1.5" x1="50%" y1="50%" x2="25%" y2="25%" />}
          {relatedWords.length > 1 && <line stroke="#c1c6d4" strokeWidth="1.5" x1="50%" y1="50%" x2="75%" y2="22%" />}
          {relatedWords.length > 2 && <line stroke="#c1c6d4" strokeWidth="1.5" x1="50%" y1="50%" x2="75%" y2="65%" />}
          {relatedWords.length > 3 && <line stroke="#c1c6d4" strokeWidth="1.5" x1="50%" y1="50%" x2="25%" y2="68%" />}
        </motion.g>
      </svg>

      {/* Nodes Layer */}
      <div className="absolute inset-0">
        
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div 
            onClick={() => setSelectedWord(currentWord)}
            className="bg-[#0b66c2] text-white px-10 py-5 rounded-full shadow-[0_10px_40px_rgba(11,102,194,0.4)] flex flex-col items-center hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-[#0b66c2]/80 cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{currentWord.translation}</span>
            <span className="text-3xl font-black tracking-tight capitalize">{currentWord.cree}</span>
          </div>
        </motion.div>

        {/* Dynamic Connected Peripheral Nodes */}
        {relatedWords.map((relatedWord, idx) => {
          if (idx > 3) return null; // Only show up to 4 to match lines
          const pos = getPeripheralNodeStyle(idx);
          return (
            <motion.div 
              key={relatedWord.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + (idx * 0.1), type: 'spring' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ top: pos.top, left: pos.left }}
            >
              <div 
                onClick={() => setSelectedWord(relatedWord)}
                className="bg-[#b22200] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#d83916] hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center flex-shrink-0"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 mb-0.5 whitespace-nowrap">{relatedWord.translation.length > 15 ? relatedWord.translation.substring(0, 15) + '...' : relatedWord.translation}</span>
                <span className="text-lg font-bold tracking-tight capitalize whitespace-nowrap">{relatedWord.cree}</span>
              </div>
            </motion.div>
          );
        })}

      </div>

      {/* Hint Text */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 pointer-events-none z-20"
      >
        <p className="text-[#414752] font-medium text-sm tracking-wide bg-[#f3f3f3]/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
            tap any word to view its info
        </p>
      </motion.div>

      {/* Word Detail Bottom Sheet Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetail word={selectedWord} onClose={() => setSelectedWord(null)} />
        )}
      </AnimatePresence>


    </div>
  );
};

export default WordNodes;
