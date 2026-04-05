"use client";

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/utils/toast';
import { CreditCard, Truck, ShieldCheck, ArrowLeft, Lock } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      showSuccess("Order placed successfully! Check your email for confirmation.");
      clearCart();
      navigate('/');
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
              <Lock className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-8">Please sign in to your account to complete your purchase.</p>
            <div className="space-y-4">
              <Button asChild className="w-full bg-zinc-900 hover:bg-orange-600 text-white h-12 rounded-xl">
                <Link to="/login" state={{ from: location }}>Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 rounded-xl">
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
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
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="container px-4 md:px-8 py-12">
        <Link to="/cart" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-orange-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Truck className="h-6 w-6 text-orange-600" /> Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={user?.name.split(' ')[0]} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={user?.name.split(' ')[1]} required />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user?.email} required />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Bike Lane" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Portland" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="97201" required />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-orange-600" /> Payment Method
                </h2>
                <div className="space-y-6">
                  <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-orange-600" />
                      <span className="font-bold">Credit or Debit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-zinc-200 rounded" />
                      <div className="w-8 h-5 bg-zinc-200 rounded" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white h-16 text-xl rounded-full transition-all shadow-lg shadow-orange-200"
              >
                {isProcessing ? "Processing..." : `Pay $${cartTotal.toLocaleString()}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-2">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-orange-600">${((item.salePrice || item.price) * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 pt-6 border-t border-zinc-100">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-orange-600">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-zinc-50 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Secure SSL Encryption
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <Truck className="h-4 w-4 text-orange-600" />
                  Insured Shipping Included
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;