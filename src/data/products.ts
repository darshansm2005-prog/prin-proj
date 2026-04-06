export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Gravel' | 'Electric' | 'Kids' | 'Parts';
  image: string;
  images: string[]; // Multiple angles
  description: string;
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  isSale?: boolean;
  salePrice?: number;
  stock: number;
}

const bikeImages = {
  Mountain: [
    'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop',
  ],
  Road: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511994298241-608e28f14f66?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501147830916-ce44a6359892?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=800&auto=format&fit=crop',
  ],
  Gravel: [
    'https://images.unsplash.com/photo-1532298229144-0ee0c9e9ad58?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=800&auto=format&fit=crop',
  ],
  Electric: [
    'https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571068316344-75bc76f77891?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?q=80&w=800&auto=format&fit=crop',
  ],
  Kids: [
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800&auto=format&fit=crop',
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
  const categories: Product['category'][] = ['Mountain', 'Road', 'Gravel', 'Electric', 'Kids', 'Parts'];
  const brands = ['Specialized', 'Trek', 'Giant', 'Cannondale', 'Santa Cruz', 'Canyon'];

  for (let i = 1; i <= 24; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = category === 'Parts' ? Math.floor(Math.random() * 500) + 20 : Math.floor(Math.random() * 9000) + 500;
    const images = bikeImages[category];
    
    items.push({
      id: i.toString(),
      name: `${brand} ${category} Pro ${i}`,
      brand,
      price,
      category,
      image: images[0],
      images: images,
      description: "Experience the ultimate ride with our premium selection. Engineered for performance, comfort, and durability, this model features cutting-edge technology and high-quality materials to ensure you conquer every trail or road with confidence.",
      specs: {
        "Frame": "Carbon Fiber / Lightweight Alloy",
        "Drivetrain": "Shimano XT / SRAM GX Eagle",
        "Brakes": "Hydraulic Disc Brakes",
        "Weight": "12.5 kg",
        "Warranty": "Lifetime on Frame"
      },
      rating: Number((Math.random() * (5 - 4) + 4).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 10,
      stock: Math.floor(Math.random() * 15) + 2,
      isSale: Math.random() > 0.8,
      salePrice: Math.random() > 0.8 ? Math.floor(price * 0.85) : undefined
    });
  }

  return items;
};

export const products = generateProducts();