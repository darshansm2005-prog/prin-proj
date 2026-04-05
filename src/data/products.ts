export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Gravel' | 'Electric' | 'Kids';
  image: string;
  rating: number;
  isSale?: boolean;
  salePrice?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Stumpjumper Comp Alloy',
    brand: 'Specialized',
    price: 3500,
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Tarmac SL7 Expert',
    brand: 'Specialized',
    price: 6000,
    category: 'Road',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    isSale: true,
    salePrice: 5400,
  },
  {
    id: '3',
    name: 'Checkmate SLR 9',
    brand: 'Trek',
    price: 8500,
    category: 'Gravel',
    image: 'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Turbo Levo SL',
    brand: 'Specialized',
    price: 7500,
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
  },
  {
    id: '5',
    name: 'Fuel EX 8 Gen 6',
    brand: 'Trek',
    price: 4200,
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Domane SL 6',
    brand: 'Trek',
    price: 3800,
    category: 'Road',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
  },
];