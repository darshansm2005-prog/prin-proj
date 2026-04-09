"use client";

import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products as initialProducts, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Search,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [inventory, setInventory] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredProducts = inventory.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setInventory(prev => prev.filter(p => p.id !== id));
    toast.error("Product removed from inventory");
  };

  const stats = [
    { label: "Total Products", value: inventory.length, icon: Package, color: "text-blue-600" },
    { label: "Low Stock Items", value: inventory.filter(p => p.stock < 5).length, icon: AlertCircle, color: "text-red-600" },
    { label: "Total Value", value: `$${inventory.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-zinc-900 mb-2">ADMIN CONSOLE</h1>
            <p className="text-zinc-500">Manage your inventory, stock levels, and product details.</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 h-12 rounded-xl font-bold px-6">
            <Plus className="mr-2 h-5 w-5" /> Add New Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm flex items-center gap-6">
              <div className={`h-14 w-14 rounded-2xl bg-zinc-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-orange-600" /> Product Inventory
            </h2>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-10 rounded-xl border-zinc-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50">
                <TableRow>
                  <TableHead className="font-bold">Product</TableHead>
                  <TableHead className="font-bold">Category</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold">Stock</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                          <img src={product.image} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{product.name}</p>
                          <p className="text-xs text-zinc-500">{product.brand}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-bold">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-bold">${product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${product.stock < 5 ? 'text-red-600' : 'text-zinc-900'}`}>
                          {product.stock}
                        </span>
                        {product.stock < 5 && <AlertCircle className="h-3 w-3 text-red-600" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.stock > 0 ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold">Active</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-bold">Out of Stock</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-zinc-100">
                          <Edit3 className="h-4 w-4 text-zinc-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-12 text-center text-zinc-500">
              No products found matching your search.
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;