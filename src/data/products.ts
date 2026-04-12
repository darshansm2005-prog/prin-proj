"use client";

import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Gravel' | 'Electric' | 'Kids' | 'Parts';
  material?: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  isSale?: boolean;
  salePrice?: number;
  stock: number;
  isHidden?: boolean;
  created_at?: string;
}

export const fetchProducts = async (includeHidden = false): Promise<Product[]> => {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (!includeHidden) {
    query = query.eq('is_hidden', false);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return includeHidden ? products : products.filter(p => !p.isHidden);
  }

  return data.map((p: any) => ({
    ...p,
    isSale: p.is_sale,
    salePrice: p.sale_price,
    isHidden: p.is_hidden
  })) as Product[];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
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
    salePrice: p.sale_price,
    isHidden: p.is_hidden
  } as Product;
};

export const products: Product[] = [
  // MOUNTAIN
  {
    id: '1',
    name: 'S-Works Epic World Cup',
    brand: 'Specialized',
    price: 12000,
    category: 'Mountain',
    material: 'FACT 12m Carbon',
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
    salePrice: 10500,
    isHidden: false
  },
  {
    id: 'm2',
    name: 'Stumpjumper EVO Pro',
    brand: 'Specialized',
    price: 6500,
    category: 'Mountain',
    material: 'FACT 11m Carbon',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800'],
    description: "The ultimate trail bike. Unmatched control, capability, and adjustability. It's the benchmark for modern trail performance.",
    specs: { "Frame": "FACT 11m Carbon", "Fork": "Fox Float 36 Factory", "Shock": "Fox Float X Factory" },
    rating: 4.7,
    reviews: 56,
    stock: 4,
    isHidden: false
  },
  {
    id: 'm3',
    name: 'Enduro Expert',
    brand: 'Specialized',
    price: 7200,
    category: 'Mountain',
    material: 'FACT 11m Carbon',
    image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800'],
    description: "Built for the biggest descents. The Enduro climbs surprisingly well but truly shines when the trail points straight down.",
    specs: { "Travel": "170mm Front/Rear", "Wheels": "Roval Traverse 29", "Brakes": "SRAM Code RSC" },
    rating: 4.8,
    reviews: 31,
    stock: 2,
    isHidden: false
  },
  {
    id: 'm4',
    name: 'Chisel Comp',
    brand: 'Specialized',
    price: 1900,
    category: 'Mountain',
    material: 'D\'Aluisio Smartweld M5 Alloy',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800'],
    description: "The perfect entry into XC racing. Lightweight alloy frame with geometry inspired by our world-cup winning carbon bikes.",
    specs: { "Frame": "M5 Alloy", "Fork": "RockShox Judy Gold", "Groupset": "SRAM NX Eagle" },
    rating: 4.5,
    reviews: 89,
    stock: 12,
    isHidden: false
  },
  {
    id: 'm5',
    name: 'Status 160',
    brand: 'Specialized',
    price: 3000,
    category: 'Mountain',
    material: 'M5 Alloy',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=800'],
    description: "Mixed wheel size fun. The Status is designed for park laps, street sessions, and having the most fun possible on two wheels.",
    specs: { "Wheels": "Mullet (29F/27.5R)", "Frame": "M5 Alloy", "Brakes": "SRAM Code R" },
    rating: 4.6,
    reviews: 45,
    stock: 6,
    isHidden: false
  },

  // ROAD
  {
    id: '2',
    name: 'Tarmac SL8 Pro',
    brand: 'Specialized',
    price: 8500,
    category: 'Road',
    material: 'FACT 10r Carbon',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800'],
    description: "One bike to rule them all. Aerodynamics, lightweight, and ride quality you thought impossible. The Tarmac SL8 is the fastest race bike in the world.",
    specs: { "Frame": "Tarmac SL8 FACT 10r Carbon", "Groupset": "Shimano Ultegra Di2", "Wheels": "Roval Rapide CL II" },
    rating: 4.8,
    reviews: 85,
    stock: 5,
    isHidden: false
  },
  {
    id: 'r2',
    name: 'Aethos Expert',
    brand: 'Specialized',
    price: 7000,
    category: 'Road',
    material: 'FACT 10r Carbon',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800'],
    description: "For the love of riding. The Aethos was designed to be the ultimate expression of ride quality, not just a race machine.",
    specs: { "Weight": "6.8kg", "Groupset": "Shimano Ultegra Di2", "Frame": "FACT 10r Carbon" },
    rating: 4.9,
    reviews: 112,
    stock: 3,
    isHidden: false
  },
  {
    id: 'r3',
    name: 'Roubaix SL8 Sport',
    brand: 'Specialized',
    price: 3500,
    category: 'Road',
    material: 'FACT 10r Carbon',
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=800'],
    description: "Smoother is faster. With Future Shock 3.0, the Roubaix is more capable and comfortable than ever for long days in the saddle.",
    specs: { "Suspension": "Future Shock 3.0", "Tire Clearance": "38mm", "Groupset": "Shimano 105" },
    rating: 4.7,
    reviews: 67,
    stock: 8,
    isHidden: false
  },
  {
    id: 'r4',
    name: 'Allez Sprint Comp',
    brand: 'Specialized',
    price: 3000,
    category: 'Road',
    material: 'E5 Premium Aluminum',
    image: 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800'],
    description: "The world's first alloy super bike. Inspired by the Tarmac SL7, this is the fastest alloy road bike ever made.",
    specs: { "Frame": "E5 Alloy", "Fork": "FACT Carbon", "Groupset": "Shimano 105" },
    rating: 4.6,
    reviews: 94,
    stock: 10,
    isHidden: false
  },
  {
    id: 'r5',
    name: 'Shiv TT Disc',
    brand: 'Specialized',
    price: 13500,
    category: 'Road',
    material: 'S-Works FACT 11r Carbon',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800'],
    description: "The fastest bike in the race against the clock. Aerodynamics optimized for real-world crosswinds and technical courses.",
    specs: { "Type": "Time Trial", "Wheels": "Roval CLX 64", "Groupset": "SRAM Red eTap AXS" },
    rating: 5.0,
    reviews: 12,
    stock: 1,
    isHidden: false
  },

  // ELECTRIC
  {
    id: '3',
    name: 'Turbo Levo Alloy',
    brand: 'Specialized',
    price: 5800,
    category: 'Electric',
    material: 'M5 Premium Alloy',
    image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800'],
    description: "The power to ride more trails. An unbelievable combination of ride quality, usable power, and range that lets you go further and faster.",
    specs: { "Motor": "Specialized 2.2", "Battery": "700Wh", "Frame": "M5 Premium Alloy" },
    rating: 4.7,
    reviews: 64,
    stock: 8,
    isHidden: false
  },
  {
    id: 'e2',
    name: 'Turbo Vado 4.0',
    brand: 'Specialized',
    price: 4000,
    category: 'Electric',
    material: 'E5 Aluminum',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800'],
    description: "The ultimate transportation tool. Smooth, powerful, and integrated. Perfect for commuting or weekend adventures.",
    specs: { "Motor": "Specialized 2.0", "Battery": "710Wh", "Range": "Up to 90 miles" },
    rating: 4.8,
    reviews: 128,
    stock: 15,
    isHidden: false
  },
  {
    id: 'e3',
    name: 'Turbo Creo SL Expert',
    brand: 'Specialized',
    price: 9500,
    category: 'Electric',
    material: 'FACT 11r Carbon',
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=800'],
    description: "It's you, only faster. The Creo SL is the lightest e-road bike in its class, designed to feel like a traditional road bike.",
    specs: { "Weight": "12.2kg", "Motor": "Specialized SL 1.1", "Battery": "320Wh Internal" },
    rating: 4.9,
    reviews: 34,
    stock: 4,
    isHidden: false
  },
  {
    id: 'e4',
    name: 'Turbo Kenevo Expert',
    brand: 'Specialized',
    price: 9000,
    category: 'Electric',
    material: 'M5 Alloy',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'],
    description: "The most capable e-MTB ever. 180mm of travel and a powerful motor to conquer the steepest, roughest terrain.",
    specs: { "Travel": "180mm", "Motor": "Specialized 2.2", "Battery": "700Wh" },
    rating: 4.7,
    reviews: 22,
    stock: 3,
    isHidden: false
  },
  {
    id: 'e5',
    name: 'Turbo Como SL 5.0',
    brand: 'Specialized',
    price: 4500,
    category: 'Electric',
    material: 'E5 Aluminum',
    image: 'https://images.unsplash.com/photo-1591348122449-02525d7ba3f6?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591348122449-02525d7ba3f6?q=80&w=800'],
    description: "Low-maintenance, high-fun. The Como SL features an internal gear hub and belt drive for the ultimate city riding experience.",
    specs: { "Drive": "Gates Carbon Belt", "Hub": "Shimano Alfine 8-speed", "Weight": "Lightweight SL" },
    rating: 4.6,
    reviews: 51,
    stock: 7,
    isHidden: false
  },

  // GRAVEL
  {
    id: '4',
    name: 'Diverge STR Expert',
    brand: 'Specialized',
    price: 7500,
    category: 'Gravel',
    material: 'FACT 11r Carbon',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800'],
    description: "With Future Shock suspension front and rear, the Diverge STR delivers compliance without compromise for the most rugged gravel adventures.",
    specs: { "Frame": "Diverge FACT 11r Carbon", "Suspension": "Future Shock 3.3", "Groupset": "SRAM Rival eTap AXS" },
    rating: 4.9,
    reviews: 28,
    stock: 4,
    isHidden: false
  },
  {
    id: 'g2',
    name: 'Crux Expert',
    brand: 'Specialized',
    price: 6200,
    category: 'Gravel',
    material: 'FACT 10r Carbon',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800'],
    description: "The world's lightest gravel bike. Massive tire clearance and performance geometry for racing or exploring.",
    specs: { "Weight": "7.6kg", "Tire Clearance": "47mm", "Groupset": "SRAM Rival eTap AXS" },
    rating: 4.8,
    reviews: 41,
    stock: 5,
    isHidden: false
  },

  // KIDS
  {
    id: 'k1',
    name: 'Jett 20 Single Speed',
    brand: 'Specialized',
    price: 450,
    category: 'Kids',
    material: 'A1 Premium Aluminum',
    image: 'https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800'],
    description: "Designed to grow with the rider. Adjustable cranks and handlebars ensure the perfect fit for years.",
    specs: { "Wheel Size": "20 inch", "Weight": "Lightweight Alloy", "Brakes": "V-Brake" },
    rating: 4.9,
    reviews: 156,
    stock: 20,
    isHidden: false
  },
  {
    id: 'k2',
    name: 'Riprock Coaster 12',
    brand: 'Specialized',
    price: 280,
    category: 'Kids',
    material: 'A1 Premium Aluminum',
    image: 'https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800'],
    description: "The perfect first bike. Stable geometry and easy-to-use coaster brakes for building confidence.",
    specs: { "Wheel Size": "12 inch", "Training Wheels": "Included", "Frame": "A1 Alloy" },
    rating: 4.8,
    reviews: 210,
    stock: 15,
    isHidden: false
  },

  // PARTS
  {
    id: 'p1',
    name: 'Roval Rapide CLX II',
    brand: 'Roval',
    price: 2800,
    category: 'Parts',
    material: 'Carbon Fiber',
    image: 'https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800'],
    description: "The fastest wheels in the world. Tubeless ready and aerodynamically optimized for speed.",
    specs: { "Depth": "51mm Front / 60mm Rear", "Weight": "1520g", "Type": "Tubeless Ready" },
    rating: 4.9,
    reviews: 78,
    stock: 10,
    isHidden: false
  },
  {
    id: 'p2',
    name: 'S-Works Power Saddle',
    brand: 'Specialized',
    price: 325,
    category: 'Parts',
    material: 'FACT Carbon Shell',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'],
    description: "The ultimate in performance and comfort. Body Geometry design ensures blood flow to sensitive arteries.",
    specs: { "Rails": "Carbon", "Width": "143mm / 155mm", "Weight": "159g" },
    rating: 4.7,
    reviews: 342,
    stock: 25,
    isHidden: false
  }
];