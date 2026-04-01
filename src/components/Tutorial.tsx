import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const steps = [
  {
    icon: 'waving_hand',
    title: 'tânisi! Welcome',
    description:
      'Vocabulary Explorer helps you learn Plains Cree (nêhiyawêwin) through an interactive, category-based experience.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
  {
    icon: 'explore',
    title: 'Explore Topics',
    description:
      'Browse words organized by topics like Weather, Animals, Nature, Family, Greetings, and Food.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
  {
    icon: 'search',
    title: 'Search & Discover',
    description:
      'Use the search bar to quickly find any Cree or English word and view detailed definitions, pronunciation, and examples.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
  {
    icon: 'bookmark',
    title: 'Save Your Favorites',
    description:
      'Tap the bookmark icon on any word to save it for later. Access all your saved words from the Saved tab.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
  {
    icon: 'hub',
    title: 'Word Connections',
    description:
      'See how words relate to each other on an interactive node map. Tap the hub icon on any word to explore.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
  {
    icon: 'school',
    title: 'Simple & Expert Modes',
    description:
      'Switch between Simple and Expert mode in Settings. Expert mode reveals linguistic analysis like stems, roots, and morphology.',
    color: '#004e99',
    bg: '#d6e3ff',
  },
];

interface TutorialProps {
  onComplete: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const goNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6"
    >
      <button
        onClick={onComplete}
        className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1.5 text-xs font-semibold text-[#727783] hover:text-[#1a1c1c] transition-colors rounded-full hover:bg-[#f3f3f3]"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={(d: number) => ({ opacity: 0, x: d * 60 })}
            animate={{ opacity: 1, x: 0 }}
            exit={(d: number) => ({ opacity: 0, x: d * -60 })}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-8 md:mb-10 shadow-lg"
              style={{ backgroundColor: step.bg }}
            >
              <span
                className="material-symbols-outlined fill-1 text-[36px] md:text-[44px]"
                style={{ color: step.color }}
              >
                {step.icon}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1a1c1c] mb-3 md:mb-4">
              {step.title}
            </h2>
            <p className="text-sm md:text-base text-[#414752] leading-relaxed max-w-xs">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-sm pb-12 md:pb-16 space-y-6">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-6 bg-[#004e99]'
                  : 'w-2 bg-[#c1c6d4]/40'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex-1 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base text-[#414752] bg-[#f3f3f3] hover:bg-[#e8e8e8] active:scale-[0.98] transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={goNext}
            className="flex-1 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base text-white bg-[#004e99] hover:bg-[#003d7a] active:scale-[0.98] transition-all shadow-lg shadow-[#004e99]/20"
          >
            {isLast ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Tutorial;
