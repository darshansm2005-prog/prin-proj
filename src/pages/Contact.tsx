"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div>
            <span className="text-orange-600 font-black tracking-widest uppercase text-sm">Get in Touch</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 mt-4 mb-8">
              LET'S START A <br /><span className="text-orange-600">CONVERSATION.</span>
            </h1>
            <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
              Have questions about a specific model or need technical advice? Our team of pro mechanics and riders is here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold">hello@trysycle.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="h-14 w-14 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Visit Us</p>
                  <p className="text-lg font-bold">123 Velodrome Way, Portland, OR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-50 p-8 md:p-12 rounded-[40px] border border-zinc-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required className="h-12 rounded-xl bg-white border-zinc-200" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="h-12 rounded-xl bg-white border-zinc-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" required className="h-12 rounded-xl bg-white border-zinc-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us more..." className="h-32 rounded-xl bg-white border-zinc-200" required />
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 h-14 rounded-2xl text-lg font-bold">
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;