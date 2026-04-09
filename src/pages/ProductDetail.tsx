"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductViewer360 from '@/components/ProductViewer360';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2,
  Info,
  Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery');

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await fetchProductById(id);
        setProduct(data);
      }
      setIsLoading(false);
    };
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Button asChild><Link to="/shop">Back to Shop</Link></Button>
    </div>
  );

  const currentPrice = product.salePrice || product.price;
  const discount = product.isSale ? Math.round(((product.price - product.salePrice!) / product.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop" className="hover:text-orange-600">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-orange-600">{product.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Product Visuals */}
          <div className="space-y-6">
            <div className="flex gap-4 mb-4">
              <Button 
                variant={viewMode === 'gallery' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('gallery')}
                className="rounded-full"
              >
                Gallery
              </Button>
              <Button 
                variant={viewMode === '360' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setViewMode('360')}
                className="rounded-full"
              >
                360° View
              </Button>
            </div>

            {viewMode === 'gallery' ? (
              <div className="space-y-4">
                <div className="aspect-square bg-zinc-50 rounded-3xl overflow-hidden border border-zinc-100">
                  <img 
                    src={product.images[activeImage] || product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-all duration-500"
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {(product.images.length > 0 ? product.images : [product.image]).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i ? 'border-orange-600 ring-2 ring-orange-100' : 'border-transparent hover:border-zinc-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <ProductViewer360 images={product.images.length > 0 ? product.images : [product.image]} />
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                  {product.brand}
                </Badge>
                {product.isSale && (
                  <Badge className="bg-red-600">-{discount}% OFF</Badge>
                )}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-orange-500 text-orange-500' : 'text-zinc-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-zinc-900">${currentPrice.toLocaleString()}</span>
                {product.isSale && (
                  <span className="text-xl text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                )}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              <div className="flex items-center gap-2 mb-8 text-sm font-medium text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                In Stock ({product.stock} units available)
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-2xl text-lg font-bold"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`h-14 w-14 rounded-2xl p-0 ${isInWishlist(product.id) ? 'text-red-600 border-red-100 bg-red-50' : ''}`}
                onClick={() => toggleWishlist(product)}
              >
                <Heart className={`h-6 w-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="h-6 w-6 text-zinc-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-6 w-6 text-zinc-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="h-6 w-6 text-zinc-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs & Reviews */}
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8">
            <TabsTrigger 
              value="specs" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-0 py-4 text-lg font-bold"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-600 data-[state=active]:bg-transparent px-0 py-4 text-lg font-bold"
            >
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-6">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4 border-b border-zinc-100">
                  <span className="font-bold text-zinc-500">{key}</span>
                  <span className="font-medium text-zinc-900">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-12">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-zinc-50 rounded-full mb-4">
                <Info className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
              <p className="text-muted-foreground max-w-md">
                We're currently migrating our review system. Check back soon to see what other riders are saying about the {product.name}.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;