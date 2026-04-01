import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useSettings } from '../context/SettingsContext';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const LearningModeBadge: React.FC = () => {
  const { learningMode } = useSettings();
  const isExpert = learningMode === 'expert';
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 ml-2 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider align-middle transition-colors duration-300",
        isExpert
          ? "bg-[#fff3e0] text-[#e65100]"
          : "bg-[#d6e3ff] text-[#004e99]"
      )}
    >
      <span className="material-symbols-outlined text-[12px] md:text-[14px] fill-1">
        {isExpert ? 'science' : 'school'}
      </span>
      {isExpert ? 'Expert' : 'Simple'}
    </span>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHomeTitleFaded, setIsHomeTitleFaded] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setIsHomeTitleFaded(false);
      const timer = setTimeout(() => {
        setIsHomeTitleFaded(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const getHeaderTitle = () => {
    if (location.pathname === '/') return isHomeTitleFaded ? 'Home' : 'Vocabulary Explorer';
    if (location.pathname === '/search') return 'Search';
    if (location.pathname === '/saved') return 'Saved';
    if (location.pathname === '/categories') return 'Categories';
    return 'Vocabulary Explorer';
  };

  const navItems = [
    { path: '/', label: 'Explore', icon: 'explore' },
    { path: '/search', label: 'Search', icon: 'search' },
    { path: '/saved', label: 'Saved', icon: 'bookmark' },
    { path: '/contribute', label: 'Contribute', icon: 'add_circle' },
    { path: '/settings', label: 'Settings', icon: 'settings' },
  ];

  const hideHeaderRoutes = ['/category/', '/contribute', '/settings'];
  const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] font-['Inter'] min-h-screen flex flex-col overflow-hidden">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-72 bg-white z-[70] shadow-2xl md:hidden flex flex-col p-6"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-black tracking-tighter text-xl">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-[#f3f3f3] rounded-full active:scale-90 transition-transform">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive ? "bg-[#004e99] text-white shadow-lg" : "text-[#414752] hover:bg-[#f3f3f3]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("material-symbols-outlined", isActive && "fill-1")}>{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto pt-8 border-t border-[#c1c6d4]/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#e2e2e2] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8hXyNXxOEztFa4VOjr43VdLK9KAbR70p1NW6WGQ_Zp6tmPWcu7TqmRqofC-MmCCRWQQkzQn4cHO8sCh-eDSxjygm78gn9XO93g_Fdo_iBUW6QV9AcitPkfz4K9uG6ruatz13rAApzzLL-7_6KFpVUapNtpTr1fhdzVI7Wkl_MVh9NEE0LLhS4oW7HoidlP4iksGQ7eaH6LD_RHaoLdjG_KJjS2MLVFWROBO3rhhpDcUGk-rq05ie2ZZh1Tru57W_-v1mwLiaxTvk"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-bold text-sm">Kinanâskomitin</p>
              <p className="text-xs text-[#414752]">Expert Learner</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-[#c1c6d4]/10 flex-col p-6 z-50">
        <div className="mb-12">
          <h1 className="font-black tracking-tighter text-2xl text-[#004e99]">Menu</h1>
        </div>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive ? "bg-[#004e99] text-white shadow-lg" : "text-[#414752] hover:bg-[#f3f3f3]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className={cn("material-symbols-outlined", isActive && "fill-1")}>{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Top App Bar — more compact on mobile */}
      {!shouldHideHeader && (
        <header className="fixed top-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-50 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-[#f9f9f9]/80 backdrop-blur-md">
          <div className="flex items-center gap-3 md:gap-4 relative h-8 md:h-10">
            {location.pathname !== '/' && (
              <button
                onClick={() => navigate(-1)}
                className="p-1.5 -ml-1.5 hover:bg-[#e8e8e8] transition-colors active:scale-95 duration-150 rounded-full flex items-center justify-center z-10"
              >
                <span className="material-symbols-outlined text-[#004e99]">arrow_back</span>
              </button>
            )}
            <AnimatePresence mode="wait">
              <motion.h1 
                key={getHeaderTitle()}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-extrabold tracking-tighter text-2xl md:text-3xl text-[#1a1c1c] whitespace-nowrap flex items-center"
              >
                {getHeaderTitle()}
                <LearningModeBadge />
              </motion.h1>
            </AnimatePresence>
          </div>
        </header>
      )}

      {/* Main Content — proper bottom padding to clear bottom nav */}
      <main className="flex-1 relative md:pl-64">
        <Outlet />
      </main>

      {/* Bottom Navigation (Mobile Only) — with safe area inset support */}
      <nav className="fixed bottom-0 w-full z-50 rounded-t-2xl flex justify-around items-center pt-2 px-4 bg-white/80 backdrop-blur-xl border-t border-[#c1c6d4]/20 shadow-[0_-12px_40px_rgba(26,28,28,0.06)] md:hidden safe-bottom">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center transition-all duration-300 ease-out px-3 py-1.5 min-w-[60px]",
                isActive ? "text-[#004e99] bg-[#e8e8e8] rounded-full" : "text-[#414752] hover:text-[#0b66c2]"
              )
            }
          >
            {({ isActive }) => (
              <>
                <span className={cn("material-symbols-outlined text-[22px]", isActive && "fill-1")}>{item.icon}</span>
                <span className="text-[10px] font-medium tracking-wide uppercase mt-0.5">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
