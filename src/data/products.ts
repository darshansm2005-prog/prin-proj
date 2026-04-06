export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Gravel' | 'Electric' | 'Kids' | 'Parts';
  image: string;
  images: string[]; // Array for gallery and 360 view
  rating: number;
  isSale?: boolean;
  salePrice?: number;
}

const brands = ['Specialized', 'Trek', 'Giant', 'Cannondale', 'Santa Cruz', 'Canyon', 'Shimano', 'SRAM', 'RockShox', 'Fox', 'RaceFace', 'Brooks'];
const categories: Product['category'][] = ['Mountain', 'Road', 'Gravel', 'Electric', 'Kids', 'Parts'];

const bikeImages = {
  Mountain: [
    'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
  ],
  Road: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop',
  ],
  Gravel: [
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop',
  ],
  Electric: [
    'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
  ],
  Kids: [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop',
  ],
  Parts: [
    'https://images.unsplash.com/photo-1591491640784-3232eb748d4b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618941716939-553f3660956a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583467875263-d50dec37a88c?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1621114432163-2613385700a9?q=80&w=800&auto=format&fit=crop',
  ]
};

const generateProducts = (): Product[] => {
  const items: Product[] = [];
  
  items.push(
    { 
      id: '1', 
      name: 'Stumpjumper Comp Alloy', 
      brand: 'Specialized', 
      price: 3500, 
      category: 'Mountain', 
      image: bikeImages.Mountain[0], 
      images: bikeImages.Mountain,
      rating: 4.8 
    },
    { 
      id: '2', 
      name: 'Tarmac SL7 Expert', 
      brand: 'Specialized', 
      price: 6000, 
      category: 'Road', 
      image: bikeImages.Road[0], 
      images: bikeImages.Road,
      rating: 4.9, 
      isSale: true, 
      salePrice: 5400 
    },
    { 
      id: 'p1', 
      name: 'Carbon Riser Handlebar', 
      brand: 'RaceFace', 
      price: 180, 
      category: 'Parts', 
      image: bikeImages.Parts[0], 
      images: bikeImages.Parts,
      rating: 4.9 
    },
    { 
      id: 'p2', 
      name: 'Atlas Flat Pedals', 
      brand: 'RaceFace', 
      price: 150, 
      category: 'Parts', 
      image: bikeImages.Parts[1], 
      images: bikeImages.Parts,
      rating: 4.7 
    },
    { 
      id: 'p3', 
      name: 'B17 Leather Saddle', 
      brand: 'Brooks', 
      price: 160, 
      category: 'Parts', 
      image: bikeImages.Parts[2], 
      images: bikeImages.Parts,
      rating: 5.0 
    },
  );

  const suffixes = ['Pro', 'Elite', 'Expert', 'Comp', 'Sport', 'SL', 'SLR', 'Team', 'Limited', 'Carbon', 'Alloy'];
  const models = ['Apex', 'Summit', 'Ranger', 'Velocity', 'Enduro', 'Trail', 'Cross', 'Aero', 'Zenith', 'Pulse', 'Vortex', 'Nomad', 'Scout', 'Phantom'];

  for (let i = 7; i <= 106; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const price = category === 'Parts' ? Math.floor(Math.random() * 500) + 20 : Math.floor(Math.random() * 9000) + 500;
    const isSale = Math.random() > 0.8;
    const salePrice = isSale ? Math.floor(price * 0.85) : undefined;
    const images = bikeImages[category];
    
    items.push({
      id: i.toString(),
      name: `${model} ${suffix} ${i}`,
      brand,
      price,
      category,
      image: images[0],
      images: images,
      rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      isSale,
      salePrice
    });
  }

  return items;
};

export const products = generateProducts();