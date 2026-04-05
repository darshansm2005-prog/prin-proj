"use client";

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCart } from '@/context/CartContext';
import { 
  Star, 
  ShoppingCart, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-3xl bg-zinc-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-zinc-100 overflow-hidden cursor-pointer hover:ring-2 ring-orange-600 transition-all">
                  <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                  {product.category}
                </Badge>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {product.brand}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-orange-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'}`} />
                  ))}
                  <span className="ml-2 font-bold text-zinc-900">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">(128 Reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-4 mb-8">
                {product.isSale ? (
                  <>
                    <span className="text-4xl font-bold text-red-600">${product.salePrice?.toLocaleString()}</span>
                    <span className="text-xl text-muted-foreground line-through">${product.price.toLocaleString()}</span>
                    <Badge className="bg-red-600">SAVE ${(product.price - (product.salePrice || 0)).toLocaleString()}</Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-zinc-900">${product.price.toLocaleString()}</span>
                )}
              </div>

              <p className="text-zinc-600 leading-relaxed mb-8 text-lg">
                The {product.name} is engineered for those who demand excellence. Whether you're tackling steep mountain trails or cruising through city streets, this bike delivers unmatched performance, comfort, and style.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>In stock and ready to ship</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <Truck className="h-5 w-5 text-zinc-500" />
                  <span>Free shipping on this item</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => addToCart(product)}
                  size="lg" 
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg rounded-full"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-zinc-200">
                  Find in Store
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-zinc-100">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-6 w-6 text-orange-600" />
                <span className="text-xs font-bold uppercase">Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="h-6 w-6 text-orange-600" />
                <span className="text-xs font-bold uppercase">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="h-6 w-6 text-orange-600" />
                <span className="text-xs font-bold uppercase">Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs/Sections */}
        <div className="space-y-24">
          {/* Specs Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Technical Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {[
                { label: "Frame", value: "M5 alloy chassis and rear-end, Trail Geometry" },
                { label: "Fork", value: "FOX FLOAT 34 Rhythm, GRIP damper" },
                { label: "Rear Shock", value: "FOX FLOAT DPS Performance" },
                { label: "Drivetrain", value: "SRAM NX Eagle, 12-speed" },
                { label: "Brakes", value: "SRAM G2 R, 4-piston caliper, hydraulic disc" },
                { label: "Wheelset", value: "Specialized 29, hookless alloy, 30mm inner width" },
                { label: "Tires", value: "Butcher, GRID TRAIL casing, 29x2.3\"" },
                { label: "Weight", value: "14.2 kg (Size S3)" }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between py-4 border-b border-zinc-100">
                  <span className="font-bold text-zinc-500">{spec.label}</span>
                  <span className="text-zinc-900 text-right max-w-[60%]">{spec.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold">Customer Reviews</h2>
              <Button variant="outline" className="rounded-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Write a Review
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: "Alex Thompson", rating: 5, date: "2 weeks ago", comment: "Absolutely incredible bike. The geometry is perfect for technical climbs and the suspension handles everything I throw at it." },
                { name: "Sarah Miller", rating: 4, date: "1 month ago", comment: "Great performance for the price. Only minor issue was the seat post needed a bit of adjustment out of the box." }
              ].map((review, i) => (
                <div key={i} className="p-6 bg-zinc-50 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarFallback>{review.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex text-orange-600">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`h-3 w-3 ${j < review.rating ? 'fill-current' : 'text-zinc-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Products */}
          <section>
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;