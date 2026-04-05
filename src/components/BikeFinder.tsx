"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Bike, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 'terrain',
    question: "Where will you be riding most?",
    options: [
      { label: 'Rugged Trails & Mountains', value: 'Mountain', icon: '🏔️' },
      { label: 'Smooth Pavement & Roads', value: 'Road', icon: '🛣️' },
      { label: 'Mix of Gravel & Dirt', value: 'Gravel', icon: '🏜️' },
      { label: 'City Streets & Commuting', value: 'Electric', icon: '🏙️' },
    ]
  },
  {
    id: 'experience',
    question: "What's your experience level?",
    options: [
      { label: 'Beginner', value: 'beginner', icon: '🌱' },
      { label: 'Intermediate', value: 'intermediate', icon: '🚴' },
      { label: 'Advanced / Pro', value: 'advanced', icon: '🏆' },
    ]
  },
  {
    id: 'budget',
    question: "What's your budget range?",
    options: [
      { label: 'Under $2,000', value: '0-2000', icon: '💰' },
      { label: '$2,000 - $5,000', value: '2000-5000', icon: '💰💰' },
      { label: '$5,000+', value: '5000-10000', icon: '💰💰💰' },
    ]
  }
];

const BikeFinder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleOptionSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: value };
    setAnswers(newAnswers);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - redirect to shop with filters
      const category = newAnswers.terrain;
      setIsOpen(false);
      navigate(`/shop?category=${category}`);
      // Reset for next time
      setCurrentStep(0);
      setAnswers({});
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-white">
          Bike Finder Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
        <DialogHeader className="mb-8">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Bike className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <DialogTitle className="text-2xl font-extrabold">{steps[currentStep].question}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          {steps[currentStep].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className="flex items-center justify-between p-5 rounded-2xl border-2 border-zinc-100 hover:border-orange-600 hover:bg-orange-50 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{option.icon}</span>
                <span className="font-bold text-zinc-900">{option.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-orange-600 transition-colors" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          {currentStep > 0 ? (
            <Button variant="ghost" onClick={() => setCurrentStep(currentStep - 1)} className="text-zinc-500">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : <div />}
          
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 w-8 rounded-full transition-colors ${i === currentStep ? 'bg-orange-600' : 'bg-zinc-100'}`} 
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BikeFinder;