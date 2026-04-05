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

const brands = ['Specialized', 'Trek', 'Giant', 'Cannondale', 'Santa Cruz', 'Canyon', 'Scott', 'Marin', 'Kona', 'Orbea', 'BMC', 'Yeti', 'Pivot'];
const categories: Product['category'][] = ['Mountain', 'Road', 'Gravel', 'Electric', 'Kids'];

const bikeImages = {
  Mountain: [
    'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop', // Full suspension MTB
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop', // Hardtail MTB
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop', // Trail bike
    'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?q=80&w=800&auto=format&fit=crop', // Enduro bike
  ],
  Road: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop', // Aero road bike
    'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop', // Endurance road bike
    'https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800&auto=format&fit=crop', // Racing road bike
  ],
  Gravel: [
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop', // Gravel bike on trail
    'https://images.unsplash.com/photo-1471506480208-8e93acc6c0df?q=80&w=800&auto=format&fit=crop', // Adventure gravel bike
  ],
  Electric: [
    'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800&auto=format&fit=crop', // E-MTB
    'https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=80&w=800&auto=format&fit=crop', // E-Commuter
  ],
  Kids: [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop', // Kids mountain bike
    'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=800&auto=format&fit=crop', // Small kids bike
  ]
};

const generateProducts = (): Product[] => {
  const items: Product[] = [];
  
  // Initial 6 products for consistency with real-world names
  items.push(
    { id: '1', name: 'Stumpjumper Comp Alloy', brand: 'Specialized', price: 3500, category: 'Mountain', image: bikeImages.Mountain[0], rating: 4.8 },
    { id: '2', name: 'Tarmac SL7 Expert', brand: 'Specialized', price: 6000, category: 'Road', image: bikeImages.Road[0], rating: 4.9, isSale: true, salePrice: 5400 },
    { id: '3', name: 'Checkmate SLR 9', brand: 'Trek', price: 8500, category: 'Gravel', image: bikeImages.Gravel[0], rating: 4.7 },
    { id: '4', name: 'Turbo Levo SL', brand: 'Specialized', price: 7500, category: 'Electric', image: bikeImages.Electric[0], rating: 5.0 },
    { id: '5', name: 'Fuel EX 8 Gen 6', brand: 'Trek', price: 4200, category: 'Mountain', image: bikeImages.Mountain[1], rating: 4.6 },
    { id: '6', name: 'Domane SL 6', brand: 'Trek', price: 3800, category: 'Road', image: bikeImages.Road[1], rating: 4.5 }
  );

  const suffixes = ['Pro', 'Elite', 'Expert', 'Comp', 'Sport', 'SL', 'SLR', 'Team', 'Limited', 'Carbon', 'Alloy'];
  const models = ['Apex', 'Summit', 'Ranger', 'Velocity', 'Enduro', 'Trail', 'Cross', 'Aero', 'Zenith', 'Pulse', 'Vortex', 'Nomad', 'Scout', 'Phantom'];

  for (let i = 7; i <= 106; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const price = Math.floor(Math.random() * 9000) + 500;
    const isSale = Math.random() > 0.8;
    const salePrice = isSale ? Math.floor(price * 0.85) : undefined;
    const images = bikeImages[category];
    
    items.push({
      id: i.toString(),
      name: `${model} ${suffix} ${i}`,
      brand,
      price,
      category,
      image: images[Math.floor(Math.random() * images.length)],
      rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
      isSale,
      salePrice
    });
  }

  return items;
};

export const products = generateProducts();