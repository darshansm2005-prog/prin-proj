"use client";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Bike, Heart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <Bike className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
          </Link>
          
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/shop" className="transition-colors hover:text-orange-600">Shop All</Link>
            <Link to="/shop?category=Mountain" className="transition-colors hover:text-orange-600">Mountain</Link>
            <Link to="/shop?category=Road" className="transition-colors hover:text-orange-600">Road</Link>
            <Link to="/shop?category=Electric" className="transition-colors hover:text-orange-600">Electric</Link>
            <Link to="/shop?category=Parts" className="transition-colors hover:text-orange-600">Parts</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden lg:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bikes & parts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-muted/50 border-none focus-visible:ring-orange-600"
            />
          </form>
          
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>

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

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-bold">{user?.name}</span>
                      <span className="text-xs text-muted-foreground font-normal">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">My Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Order History</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="sm" className="hidden md:flex font-bold">
                <Link to="/login">Sign In</Link>
              </Button>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <form onSubmit={handleSearch} className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </form>
                <Link to="/shop" className="text-lg font-semibold">Shop All</Link>
                <Link to="/shop?category=Mountain" className="text-lg font-semibold">Mountain</Link>
                <Link to="/shop?category=Road" className="text-lg font-semibold">Road</Link>
                <Link to="/shop?category=Electric" className="text-lg font-semibold">Electric</Link>
                <Link to="/shop?category=Parts" className="text-lg font-semibold">Parts</Link>
                <hr />
                <Link to="/wishlist" className="text-lg font-semibold">My Wishlist ({wishlistCount})</Link>
                <Link to="/cart" className="text-lg font-semibold">My Cart ({cartCount})</Link>
                {!isAuthenticated && (
                  <Link to="/login" className="text-lg font-semibold text-orange-600">Sign In</Link>
                )}
                {isAuthenticated && (
                  <button onClick={logout} className="text-lg font-semibold text-red-600 text-left">Log Out</button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;