import React from 'react';

const TopNavBar = () => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-[#141311]/60 backdrop-blur-3xl flex items-center px-8">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary text-lg">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-[10px] font-bold tracking-widest text-on-surface focus:ring-1 focus:ring-primary-container outline-none" placeholder="SEARCH INTELLIGENCE..." type="text"/>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
