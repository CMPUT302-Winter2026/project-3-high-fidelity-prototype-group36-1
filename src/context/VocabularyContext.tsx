import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Word } from '../types';

interface VocabularyContextType {
  vocabulary: Word[];
  savedWordIds: string[];
  isLoading: boolean;
  error: string | null;
  refreshVocabulary: () => Promise<void>;
  submitSuggestion: (suggestedData: { word: string; category: string; description: string }) => Promise<void>;
  toggleSavedWord: (id: string) => void;
}

const VocabularyContext = createContext<VocabularyContextType>({
  vocabulary: [],
  savedWordIds: [],
  isLoading: true,
  error: null,
  refreshVocabulary: async () => {},
  submitSuggestion: async () => {},
  toggleSavedWord: () => {},
});

export const useVocabulary = () => useContext(VocabularyContext);

export const VocabularyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vocabulary, setVocabulary] = useState<Word[]>([]);
  const [savedWordIds, setSavedWordIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('savedWords');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVocabulary = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/vocabulary');
      if (!res.ok) throw new Error('Failed to fetch vocabulary');
      const data = await res.json();
      setVocabulary(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not establish connection to server.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVocabulary();
  }, []);

  const submitSuggestion = async (suggestedData: { word: string; category: string; description: string }) => {
    const res = await fetch('http://localhost:3001/api/vocabulary/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suggestedData),
    });
    
    if (!res.ok) {
      throw new Error('Failed to submit suggestion');
    }
  };

  const toggleSavedWord = (id: string) => {
    setSavedWordIds((prevIds) => {
      const newIds = prevIds.includes(id) ? prevIds.filter(wordId => wordId !== id) : [...prevIds, id];
      localStorage.setItem('savedWords', JSON.stringify(newIds));
      return newIds;
    });
  };

  return (
    <VocabularyContext.Provider value={{ vocabulary, savedWordIds, isLoading, error, refreshVocabulary: fetchVocabulary, submitSuggestion, toggleSavedWord }}>
      {children}
    </VocabularyContext.Provider>
  );
};
