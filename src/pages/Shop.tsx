"use client";

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [categoryFilter, sortBy]);

  const categories = ['Mountain', 'Road', 'Gravel', 'Electric', 'Kids'];

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {categoryFilter ? `${categoryFilter} Bikes` : 'All Bikes'}
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} premium models
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="md:hidden">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Categories
              </h3>
              <div className="space-y-2">
                <Button 
                  variant={!categoryFilter ? "secondary" : "ghost"} 
                  className="w-full justify-start font-medium"
                  onClick={() => setSearchParams({})}
                >
                  All Categories
                </Button>
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={categoryFilter === cat ? "secondary" : "ghost"} 
                    className="w-full justify-start font-medium"
                    onClick={() => setSearchParams({ category: cat })}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-orange-600 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-sm text-orange-100 mb-4">Our experts are ready to help you find the perfect ride.</p>
              <Button variant="secondary" className="w-full bg-white text-orange-600 hover:bg-orange-50">
                Chat with Expert
              </Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
                <h3 className="text-xl font-bold mb-2">No bikes found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms.</p>
                <Button onClick={() => setSearchParams({})}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;