"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bike, ChevronLeft, CreditCard, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: ''
  });

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to complete your purchase");
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    console.log("[Checkout] Starting order process for user:", user.id);
    
    try {
      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: cartTotal,
          shipping_address: formData,
          status: 'completed'
        }])
        .select()
        .single();

      if (orderError) {
        console.error("[Checkout] Order creation error:", orderError);
        throw new Error(`Order failed: ${orderError.message}`);
      }

      if (!order) {
        throw new Error("Order was created but no data was returned. Check database policies.");
      }

      console.log("[Checkout] Order created successfully:", order.id);

      // 2. Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.salePrice || item.price,
        product_name: item.name,
        product_image: item.image
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error("[Checkout] Order items error:", itemsError);
        throw new Error(`Failed to save items: ${itemsError.message}`);
      }

      console.log("[Checkout] Order items saved successfully");

      toast.success("Order placed successfully!");
      clearCart();
      navigate('/profile');
    } catch (error: any) {
      console.error("[Checkout] Final catch error:", error);
      toast.error(error.message || "Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild className="bg-orange-600 rounded-xl"><Link to="/shop">Return to Shop</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-100 py-6">
        <div className="container px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bike className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-black tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
          </Link>
          <Link to="/cart" className="text-sm font-bold text-zinc-500 hover:text-zinc-900 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Cart
          </Link>
        </div>
      </header>

      <main className="container px-4 md:px-8 py-12">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Truck className="h-6 w-6 text-orange-600" /> Shipping Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" required className="rounded-xl" 
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" required className="rounded-xl" 
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" required className="rounded-xl" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" required className="rounded-xl" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2 col-span-2 sm:col-span-1">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input 
                    id="zip" required className="rounded-xl" 
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-orange-600" /> Payment Method
              </h2>
              <div className="space-y-4">
                <div className="p-4 border-2 border-orange-600 bg-orange-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 bg-zinc-900 rounded-md flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                    <span className="font-bold">Credit / Debit Card</span>
                  </div>
                  <div className="h-5 w-5 rounded-full border-4 border-orange-600 bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" required className="rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" required className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required className="rounded-xl" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-zinc-900 text-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-black mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="h-16 w-16 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">${((item.salePrice || item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-800">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-4xl font-black text-orange-500">${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 h-16 rounded-2xl text-xl font-black mt-8 transition-all active:scale-[0.98]"
              >
                {isProcessing ? <Loader2 className="animate-spin" /> : "Place Order Now"}
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 text-xs">
                <ShieldCheck className="h-4 w-4" />
                <span>Secure 256-bit SSL Encrypted Payment</span>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;