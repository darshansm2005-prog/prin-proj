"use client";

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, MoveHorizontal } from 'lucide-react';

interface ProductViewer360Props {
  images: string[];
}

const ProductViewer360 = ({ images }: ProductViewer360Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.pageX - startX;
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? -1 : 1;
      const nextIndex = (currentIndex + direction + images.length) % images.length;
      setCurrentIndex(nextIndex);
      setStartX(e.pageX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].pageX - startX;
    if (Math.abs(diff) > 10) {
      const direction = diff > 0 ? -1 : 1;
      const nextIndex = (currentIndex + direction + images.length) % images.length;
      setCurrentIndex(nextIndex);
      setStartX(e.touches[0].pageX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-square bg-zinc-100 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <img 
        src={images[currentIndex]} 
        alt="360 View" 
        className="w-full h-full object-cover pointer-events-none"
      />
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20">
        <RotateCw className="h-4 w-4 text-orange-600 animate-spin-slow" />
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-900">360° View</span>
        <MoveHorizontal className="h-4 w-4 text-zinc-400 ml-2" />
      </div>

      <div className="absolute top-6 right-6">
        <div className="bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
          Interactive
        </div>
      </div>
    </div>
  );
};

export default ProductViewer360;