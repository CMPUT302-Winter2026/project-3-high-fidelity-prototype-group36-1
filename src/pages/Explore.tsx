import React from 'react';
import { useNavigate } from 'react-router-dom';

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-14 md:pt-20 pb-28 md:pb-12 px-4 md:px-6 w-full max-w-[800px] space-y-6 md:space-y-12">
      {/* Search Section */}
      <section>
        <div className="relative group" onClick={() => navigate('/search')}>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#727783]">search</span>
          </div>
          <input 
            className="w-full bg-white border border-[#c1c6d4]/20 py-3 md:py-4 pl-12 pr-4 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#004e99]/20 transition-all duration-300 shadow-sm cursor-pointer" 
            placeholder="Search a word..." 
            type="text"
            readOnly
          />
        </div>
      </section>

      {/* Browse by Topic Section */}
      <section>
        <div className="flex items-end justify-between mb-4 md:mb-8">
          <div>
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#1a1c1c]">Browse by topic</h2>
            <p className="text-[#414752] text-xs md:text-sm mt-0.5 md:mt-1">Select a category to start learning</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2.5 md:gap-4">
          {/* Weather */}
          <button onClick={() => navigate('/category/weather')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">cloudy_snowing</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Yîkwaskwan</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Weather</p>
            </div>
          </button>
          {/* Animals */}
          <button onClick={() => navigate('/category/animals')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">pets</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Pisesiwak</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Animals</p>
            </div>
          </button>
          {/* Nature */}
          <button onClick={() => navigate('/category/nature')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">forest</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Askîy</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Nature</p>
            </div>
          </button>
          {/* Family */}
          <button onClick={() => navigate('/category/family')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">family_restroom</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Wâhkôtowin</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Family</p>
            </div>
          </button>
          {/* Greetings */}
          <button onClick={() => navigate('/category/greetings')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">front_hand</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Tânisi</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Greetings</p>
            </div>
          </button>
          {/* Food */}
          <button onClick={() => navigate('/category/food')} className="group p-3 md:p-6 bg-white rounded-2xl md:rounded-3xl border border-[#c1c6d4]/10 flex flex-col items-center justify-center gap-1.5 md:gap-3 hover:bg-[#004e99]/5 active:scale-95 transition-all duration-300 aspect-[4/3] md:aspect-square">
            <span className="material-symbols-outlined text-[#004e99] text-3xl md:text-4xl">restaurant</span>
            <div className="text-center">
              <p className="font-bold text-[#1a1c1c] leading-tight text-xs md:text-base">Mîcisowin</p>
              <p className="text-[9px] md:text-xs text-[#414752] uppercase tracking-widest font-medium">Food</p>
            </div>
          </button>
        </div>
      </section>

      {/* Recently Explored Section */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-[#414752] uppercase tracking-widest">Recently explored</h3>
        <div className="flex flex-wrap gap-2">
          {['Tânisi', 'Mispon'].map((word) => (
            <div key={word} onClick={() => navigate(`/search?q=${encodeURIComponent(word)}`)} className="px-4 py-2 md:px-5 md:py-2.5 bg-[#f3f3f3] text-[#414752] rounded-full text-sm font-medium hover:bg-[#e8e8e8] transition-colors cursor-pointer active:scale-95">
              {word}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
