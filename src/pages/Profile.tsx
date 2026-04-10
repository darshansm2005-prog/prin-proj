"use client";

import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Package, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Calendar, 
  CreditCard,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setIsLoading(false);
    };

    if (user) fetchOrders();
  }, [user]);

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm text-center">
              <div className="h-24 w-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-orange-600" />
              </div>
              <h2 className="text-xl font-black text-zinc-900 truncate">{user.email}</h2>
              <p className="text-sm text-zinc-500 mb-6">Member since {new Date(user.created_at).getFullYear()}</p>
              <Button variant="outline" onClick={logout} className="w-full rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>

            <nav className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
              {[
                { label: 'Order History', icon: Package, active: true },
                { label: 'Account Settings', icon: Settings, active: false },
                { label: 'Payment Methods', icon: CreditCard, active: false },
              ].map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center justify-between p-4 text-sm font-bold transition-colors ${
                    item.active ? 'bg-orange-50 text-orange-600' : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900">ORDER HISTORY</h1>
                <p className="text-zinc-500">Track and manage your recent purchases.</p>
              </div>
            </div>

            {isLoading ? (
              <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-orange-600" /></div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
                    <div className="p-6 bg-zinc-50 border-b border-zinc-100 flex flex-wrap justify-between items-center gap-4">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Order Placed</p>
                          <p className="text-sm font-bold flex items-center gap-2">
                            <Calendar className="h-3 w-3" /> {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total</p>
                          <p className="text-sm font-black text-zinc-900">${order.total_amount.toLocaleString()}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold px-4 py-1 rounded-full">
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="p-6 space-y-6">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-6">
                          <div className="h-20 w-20 bg-zinc-50 rounded-2xl overflow-hidden flex-shrink-0">
                            <img src={item.product_image} alt="" className="w-full h-full object-contain p-2" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-zinc-900">{item.product_name}</h4>
                            <p className="text-sm text-zinc-500">Quantity: {item.quantity} • ${item.price_at_time.toLocaleString()}</p>
                          </div>
                          <Button asChild variant="outline" size="sm" className="rounded-xl font-bold">
                            <Link to={`/product/${item.product_id}`}>Buy Again</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl border border-zinc-100">
                <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-10 w-10 text-zinc-300" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">No orders yet</h3>
                <p className="text-zinc-500 mb-8">Your journey starts with your first ride.</p>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 rounded-xl px-8 font-bold">
                  <Link to="/shop">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;