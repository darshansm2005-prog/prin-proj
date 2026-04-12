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
  // MOUNTAIN (5)
  {
    id: 'm1',
    name: 'S-Works Epic World Cup',
    brand: 'Specialized',
    price: 12000,
    category: 'Mountain',
    material: 'FACT 12m Carbon',
    image: '/products/s-works-epic.png',
    images: ['/products/s-works-epic.png', 'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800'],
    description: "The fastest XC race bike in the world. Purpose-built to win on the most demanding courses.",
    specs: { "Frame": "S-Works FACT 12m Carbon", "Fork": "RockShox SID SL", "Groupset": "SRAM XXSL" },
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
    description: "The ultimate trail bike. Unmatched control and capability.",
    specs: { "Frame": "FACT 11m Carbon", "Fork": "Fox Float 36 Factory" },
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
    description: "Built for the biggest descents and technical terrain.",
    specs: { "Travel": "170mm", "Wheels": "Roval Traverse 29" },
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
    material: 'M5 Alloy',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800'],
    description: "Lightweight alloy frame with race-inspired geometry.",
    specs: { "Frame": "M5 Alloy", "Fork": "RockShox Judy Gold" },
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
    description: "Mixed wheel size fun for park laps and street sessions.",
    specs: { "Wheels": "Mullet (29/27.5)", "Brakes": "SRAM Code R" },
    rating: 4.6,
    reviews: 45,
    stock: 6,
    isHidden: false
  },

  // ROAD (5)
  {
    id: 'r1',
    name: 'Tarmac SL8 Pro',
    brand: 'Specialized',
    price: 8500,
    category: 'Road',
    material: 'FACT 10r Carbon',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800'],
    description: "Aerodynamics, lightweight, and ride quality in one package.",
    specs: { "Groupset": "Shimano Ultegra Di2", "Wheels": "Roval Rapide CL II" },
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
    description: "The ultimate expression of ride quality and lightweight design.",
    specs: { "Weight": "6.8kg", "Groupset": "Shimano Ultegra Di2" },
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
    description: "Smoother is faster. Endurance geometry with Future Shock.",
    specs: { "Suspension": "Future Shock 3.0", "Groupset": "Shimano 105" },
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
    material: 'E5 Alloy',
    image: 'https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800'],
    description: "The world's first alloy super bike, built for speed.",
    specs: { "Frame": "E5 Alloy", "Groupset": "Shimano 105" },
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
    material: 'FACT 11r Carbon',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800'],
    description: "The fastest bike in the race against the clock.",
    specs: { "Type": "Time Trial", "Groupset": "SRAM Red eTap AXS" },
    rating: 5.0,
    reviews: 12,
    stock: 1,
    isHidden: false
  },

  // ELECTRIC (5)
  {
    id: 'e1',
    name: 'Turbo Levo Alloy',
    brand: 'Specialized',
    price: 5800,
    category: 'Electric',
    material: 'M5 Alloy',
    image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800'],
    description: "The power to ride more trails with smooth, integrated power.",
    specs: { "Motor": "Specialized 2.2", "Battery": "700Wh" },
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
    material: 'E5 Alloy',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800'],
    description: "The ultimate transportation tool for commuting and adventure.",
    specs: { "Motor": "Specialized 2.0", "Range": "90 miles" },
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
    description: "Lightweight e-road bike that feels like a traditional machine.",
    specs: { "Weight": "12.2kg", "Motor": "Specialized SL 1.1" },
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
    description: "The most capable e-MTB for conquering steep terrain.",
    specs: { "Travel": "180mm", "Motor": "Specialized 2.2" },
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
    material: 'E5 Alloy',
    image: 'https://images.unsplash.com/photo-1591348122449-02525d7ba3f6?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591348122449-02525d7ba3f6?q=80&w=800'],
    description: "Low-maintenance city riding with internal gear hub.",
    specs: { "Drive": "Gates Belt", "Hub": "Shimano Alfine 8" },
    rating: 4.6,
    reviews: 51,
    stock: 7,
    isHidden: false
  },

  // GRAVEL (5)
  {
    id: 'g1',
    name: 'Diverge STR Expert',
    brand: 'Specialized',
    price: 7500,
    category: 'Gravel',
    material: 'FACT 11r Carbon',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800'],
    description: "Full suspension gravel performance for rugged adventures.",
    specs: { "Suspension": "Future Shock 3.3", "Groupset": "SRAM Rival" },
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
    description: "The world's lightest gravel bike with massive clearance.",
    specs: { "Weight": "7.6kg", "Clearance": "47mm" },
    rating: 4.8,
    reviews: 41,
    stock: 5,
    isHidden: false
  },
  {
    id: 'g3',
    name: 'Diverge E5 Elite',
    brand: 'Specialized',
    price: 2000,
    category: 'Gravel',
    material: 'E5 Alloy',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=800'],
    description: "Capable, versatile, and ready for any gravel path.",
    specs: { "Frame": "E5 Alloy", "Groupset": "Shimano GRX" },
    rating: 4.5,
    reviews: 72,
    stock: 12,
    isHidden: false
  },
  {
    id: 'g4',
    name: 'S-Works Crux',
    brand: 'Specialized',
    price: 12000,
    category: 'Gravel',
    material: 'FACT 12r Carbon',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800'],
    description: "The pinnacle of gravel racing performance.",
    specs: { "Weight": "7.25kg", "Groupset": "SRAM Red XPLR" },
    rating: 5.0,
    reviews: 15,
    stock: 2,
    isHidden: false
  },
  {
    id: 'g5',
    name: 'Diverge Sport Carbon',
    brand: 'Specialized',
    price: 3500,
    category: 'Gravel',
    material: 'FACT 8r Carbon',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800'],
    description: "Carbon performance for the everyday gravel rider.",
    specs: { "Frame": "FACT 8r Carbon", "Groupset": "Shimano GRX" },
    rating: 4.6,
    reviews: 38,
    stock: 6,
    isHidden: false
  },

  // KIDS (5)
  {
    id: 'k1',
    name: 'Jett 20 Single Speed',
    brand: 'Specialized',
    price: 450,
    category: 'Kids',
    material: 'A1 Alloy',
    image: 'https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800'],
    description: "Designed to grow with the rider for years of fun.",
    specs: { "Wheel Size": "20 inch", "Weight": "Lightweight" },
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
    material: 'A1 Alloy',
    image: 'https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800'],
    description: "The perfect first bike for building confidence.",
    specs: { "Wheel Size": "12 inch", "Brakes": "Coaster" },
    rating: 4.8,
    reviews: 210,
    stock: 15,
    isHidden: false
  },
  {
    id: 'k3',
    name: 'Hotrock 24',
    brand: 'Specialized',
    price: 550,
    category: 'Kids',
    material: 'A1 Alloy',
    image: 'https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800'],
    description: "A real mountain bike for the next generation of riders.",
    specs: { "Wheel Size": "24 inch", "Gears": "8-speed" },
    rating: 4.7,
    reviews: 84,
    stock: 10,
    isHidden: false
  },
  {
    id: 'k4',
    name: 'Jett 16 Single Speed',
    brand: 'Specialized',
    price: 400,
    category: 'Kids',
    material: 'A1 Alloy',
    image: 'https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1531956455612-499692661759?q=80&w=800'],
    description: "Lightweight and easy to handle for small riders.",
    specs: { "Wheel Size": "16 inch", "Weight": "Ultra-light" },
    rating: 4.9,
    reviews: 120,
    stock: 18,
    isHidden: false
  },
  {
    id: 'k5',
    name: 'Riprock 20',
    brand: 'Specialized',
    price: 600,
    category: 'Kids',
    material: 'A1 Alloy',
    image: 'https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1516670428252-df97bba108d1?q=80&w=800'],
    description: "Big tires for big confidence on any terrain.",
    specs: { "Tires": "2.35 inch", "Brakes": "Disc" },
    rating: 4.8,
    reviews: 65,
    stock: 8,
    isHidden: false
  },

  // PARTS (5)
  {
    id: 'p1',
    name: 'Roval Rapide CLX II',
    brand: 'Roval',
    price: 2800,
    category: 'Parts',
    material: 'Carbon',
    image: 'https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800'],
    description: "The fastest wheels in the world, tubeless ready.",
    specs: { "Depth": "51/60mm", "Weight": "1520g" },
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
    material: 'Carbon',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'],
    description: "The ultimate in performance and comfort.",
    specs: { "Rails": "Carbon", "Weight": "159g" },
    rating: 4.7,
    reviews: 342,
    stock: 25,
    isHidden: false
  },
  {
    id: 'p3',
    name: 'Roval Terra CLX',
    brand: 'Roval',
    price: 2500,
    category: 'Parts',
    material: 'Carbon',
    image: 'https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=800'],
    description: "The ultimate gravel wheelset for any adventure.",
    specs: { "Weight": "1296g", "Internal Width": "25mm" },
    rating: 4.8,
    reviews: 54,
    stock: 12,
    isHidden: false
  },
  {
    id: 'p4',
    name: 'S-Works Prevail 3',
    brand: 'Specialized',
    price: 300,
    category: 'Parts',
    material: 'EPS',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'],
    description: "The most ventilated helmet we've ever made.",
    specs: { "Safety": "MIPS Air Node", "Weight": "260g" },
    rating: 4.9,
    reviews: 186,
    stock: 30,
    isHidden: false
  },
  {
    id: 'p5',
    name: 'S-Works Torch Shoes',
    brand: 'Specialized',
    price: 450,
    category: 'Parts',
    material: 'Carbon/Synthetic',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800'],
    description: "The next evolution of the winningest shoe in pro cycling.",
    specs: { "Sole": "FACT Powerline Carbon", "Closure": "BOA S3-Snap" },
    rating: 4.8,
    reviews: 92,
    stock: 20,
    isHidden: false
  }
];