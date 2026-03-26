import React, { createContext, useContext, useState, type ReactNode } from 'react';

type LearningMode = 'simple' | 'expert';

interface SettingsContextType {
  learningMode: LearningMode;
  setLearningMode: (mode: LearningMode) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  learningMode: 'simple',
  setLearningMode: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [learningMode, setLearningMode] = useState<LearningMode>('simple');

  return (
    <SettingsContext.Provider value={{ learningMode, setLearningMode }}>
      {children}
    </SettingsContext.Provider>
  );
};
