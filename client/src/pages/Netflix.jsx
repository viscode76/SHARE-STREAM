"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  Lock,
  RefreshCw,
  X,
  Tv,
  AlertCircle
} from "lucide-react";
import HowThisWorks from "../components/HowThisWorks";


// Netflix Custom Duration Plans
const netflixPlans = [
  {
    id: "netflix-1m",
    name: "1 MONTH PLAN",
    durationText: "1 Month 1 Screen Access",
    price: 99,
    badge: "STARTER TIER",
    badgeColor: "bg-zinc-800 text-zinc-400 border-zinc-700",
    savingsText: "Save ₹550 on one month",
    mathBasis: "₹649 official cost ÷ 5 screens = ₹129.80",
    description: "Full Netflix Premium UHD screen slot access. Perfect for testing one month plan.",
    stock: Math.floor(Math.random() * 28) + 1
  },
  {
    id: "netflix-3m",
    name: "3 MONTHS PLAN",
    durationText: "3 Months 1 Screen Access",
    price: 299,
    badge: "MOST POPULAR",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    savingsText: "Save ₹150 over retail",
    mathBasis: "₹1,947 official cost ÷ 5 screens = ₹389.40",
    description: "Quarterly slots matched in priority queue. Continuous profile PIN lock.",
    stock: Math.floor(Math.random() * 28) + 1
  },
  {
    id: "netflix-6m",
    name: "6 MONTHS PLAN",
    durationText: "6 Months 1 Screen Access",
    price: 599,
    badge: "SUPER VALUE",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    savingsText: "Save ₹350 over retail",
    mathBasis: "₹3,894 official cost ÷ 5 screens = ₹778.80",
    description: "Half-yearly screen security. Automatic password rotations fully synced.",
    stock: Math.floor(Math.random() * 28) + 1
  },
  {
    id: "netflix-1y",
    name: "1 YEAR PLAN",
    durationText: "12 Months 1 Screen Access",
    price: 999,
    badge: "MAXIMUM SAVINGS",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    savingsText: "Save ₹780 over retail",
    mathBasis: "₹7,788 official cost ÷ 5 screens = ₹1,557.60",
    description: "Annual permanent screen slot inside the group. Highest priority matches.",
    stock: Math.floor(Math.random() * 28) + 1
  }
];

