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
    return [];
  }

  return data.map((p: any) => ({
    ...p,
    isSale: p.is_sale,
    salePrice: p.sale_price,
    isHidden: p.is_hidden
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
    salePrice: p.sale_price,
    isHidden: p.is_hidden
  } as Product;
};