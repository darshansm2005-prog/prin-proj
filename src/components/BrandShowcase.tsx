"use client";

import React from 'react';

const brands = [
  { name: 'Specialized', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Specialized_Logo.svg/1200px-Specialized_Logo.svg.png' },
  { name: 'Trek', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Trek_Bicycle_Corporation_logo.svg/1200px-Trek_Bicycle_Corporation_logo.svg.png' },
  { name: 'Giant', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Giant_Bicycles_logo.svg/1200px-Giant_Bicycles_logo.svg.png' },
  { name: 'Cannondale', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Cannondale_logo.svg/1200px-Cannondale_logo.svg.png' },
  { name: 'Santa Cruz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Santa_Cruz_Bicycles_logo.svg/1200px-Santa_Cruz_Bicycles_logo.svg.png' },
  { name: 'Canyon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Canyon_Bicycles_logo.svg/1200px-Canyon_Bicycles_logo.svg.png' },
];

const BrandShowcase = () => {
  return (
    <section className="py-16 border-y border-zinc-100">
      <div className="container px-4 md:px-8">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-12">
          Authorized Dealer of World-Class Brands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="flex justify-center">
              <span className="text-2xl font-black text-zinc-300 hover:text-orange-600 cursor-default transition-colors">
                {brand.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;