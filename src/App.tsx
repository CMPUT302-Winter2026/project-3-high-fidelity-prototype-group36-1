import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { SettingsProvider } from './context/SettingsContext';
import { VocabularyProvider } from './context/VocabularyContext';
import Layout from './components/Layout';
import Tutorial from './components/Tutorial';
import Explore from './pages/Explore';
import Search from './pages/Search';
import Saved from './pages/Saved';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Contribute from './pages/Contribute';
import Settings from './pages/Settings';
import WordNodes from './pages/WordNodes';

export default function App() {
  const [showTutorial, setShowTutorial] = useState(
    () => !window.localStorage.getItem('tutorialComplete')
  );

  const completeTutorial = () => {
    window.localStorage.setItem('tutorialComplete', 'true');
    setShowTutorial(false);
  };

  return (
    <VocabularyProvider>
      <SettingsProvider>
        <AnimatePresence>
          {showTutorial && <Tutorial onComplete={completeTutorial} />}
        </AnimatePresence>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Explore />} />
              <Route path="search" element={<Search />} />
              <Route path="saved" element={<Saved />} />
              <Route path="categories" element={<Categories />} />
              <Route path="category/:id" element={<CategoryDetail />} />
              <Route path="nodes/:id" element={<WordNodes />} />
              <Route path="contribute" element={<Contribute />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </SettingsProvider>
    </VocabularyProvider>
  );
}
