"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Bike, Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Bike className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold tracking-tighter">TRY<span className="text-orange-600">sycle</span></span>
            </Link>
            <p className="text-zinc-400 leading-relaxed">
              The world's leading destination for premium cycling gear. We provide the best bikes and components for every rider.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-lg font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><Link to="/shop?category=Mountain" className="hover:text-orange-500 transition-colors">Mountain Bikes</Link></li>
              <li><Link to="/shop?category=Road" className="hover:text-orange-500 transition-colors">Road Bikes</Link></li>
              <li><Link to="/shop?category=Electric" className="hover:text-orange-500 transition-colors">Electric Bikes</Link></li>
              <li><Link to="/shop?category=Parts" className="hover:text-orange-500 transition-colors">Components</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-zinc-400">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-zinc-400 mb-6">Subscribe to get special offers and first look at new arrivals.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Email address" 
                className="bg-zinc-900 border-zinc-800 focus-visible:ring-orange-600"
              />
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© 2024 TRYsycle. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;