// Mock Purchases from Indian Cities within 10 hours
const mockPurchases = [
  { name: "Aravind", city: "Chennai", plan: "1 YEAR PLAN", time: "2 hours ago" },
  { name: "Neha", city: "Mumbai", plan: "3 MONTHS PLAN", time: "30 minutes ago" },
  { name: "Rohan", city: "Delhi", plan: "1 MONTH PLAN", time: "1 hour ago" },
  { name: "Priya", city: "Bengaluru", plan: "6 MONTHS PLAN", time: "5 hours ago" },
  { name: "Vikram", city: "Hyderabad", plan: "3 MONTHS PLAN", time: "4 hours ago" },
  { name: "Anjali", city: "Pune", plan: "1 YEAR PLAN", time: "8 hours ago" },
  { name: "Kabir", city: "Kolkata", plan: "1 MONTH PLAN", time: "10 minutes ago" },
  { name: "Diya", city: "Ahmedabad", plan: "6 MONTHS PLAN", time: "3 hours ago" },
  { name: "Raj", city: "Jaipur", plan: "3 MONTHS PLAN", time: "9 hours ago" },
  { name: "Simran", city: "Chandigarh", plan: "1 YEAR PLAN", time: "6 hours ago" }
];

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function NetflixPage() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1=form, 2=matching, 3=success
  const [matchingProgress, setMatchingProgress] = useState(0);

  // Social Proof Toast State
  const [currentNotif, setCurrentNotif] = useState(0);
  const [notifVisible, setNotifVisible] = useState(false);

  // Simulated Matching progress using standard setInterval
  useEffect(() => {
    let interval;
    if (checkoutStep === 2) {
      setMatchingProgress(0);
      interval = setInterval(() => {
        setMatchingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setCheckoutStep(3);
            return 100;
          }
          return prev + 5;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [checkoutStep]);

  // Social Proof Toast Loop Effect
  useEffect(() => {
    // Show first toast after 3 seconds
    const initialTimer = setTimeout(() => {
      setNotifVisible(true);
    }, 3000);

    // Looping schedule: every 20 seconds (5s visible, 15s off)
    const loopInterval = setInterval(() => {
      setNotifVisible(false);
      // Wait for exit animation to complete, then slide up next index
      setTimeout(() => {
        setCurrentNotif((prev) => (prev + 1) % mockPurchases.length);
        setNotifVisible(true);
      }, 800);
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, []);

  // Open Checkout Modal
  const handleCheckoutOpen = (plan) => {
    setSelectedPlan(plan);
    setCheckoutStep(1);
    setMatchingProgress(0);
    setCheckoutModalOpen(true);
  };

  const handleWhatsappUrl = async() => {
    window.location.href = "https://shorturl.at/dITZ2";
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  };

  return (
    <div className="min-h-screen bg-[#030304] text-[#f4f4f5] font-sans antialiased relative overflow-x-hidden">

      {/* Vice City Sunset Backdrop Glows (Floating loops in Framer Motion) */}
      <motion.div
        animate={{
          x: [0, 15, -15, 0],
          y: [0, -20, 20, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "easeInOut"
        }}
        className="absolute top-[15%] left-[10%] sm:left-[30%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#ff007f]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -20, 20, 0],
          y: [0, 15, -15, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "easeInOut"
        }}
        className="absolute top-[35%] right-[10%] sm:right-[20%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-[#f97316]/5 rounded-full blur-[90px] sm:blur-[100px] pointer-events-none z-0"
      />

      {/* Vice City Neon Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 pointer-events-none z-0"></div>

      {/* Rockstar Header nav */}
      <header className="sticky top-0 z-40 w-full bg-[#030304]/90 border-b-2 border-zinc-900 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <span className="text-xl sm:text-2xl font-black tracking-widest text-transparent bg-gradient-to-r from-[#ff007f] via-[#ec4899] to-[#f97316] bg-clip-text uppercase cursor-pointer">
              SHARE-STREAM
            </span>
          </Link>

          {/* <Link href="/" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
            ← BACK TO CHANNELS
          </Link> */}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative z-10 space-y-12 sm:space-y-16">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#E50914]">
            <Tv className="h-3.5 w-3.5" /> DEDICATED NETFLIX SPECIFICATION
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter text-white">
            NETFLIX PREMIUM PLANS
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm sm:text-base leading-relaxed font-semibold px-2">
            Choose your Premium Plan. We add you instantly in active 5-person billing streams. Each user gets an independent watch profile secured with a private 4-digit PIN lock. 100% legal UHD 4K access.
          </p>
        </motion.div>

        {/* 4-Plan Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {netflixPlans.map((plan) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.015, borderColor: "#ff007f" }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              key={plan.id}
              onClick={() => handleWhatsappUrl()}
              className="bg-[#0c0c0f] border-2 border-zinc-900 p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-colors relative rounded-lg"
            >
              <div>
                {/* Plan Header */}
                <div className="flex justify-between items-start mb-4">
                  <span className="font-extrabold tracking-widest text-[#E50914] text-xs">NETFLIX</span>
                  <span className={`text-[8px] px-2 py-0.5 rounded font-black tracking-widest border uppercase ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                  {plan.name}
                </h3>
                <span className="block text-zinc-500 text-[10px] sm:text-xs font-semibold mt-1 tracking-wider uppercase">
                  {plan.durationText}
                </span>

                <p className="text-zinc-500 text-xs mt-3 leading-relaxed font-semibold">
                  {plan.description}
                </p>

                <p className="text-emerald-400 text-xs mt-3 leading-relaxed font-semibold">
                  Available Stock: {plan.stock}
                </p>

                {/* Price Display */}
                <div className="mt-5 sm:mt-6 pb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono leading-none">₹{plan.price}</span>
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-wider">/ Month</span>
                  </div>
                  <span className="text-emerald-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest block mt-1.5">
                    {plan.savingsText}
                  </span>
                </div>
                {/* Cost Basis Info */}
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest pb-3 border-b border-zinc-900 leading-normal">
                  Split Basis: {plan.mathBasis}
                </div>

                {/* Features Checkmarks */}
                <ul className="space-y-2 mt-5 text-[9px] font-black uppercase tracking-wider text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>4K Ultra HD Streaming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>Private Profile Screen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>Support All Device</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>Private 4-Digit PIN Lock</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>No Household Issue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#ff007f] shrink-0" />
                    <span>24 x 7 Customer Support</span>
                  </li>
                </ul>
              </div>

              {/* CTA button */}
              <div className="mt-6 sm:mt-8">
                <button
                  className="w-full bg-[#111115] group-hover:bg-white text-white group-hover:text-black border-2 border-zinc-800 hover:border-white font-black text-xs py-3 rounded-none uppercase tracking-widest transition-colors duration-250"
                >
                  Get Offer
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <HowThisWorks/>

        {/* Trust factor highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-[#0c0c0f] border-2 border-zinc-900 p-6 sm:p-8 rounded-none"
        >
          <div className="flex gap-4">
            <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-[#ff007f] shrink-0" />
            <div>
              <h4 className="font-black text-white text-[11px] sm:text-xs uppercase tracking-widest">PROFILES PIN LOCKS</h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-semibold">Your algorithms, recommendations, and search lists are protected inside your own PIN-locked space.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <RefreshCw className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-400 shrink-0" />
            <div>
              <h4 className="font-black text-white text-[11px] sm:text-xs uppercase tracking-widest">SMART SCHEDULER CHECKUPS</h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-semibold">Validation trackers constantly check slot password syncs. Real-time credential resets run in the background.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400 shrink-0" />
            <div>
              <h4 className="font-black text-white text-[11px] sm:text-xs uppercase tracking-widest">100% LEGAL CO-BILLING</h4>
              <p className="text-zinc-500 text-xs mt-1.5 leading-relaxed font-semibold">Group slots operate purely under official multidevice family plans. Fully transparent splitting admin rules.</p>
            </div>
          </div>
        </motion.div>

        

      </main>

      {/* Rockstar style footer */}
      <footer className="bg-zinc-950 border-t-2 border-zinc-900 py-12 sm:py-16 text-zinc-500 text-xs relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-lg font-black tracking-widest text-white uppercase">SHARE-STREAM</span>
            <p className="text-zinc-600 font-semibold text-[11px] mt-5">Indian billing matching coordinator for Netflix premium family pools.</p>
          </div>

          <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} SHARE-STREAM SYSTEMS INC.
          </div>
        </div>
      </footer>

      {/* Rockstar Overlay matching checkout modal */}
      <AnimatePresence>
        {checkoutModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#0a0a0d] border-2 border-zinc-700 p-5 sm:p-6 shadow-2xl space-y-6 overflow-hidden rounded-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="absolute top-4 right-4 p-1 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title */}
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2 uppercase tracking-widest">
                  <ShieldCheck className="h-5 w-5 text-[#ff007f]" />
                  SLOT SECURE CHECKOUT
                </h3>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Razorpay UPI payment matching link</p>
              </div>

              {checkoutStep === 1 ? (
                /* Step 1: Form Inputs */
                <form onSubmit={handlePaymentSubmit} className="space-y-4">

                  {/* Summary */}
                  <div className="bg-[#111115] border-2 border-zinc-900 p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-white text-xs uppercase tracking-wide">NETFLIX PREMIUM</h4>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{selectedPlan.durationText}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-white font-mono">₹{selectedPlan.price}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">one-time</span>
                    </div>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4 text-xs font-bold uppercase tracking-widest">
                    <div>
                      <label className="block text-[9px] font-black tracking-widest mb-1.5 text-zinc-500">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="ADITYA SHARMA"
                        className="w-full bg-[#111115] border-2 border-zinc-900 rounded-none px-3.5 py-3 text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#ff007f] focus:bg-[#15151b] font-medium tracking-normal uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest mb-1.5 text-zinc-500">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ADITYA@EXAMPLE.COM"
                        className="w-full bg-[#111115] border-2 border-zinc-900 rounded-none px-3.5 py-3 text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#ff007f] focus:bg-[#15151b] font-medium tracking-normal uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black tracking-widest mb-1.5 text-zinc-500">Mobile Number (10 Digit)</label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        className="w-full bg-[#111115] border-2 border-zinc-900 rounded-none px-3.5 py-3 text-white placeholder:text-zinc-800 focus:outline-none focus:border-[#ff007f] focus:bg-[#15151b] font-medium tracking-normal"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#ff007f] hover:bg-pink-600 text-white font-black text-xs py-4 rounded-none uppercase tracking-widest"
                  >
                    PAY ₹{selectedPlan.price} & ALLOCATE SLOT
                  </motion.button>
                </form>
              ) : checkoutStep === 2 ? (
                /* Step 2: Match loader */
                <div className="text-center py-6 space-y-6">
                  <div className="relative h-16 w-16 mx-auto">
                    <div className="absolute inset-0 border-4 border-zinc-900"></div>
                    <div className="absolute inset-0 border-4 border-[#ff007f] border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-6 w-6 text-[#ff007f]" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-black text-white text-xs uppercase tracking-widest">ALLOCATING GROUP SLOT...</h4>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-1.5">Matching you with active group members</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2 max-w-[200px] mx-auto">
                    <div className="flex justify-between text-[9px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                      <span>MATCHING DATABASE...</span>
                      <span>{matchingProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-none overflow-hidden">
                      <div
                        className="h-full bg-[#ff007f] transition-all duration-75"
                        style={{ width: `${matchingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 3: Success */
                <div className="text-center py-4 space-y-5">
                  <div className="h-12 w-12 mx-auto bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-white text-base uppercase tracking-widest">SLOT MATCHED SUCCESS!</h4>
                    <p className="text-zinc-400 text-xs">You are allocated to <strong>Netflix Group #3904</strong>.</p>
                  </div>

                  {/* Order Receipt */}
                  <div className="bg-[#111115] border-2 border-zinc-900 p-4 text-left space-y-4">
                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2 flex justify-between">
                      <span>ORDER RECEIPT</span>
                      <span className="text-emerald-400 font-bold">PAID</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                      <div>
                        <span className="text-zinc-500 block text-[9px]">Transaction Ref</span>
                        <span className="text-white font-mono font-medium text-[11px]">VS-8391-IND</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px]">Status</span>
                        <span className="text-emerald-400">DISPATCHED</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px]">Screen Allocated</span>
                        <span className="text-[#ff007f] font-black">PROFILE SCREEN #3</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[9px]">Profile Security</span>
                        <span className="text-white">4-DIGIT PIN GUARD</span>
                      </div>
                    </div>
                    <div className="border-t border-zinc-900 pt-3">
                      <span className="text-zinc-500 block text-[9px]">DELIVERY DESTINATION</span>
                      <p className="text-white font-mono text-[10px] lowercase leading-relaxed font-semibold">Your login link and secure configuration PIN instructions have been dispatched to your email address.</p>
                    </div>
                  </div>

                  <div className="bg-zinc-950 border border-zinc-900 p-3.5 text-[9px] font-black uppercase tracking-wider text-zinc-500 flex gap-2 text-left">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                    <span>
                      Instructions and login credentials have been sent to your email. Stream immediately.
                    </span>
                  </div>

                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="w-full bg-[#111115] hover:bg-white text-white hover:text-black border-2 border-zinc-800 hover:border-white font-black text-xs py-3 rounded-none uppercase tracking-widest transition-colors duration-200"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      

      {/* Dynamic Social Proof Notification Popup (Cycles mockPurchases from Indian cities under 10 hours) */}
      <AnimatePresence>
        {notifVisible && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
              exit: { opacity: 0, y: 20, scale: 0.95 }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto z-50 max-w-sm bg-[#0c0c0f] border-2 border-zinc-900 p-4 shadow-2xl flex items-start gap-3 rounded-none text-left"
          >
            {/* Verified checkmark badge */}
            <div className="h-6 w-6 mt-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>

            {/* Notification Body */}
            <div className="flex-1 pr-4">
              <div className="text-[9px] font-black uppercase tracking-widest text-[#ff007f] mb-1">
                VERIFIED CUSTOMERS
              </div>
              <p className="text-[11px] text-zinc-300 font-semibold leading-relaxed">
                <strong className="text-white font-extrabold">{mockPurchases[currentNotif].name}</strong> ({mockPurchases[currentNotif].city}) purchased a <span className="text-[#ff007f] font-black">{mockPurchases[currentNotif].plan}</span> plan.
              </p>
              <span className="block text-[9px] font-mono text-zinc-600 font-bold uppercase tracking-wider mt-1.5">
                {mockPurchases[currentNotif].time}
              </span>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setNotifVisible(false)}
              className="p-1 text-zinc-650 hover:text-white transition-colors self-start shrink-0"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

        
    </div>
  );
}
