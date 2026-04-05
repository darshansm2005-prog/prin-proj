"use client";

import React from 'react';
import { Bike, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Bike className="h-8 w-8 text-orange-600" />
              <span className="text-2xl font-bold tracking-tighter">VELO<span className="text-orange-600">SHOP</span></span>
            </Link>
            <p className="text-sm leading-relaxed">
              Premium cycling gear for enthusiasts and professionals. We provide the best bikes from top brands with expert support.
            </p>
            <div className="flex gap-4">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-orange-500 transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop?category=Mountain" className="hover:text-orange-500 transition-colors">Mountain Bikes</Link></li>
              <li><Link to="/shop?category=Road" className="hover:text-orange-500 transition-colors">Road Bikes</Link></li>
              <li><Link to="/shop?category=Electric" className="hover:text-orange-500 transition-colors">Electric Bikes</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500 transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="hover:text-orange-500 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-orange-500 transition-colors">Bike Assembly</Link></li>
              <li><Link to="#" className="hover:text-orange-500 transition-colors">Warranty</Link></li>
              <li><Link to="#" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Get the latest deals and cycling tips delivered to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-zinc-900 border-zinc-800 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-orange-700 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 VELOSHOP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;