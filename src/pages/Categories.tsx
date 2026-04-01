import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'weather', label: 'Yîkwaskwan', sub: 'WEATHER', icon: 'cloudy_snowing' },
  { id: 'animals', label: 'Pisesiwak', sub: 'ANIMALS', icon: 'pets' },
  { id: 'nature', label: 'Askîy', sub: 'NATURE', icon: 'forest' },
  { id: 'family', label: 'Wâhkôtowin', sub: 'FAMILY', icon: 'family_restroom' },
  { id: 'greetings', label: 'Tânisi', sub: 'GREETINGS', icon: 'front_hand' },
  { id: 'food', label: 'Mîcisowin', sub: 'FOOD', icon: 'restaurant' },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f9f9f9] pt-14 md:pt-24 px-4 md:px-6 pb-36 md:pb-48 w-full max-w-[800px]">
      {/* Search Section */}
      <section className="mt-4 md:mt-8 mb-6 md:mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#727783] group-focus-within:text-[#004e99] transition-colors">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a category..."
            className="w-full bg-white border border-[#c1c6d4]/20 py-3 md:py-4 pl-12 pr-4 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#004e99]/20 transition-all duration-300 shadow-sm outline-none"
          />
        </div>
      </section>

      {/* Browse by Topic */}
      <section>
        <div className="flex items-end justify-between mb-4 md:mb-8">
          <div>
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#1a1c1c]">Browse by topic</h2>
            <p className="text-[#414752] text-xs md:text-sm mt-0.5 md:mt-1">Select a category to start learning</p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 hover:bg-[#e8e8e8] rounded-full transition-colors duration-200 flex items-center justify-center active:scale-90"
          >
            <span className="material-symbols-outlined text-[#414752]">settings</span>
          </button>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5 md:gap-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square shadow-sm"
              >
                <span className="material-symbols-outlined text-[#004e99] text-2xl md:text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div className="text-center">
                  <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">{cat.label}</p>
                  <p className="text-[9px] md:text-[10px] text-[#414752] uppercase tracking-widest font-medium">{cat.sub}</p>
                </div>
              </motion.button>
            ))
          ) : (
            <div className="col-span-full text-center py-16 opacity-50 space-y-3">
              <span className="material-symbols-outlined text-5xl">category</span>
              <p className="font-medium text-sm">No categories found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Recently Explored */}
      <section className="mt-8 md:mt-12 space-y-3">
        <h3 className="text-sm font-bold text-[#414752] uppercase tracking-widest">Recently explored</h3>
        <div className="flex flex-wrap gap-2">
          {['Tânisi', 'Mahti', 'Êkosi', 'Mispon'].map((word) => (
            <div
              key={word}
              onClick={() => navigate(`/search?q=${encodeURIComponent(word)}`)}
              className="px-4 py-2 md:px-5 md:py-2.5 bg-[#f3f3f3] text-[#414752] rounded-full text-sm font-medium hover:bg-[#e8e8e8] transition-colors cursor-pointer active:scale-95"
            >
              {word}
            </div>
          ))}
        </div>
      </section>

      {/* Suggest or Contribute Button — positioned safely above bottom nav */}
      <div className="fixed bottom-20 md:bottom-8 left-0 w-full px-4 md:px-6 pointer-events-none md:pl-64 z-40">
        <div className="w-full max-w-[800px] pointer-events-auto">
          <button
            onClick={() => navigate('/contribute')}
            className="w-full bg-[#004e99] text-white py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-[#004e99]/20 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span className="text-sm md:text-base">Suggest or Contribute</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
