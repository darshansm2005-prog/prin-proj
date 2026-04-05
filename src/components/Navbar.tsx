"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <Bike className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold tracking-tighter">VELO<span className="text-orange-600">SHOP</span></span>
          </Link>
          
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/shop" className="transition-colors hover:text-orange-600">Shop All</Link>
            <Link to="/shop?category=Mountain" className="transition-colors hover:text-orange-600">Mountain</Link>
            <Link to="/shop?category=Road" className="transition-colors hover:text-orange-600">Road</Link>
            <Link to="/shop?category=Electric" className="transition-colors hover:text-orange-600">Electric</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bikes..."
              className="pl-8 bg-muted/50 border-none focus-visible:ring-orange-600"
            />
          </div>
          
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/shop" className="text-lg font-semibold">Shop All</Link>
                <Link to="/shop?category=Mountain" className="text-lg font-semibold">Mountain</Link>
                <Link to="/shop?category=Road" className="text-lg font-semibold">Road</Link>
                <Link to="/shop?category=Electric" className="text-lg font-semibold">Electric</Link>
                <hr />
                <Link to="/cart" className="text-lg font-semibold">My Cart ({cartCount})</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;