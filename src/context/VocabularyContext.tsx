import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Word } from '../types';

interface VocabularyContextType {
  vocabulary: Word[];
  isLoading: boolean;
  error: string | null;
  refreshVocabulary: () => Promise<void>;
  submitSuggestion: (suggestedData: { word: string; category: string; description: string }) => Promise<void>;
}

const VocabularyContext = createContext<VocabularyContextType>({
  vocabulary: [],
  isLoading: true,
  error: null,
  refreshVocabulary: async () => {},
  submitSuggestion: async () => {},
});

export const useVocabulary = () => useContext(VocabularyContext);

export const VocabularyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vocabulary, setVocabulary] = useState<Word[]>([]);
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

  return (
    <VocabularyContext.Provider value={{ vocabulary, isLoading, error, refreshVocabulary: fetchVocabulary, submitSuggestion }}>
      {children}
    </VocabularyContext.Provider>
  );
};
