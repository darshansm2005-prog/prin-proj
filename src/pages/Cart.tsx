"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div className="p-6 bg-zinc-50 rounded-full mb-6">
            <ShoppingBag className="h-12 w-12 text-zinc-300" />
          </div>
          <h2 className="text-3xl font-black mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added any bikes or components to your cart yet.
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 rounded-2xl px-8">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      <main className="container px-4 md:px-8 py-12">
        <h1 className="text-4xl font-black mb-12">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-zinc-100 flex gap-6 items-center">
                <div className="h-24 w-24 bg-zinc-50 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-black text-lg">${((item.salePrice || item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{item.brand} • {item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-zinc-50 rounded-xl p-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 text-white p-8 rounded-3xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tax</span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-3xl font-black text-orange-500">${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 h-14 rounded-2xl text-lg font-bold">
                <Link to="/checkout">
                  Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <p className="text-center text-xs text-zinc-500 mt-6">
                Secure checkout powered by Stripe. All major credit cards accepted.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;