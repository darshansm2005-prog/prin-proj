"use client";

import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Gravel' | 'Electric' | 'Kids' | 'Parts';
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  isSale?: boolean;
  salePrice?: number;
  stock: number;
  created_at?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!data || data.length === 0) return products;

  return data.map((p: any) => ({
    ...p,
    isSale: p.is_sale,
    salePrice: p.sale_price
  })) as Product[];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  // Check fallback first for demo purposes
  const fallback = products.find(p => p.id === id);
  if (fallback) return fallback;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  const p = data;
  return {
    ...p,
    isSale: p.is_sale,
    salePrice: p.sale_price
  } as Product;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'S-Works Epic World Cup',
    brand: 'Specialized',
    price: 12000,
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800',
      'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'
    ],
    description: "The fastest XC race bike in the world. Purpose-built to win on the most demanding courses with revolutionary integrated suspension.",
    specs: { "Frame": "S-Works FACT 12m Carbon", "Fork": "RockShox SID SL ULTIMATE BRAIN", "Groupset": "SRAM XXSL Eagle AXS" },
    rating: 4.9,
    reviews: 42,
    stock: 3,
    isSale: true,
    salePrice: 10500
  },
  {
    id: '2',
    name: 'Tarmac SL8 Pro',
    brand: 'Specialized',
    price: 8500,
    category: 'Road',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800'],
    description: "One bike to rule them all. Aerodynamics, lightweight, and ride quality you thought impossible. The Tarmac SL8 is the fastest race bike in the world.",
    specs: { "Frame": "Tarmac SL8 FACT 10r Carbon", "Groupset": "Shimano Ultegra Di2", "Wheels": "Roval Rapide CL II" },
    rating: 4.8,
    reviews: 85,
    stock: 5
  },
  {
    id: '3',
    name: 'Turbo Levo Alloy',
    brand: 'Specialized',
    price: 5800,
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800'],
    description: "The power to ride more trails. An unbelievable combination of ride quality, usable power, and range that lets you go further and faster.",
    specs: { "Motor": "Specialized 2.2", "Battery": "700Wh", "Frame": "M5 Premium Alloy" },
    rating: 4.7,
    reviews: 64,
    stock: 8
  },
  {
    id: '4',
    name: 'Diverge STR Expert',
    brand: 'Specialized',
    price: 7500,
    category: 'Gravel',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800'],
    description: "With Future Shock suspension front and rear, the Diverge STR delivers compliance without compromise for the most rugged gravel adventures.",
    specs: { "Frame": "Diverge FACT 11r Carbon", "Suspension": "Future Shock 3.3", "Groupset": "SRAM Rival eTap AXS" },
    rating: 4.9,
    reviews: 28,
    stock: 4
  }
];