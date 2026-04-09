"use client";

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bike, ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Mountain', path: '/shop?category=Mountain' },
    { name: 'Road', path: '/shop?category=Road' },
  ];

  // Determine if we should use the "dark" version of the nav (dark text/icons)
  // We use it if the user has scrolled OR if we are not on the home page (since other pages have white backgrounds)
  const isHomePage = location.pathname === "/";
  const forceDarkNav = !isHomePage;
  const shouldShowDarkNav = isScrolled || forceDarkNav;

  const navTextColor = shouldShowDarkNav ? "text-zinc-900" : "text-white";
  const navIconColor = shouldShowDarkNav ? "text-zinc-700" : "text-white";
  
  const navHoverClasses = shouldShowDarkNav 
    ? "hover:bg-zinc-100 hover:text-orange-600" 
    : "hover:bg-white/10 hover:text-white";

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-6",
      shouldShowDarkNav 
        ? "bg-white/95 backdrop-blur-md border-b border-zinc-100 py-4 shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-orange-600 p-2 rounded-2xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-orange-600/20">
            <Bike className="h-6 w-6 text-white" />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter transition-colors duration-300",
            navTextColor
          )}>
            TRY<span className="text-orange-600">sycle</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path.includes('?') && location.search === link.path.split('?')[1]);
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  isActive ? "text-orange-600" : navTextColor,
                  shouldShowDarkNav ? "hover:text-orange-600" : "hover:text-orange-400"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 md:space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full hidden md:flex transition-all duration-300", 
              navIconColor, 
              navHoverClasses
            )}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/wishlist">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full relative transition-all duration-300", 
                navIconColor, 
                navHoverClasses
              )}
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/cart">
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "rounded-full relative transition-all duration-300", 
                navIconColor, 
                navHoverClasses
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-white",
                  shouldShowDarkNav ? "bg-zinc-900" : "bg-orange-500"
                )}>
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <div className="hidden md:block h-6 w-px bg-zinc-200/20 mx-2" />

          {user ? (
            <Button 
              variant="outline" 
              onClick={logout} 
              className={cn(
                "rounded-full hidden md:flex font-bold border-2 transition-all",
                shouldShowDarkNav 
                  ? "border-zinc-200 text-zinc-900 hover:bg-zinc-900 hover:text-white hover:border-zinc-900" 
                  : "border-white/20 text-white hover:bg-white hover:text-zinc-900 hover:border-white"
              )}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className={cn(
                "rounded-full px-8 font-bold hidden md:flex transition-all shadow-lg",
                shouldShowDarkNav 
                  ? "bg-zinc-900 hover:bg-orange-600 text-white shadow-zinc-900/10" 
                  : "bg-white hover:bg-orange-600 text-zinc-900 hover:text-white shadow-white/10"
              )}>
                Login
              </Button>
            </Link>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "lg:hidden rounded-full transition-all duration-300", 
              navIconColor, 
              navHoverClasses
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-100 p-8 space-y-6 animate-in slide-in-from-top duration-300 shadow-2xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="block text-2xl font-black text-zinc-900 hover:text-orange-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-zinc-100">
            {!user && (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-2xl h-14 font-bold text-lg shadow-lg shadow-orange-600/20">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;