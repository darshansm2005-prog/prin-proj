"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Bike } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, Product } from '@/data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      fetchProducts().then(products => {
        const filtered = products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5);
        setResults(filtered);
      });
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col"
        >
          <div className="container mx-auto px-4 md:px-8 pt-12">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <Bike className="h-6 w-6 text-orange-600" />
                <span className="text-xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
              </div>
              <button 
                onClick={onClose}
                className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 text-zinc-300" />
                <input
                  autoFocus
                  placeholder="Search for bikes, gear, or brands..."
                  className="w-full bg-transparent border-none text-4xl md:text-6xl font-black tracking-tighter focus:ring-0 placeholder:text-zinc-100 pl-12 py-4"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="mt-12 space-y-8">
                {results.length > 0 ? (
                  <div className="grid gap-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Top Results</p>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="group flex items-center gap-6 p-4 rounded-3xl hover:bg-zinc-50 transition-all"
                      >
                        <div className="h-20 w-20 bg-white rounded-2xl border border-zinc-100 overflow-hidden flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">{product.brand}</p>
                          <h3 className="text-xl font-black text-zinc-900">{product.name}</h3>
                        </div>
                        <ArrowRight className="h-6 w-6 text-zinc-300 group-hover:text-orange-600 group-hover:translate-x-2 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : query.length > 1 ? (
                  <p className="text-zinc-400 font-medium">No results found for "{query}"</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Mountain', 'Road', 'Electric', 'Gravel'].map((cat) => (
                      <Link
                        key={cat}
                        to={`/shop?category=${cat}`}
                        onClick={onClose}
                        className="p-6 rounded-3xl bg-zinc-50 hover:bg-orange-50 hover:text-orange-600 transition-all text-center font-bold"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;