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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('q');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  const categories = ['Mountain', 'Road', 'Gravel', 'Electric', 'Kids'];

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    result = result.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [categoryFilter, searchQuery, sortBy, selectedBrands, priceRange]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearchParams({});
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {searchQuery ? `Search: "${searchQuery}"` : categoryFilter ? `${categoryFilter} Bikes` : 'All Bikes'}
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
                </h3>
                {(categoryFilter || searchQuery || selectedBrands.length > 0) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs text-orange-600">
                    Clear All
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Categories</h4>
                  <div className="space-y-1">
                    {categories.map(cat => (
                      <Button 
                        key={cat}
                        variant={categoryFilter === cat ? "secondary" : "ghost"} 
                        className="w-full justify-start font-medium h-9"
                        onClick={() => setSearchParams({ category: cat })}
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Brands</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm font-medium cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Under $1,000', range: [0, 1000] },
                      { label: '$1,000 - $3,000', range: [1000, 3000] },
                      { label: '$3,000 - $6,000', range: [3000, 6000] },
                      { label: '$6,000+', range: [6000, 10000] },
                    ].map((p, i) => (
                      <Button 
                        key={i}
                        variant={priceRange[0] === p.range[0] && priceRange[1] === p.range[1] ? "secondary" : "ghost"}
                        className="w-full justify-start text-sm h-9"
                        onClick={() => setPriceRange(p.range as [number, number])}
                      >
                        {p.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-zinc-900 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Expert Advice</h4>
              <p className="text-xs text-zinc-400 mb-4">Not sure which bike fits your riding style?</p>
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
                Bike Finder Tool
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
                <Button onClick={clearFilters}>Clear All Filters</Button>
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