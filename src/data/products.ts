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

  return data.map((p: any) => ({
    ...p,
    isSale: p.is_sale,
    salePrice: p.sale_price
  })) as Product[];
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
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

// Fallback data for initial render or if DB is empty
export const products: Product[] = [
  {
    id: '1',
    name: 'Specialized Mountain Pro 1',
    brand: 'Specialized',
    price: 4500,
    category: 'Mountain',
    image: 'https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1576433733026-d3f5ee6693c7?q=80&w=800'],
    description: "Experience the ultimate ride with our premium selection.",
    specs: { "Frame": "Carbon Fiber", "Weight": "12.5 kg" },
    rating: 4.8,
    reviews: 120,
    stock: 5
  }
];