"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-12">Your Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-3xl shadow-sm">
                  <div className="w-full sm:w-32 aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{item.brand}</span>
                        <h3 className="text-xl font-bold hover:text-orange-600 transition-colors">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.category} Bike</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-zinc-400 hover:text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center border rounded-full p-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-zinc-900">
                          ${((item.salePrice || item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Estimated Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-3xl font-extrabold text-orange-600">${cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-zinc-900 hover:bg-orange-600 text-white h-14 text-lg rounded-full transition-colors">
                  <Link to="/checkout">
                    Checkout Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  Secure checkout powered by TRYsycle
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-100 rounded-full mb-6">
              <ShoppingBag className="h-10 w-10 text-zinc-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any bikes to your cart yet.</p>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 rounded-full px-8">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;