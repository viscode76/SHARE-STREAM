// src/components/HowThisWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { MousePointerClick, CreditCard, PlayCircle, Tv } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "SELECT YOUR PLAN",
    description: "Choose the Netflix premium plan that best suits your streaming needs and duration."
  },
  {
    icon: CreditCard,
    title: "MAKE SECURE PAYMENT",
    description: "Complete your payment through our secure gateway. We support various payment methods."
  },
  {
    icon: PlayCircle,
    title: "ENJOY YOUR SHOWS",
    description: "Receive your login details instantly and dive into your favorite Netflix series and movies."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function HowThisWorks() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 space-y-12 sm:space-y-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6"
      >
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-none tracking-tighter text-white">
          HOW IT WORKS
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm sm:text-base leading-relaxed font-semibold px-2">
          Experience seamless access to Netflix Premium in just three simple steps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex flex-col items-center text-center p-6 bg-[#0c0c0f] border-2 border-zinc-900 rounded-none shadow-lg"
          >
            <div className="text-[#ff007f] mb-4">
              <step.icon className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
              {step.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
