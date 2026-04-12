"use client";

import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product, fetchProducts } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Search,
  LayoutDashboard,
  Loader2,
  Tag,
  Eye,
  EyeOff,
  Layers
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [inventory, setInventory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);

  // Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Mountain',
    material: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800',
    isSale: false,
    salePrice: '',
    isHidden: false
  });

  useEffect(() => {
    const loadInventory = async () => {
      setIsLoading(true);
      const data = await fetchProducts(true); // Include hidden products for admin
      setInventory(data);
      setIsLoading(false);
    };
    if (isAdmin) loadInventory();
  }, [isAdmin]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const filteredProducts = inventory.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      // Fallback for demo: remove from local state anyway
      setInventory(prev => prev.filter(p => p.id !== id));
      toast.error("Database error, but removed from local view for demo.");
      return;
    }

    setInventory(prev => prev.filter(p => p.id !== id));
    toast.error("Product removed from inventory");
  };

  const handleToggleHide = async (product: Product) => {
    const newHiddenStatus = !product.isHidden;
    const { error } = await supabase
      .from('products')
      .update({ is_hidden: newHiddenStatus })
      .eq('id', product.id);

    if (error) {
      // Fallback for demo
      setInventory(prev => prev.map(p => 
        p.id === product.id ? { ...p, isHidden: newHiddenStatus } : p
      ));
      toast.info("Database error, but updated local view for demo.");
      return;
    }

    setInventory(prev => prev.map(p => 
      p.id === product.id ? { ...p, isHidden: newHiddenStatus } : p
    ));
    toast.success(newHiddenStatus ? "Product hidden from shop" : "Product visible in shop");
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: newProduct.name,
      brand: newProduct.brand,
      price: Number(newProduct.price),
      category: newProduct.category,
      material: newProduct.material,
      stock: Number(newProduct.stock),
      description: newProduct.description,
      image: newProduct.image,
      images: [newProduct.image],
      is_sale: newProduct.isSale,
      sale_price: newProduct.isSale ? Number(newProduct.salePrice) : null,
      is_hidden: newProduct.isHidden,
      rating: 5.0,
      reviews: 0,
      specs: {
        "Frame": newProduct.material || "Standard Alloy",
        "Warranty": "2 Years"
      }
    };

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();

    if (error) {
      // Fallback for demo: add to local state so user can see it
      const demoProduct = {
        id: `demo-${Math.random().toString(36).substr(2, 9)}`,
        ...productData,
        isSale: productData.is_sale,
        salePrice: productData.sale_price,
        isHidden: productData.is_hidden
      } as Product;
      
      setInventory([demoProduct, ...inventory]);
      setIsAddSheetOpen(false);
      toast.warning("Database table missing. Added to local view for demo.");
      return;
    }

    if (data) {
      const addedProduct = {
        ...data[0],
        isSale: data[0].is_sale,
        salePrice: data[0].sale_price,
        isHidden: data[0].is_hidden
      } as Product;
      
      setInventory([addedProduct, ...inventory]);
      setIsAddSheetOpen(false);
      setNewProduct({
        name: '',
        brand: '',
        price: '',
        category: 'Mountain',
        material: '',
        stock: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800',
        isSale: false,
        salePrice: '',
        isHidden: false
      });
      toast.success(`${addedProduct.name} added to inventory!`);
    }
  };

  const stats = [
    { label: "Total Products", value: inventory.length, icon: Package, color: "text-blue-600" },
    { label: "Hidden Items", value: inventory.filter(p => p.isHidden).length, icon: EyeOff, color: "text-zinc-600" },
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

          <Sheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 h-12 rounded-xl font-bold px-6">
                <Plus className="mr-2 h-5 w-5" /> Add New Product
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader className="mb-8">
                <SheetTitle className="text-2xl font-black">Add New Product</SheetTitle>
              </SheetHeader>
              
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Specialized Turbo Levo" 
                    required 
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input 
                      id="brand" 
                      placeholder="Specialized" 
                      required 
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newProduct.category} 
                      onValueChange={(v) => setNewProduct({...newProduct, category: v as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mountain">Mountain</SelectItem>
                        <SelectItem value="Road">Road</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Gravel">Gravel</SelectItem>
                        <SelectItem value="Parts">Parts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <Input 
                      id="material" 
                      placeholder="e.g. Carbon Fiber, Aluminum" 
                      className="pl-10"
                      value={newProduct.material}
                      onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Regular Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="2999" 
                      required 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input 
                      id="stock" 
                      type="number" 
                      placeholder="10" 
                      required 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    />
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-orange-600" />
                      <Label htmlFor="isSale" className="font-bold">On Sale?</Label>
                    </div>
                    <Switch 
                      id="isSale" 
                      checked={newProduct.isSale}
                      onCheckedChange={(checked) => setNewProduct({...newProduct, isSale: checked})}
                    />
                  </div>
                  {newProduct.isSale && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Label htmlFor="salePrice">Sale Price ($)</Label>
                      <Input 
                        id="salePrice" 
                        type="number" 
                        placeholder="1999" 
                        required={newProduct.isSale}
                        value={newProduct.salePrice}
                        onChange={(e) => setNewProduct({...newProduct, salePrice: e.target.value})}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-zinc-500" />
                    <Label htmlFor="isHidden" className="font-bold">Hide from Shop?</Label>
                  </div>
                  <Switch 
                    id="isHidden" 
                    checked={newProduct.isHidden}
                    onCheckedChange={(checked) => setNewProduct({...newProduct, isHidden: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    placeholder="https://images.unsplash.com/..." 
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the product features..." 
                    className="h-32"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <SheetClose asChild>
                    <Button type="button" variant="outline" className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                  </SheetClose>
                  <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 h-12 rounded-xl font-bold">Save Product</Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
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
            {isLoading ? (
              <div className="py-24 flex justify-center">
                <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-zinc-50">
                  <TableRow>
                    <TableHead className="font-bold">Product</TableHead>
                    <TableHead className="font-bold">Category</TableHead>
                    <TableHead className="font-bold">Material</TableHead>
                    <TableHead className="font-bold">Price</TableHead>
                    <TableHead className="font-bold">Stock</TableHead>
                    <TableHead className="font-bold">Visibility</TableHead>
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
                      <TableCell>
                        <span className="text-sm font-medium text-zinc-600">{product.material || 'N/A'}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-bold ${product.isSale ? 'text-orange-600' : 'text-zinc-900'}`}>
                            ${(product.salePrice || product.price).toLocaleString()}
                          </span>
                          {product.isSale && (
                            <span className="text-[10px] text-zinc-400 line-through">${product.price.toLocaleString()}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${product.stock < 5 ? 'text-red-600' : 'text-zinc-900'}`}>
                            {product.stock}
                          </span>
                          {product.stock < 5 && <AlertCircle className="h-3 w-3 text-red-600" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={product.isHidden ? "text-zinc-400" : "text-green-600"}
                          onClick={() => handleToggleHide(product)}
                        >
                          {product.isHidden ? (
                            <><EyeOff className="h-4 w-4 mr-2" /> Hidden</>
                          ) : (
                            <><Eye className="h-4 w-4 mr-2" /> Visible</>
                          )}
                        </Button>
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
            )}
          </div>
          
          {!isLoading && filteredProducts.length === 0 && (
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