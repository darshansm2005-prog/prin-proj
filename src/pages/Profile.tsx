"use client";

import React, { useState } from 'react';
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
  ShoppingBag,
  Switch
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { logAudit } from '@/lib/auditLog';

const Profile = () => {
  const { user, logout, isAuthenticated, enable2FA, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [is2FAToggleOpen, setIs2FAToggleOpen] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [is2FAVerifying, setIs2FAVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase        .from('orders')
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

  // Load 2FA status when component mounts
  useEffect(() => {
    const load2FAStatus = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_2fa_enabled')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setIs2FAEnabled(data.is_2fa_enabled);
      }
    };
    load2FAStatus();
  }, [user]);

  const handle2FAToggle = async () => {
    if (is2FAVerifying) return;
    
    setIs2FAVerifying(true);
    setOtpError('');
    
    // In a real implementation, we'd send the OTP to the user
    // For this demo, we'll just toggle the state
    await enable2FA(!is2FAEnabled);
    setIs2FAVerifying(false);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpCode) return;
    
    const verified = await verify2FA(otpCode);
    if (!verified) {
      setOtpError('Invalid OTP code');
    }
  };

  if (is2FAToggleOpen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-xl flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Enable Two-Factor Authentication</h2>
          {otpError && <p className="text-red-600 mb-4">{otpError}</p>}
          
          <form onSubmit={handleOTPSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Enter OTP Code</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-orange-600 hover:bg-orange-700 rounded-2xl h-12 font-bold"
            >
              Verify OTP
            </Button>
          </form>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              className="rounded-xl h-12 text-sm"
              onClick={() => setIs2FAToggleOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
              <h2 className="text-xl font-bold text-zinc-900 truncate">{user.email}</h2>
              <p className="text-sm text-zinc-500 mb-6">Member since {new Date(user.created_at).getFullYear()}</p>
              
              {/* 2FA Toggle */}
              <div className="flex items-center gap-3 mb-6">
                <Switch                  id="2fa-switch"
                  checked={is2FAEnabled}
                  onCheckedChange={handle2FAToggle}
                  className="relative inline-block h-6 w-11 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after: h-5 after:w-5 after:bg-white after:border-2 after:border-zinc-300 after:rounded-full after:transition-colors"
                />
                <span className="text-sm text-zinc-600">Two-Factor Authentication</span>
              </div>
              
              {is2FAEnabled && (
                <div className="space-y-2">
                  <p className="text-sm text-green-600">Enabled</p>
                  <p className="text-xs text-zinc-500">Your accounts are protected with an additional verification step</p>
                </div>
              )}
              
              <Button variant="outline" onClick={() => setIs2FAToggleOpen(true)} className="w-full rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100">
                {is2FAEnabled ? 'Disable' : 'Enable'} 2FA
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
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mb-2">ORDER HISTORY</h1>
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
                          <p className="text-sm font-bold flex items-center gap-2">
                            <ShoppingBag className="h-3 w-3" /> {order.total_amount.toLocaleString()}
                          </p>
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