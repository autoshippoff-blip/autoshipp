'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FadeInUp = ({ children, delay = 0, duration = 0.6, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, duration = 0.6, className = '' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, duration = 0.5, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration, delay, ease: [0.17, 0.67, 0.83, 0.67] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerContainer = ({ children, delayChildren = 0.1, staggerChildren = 0.1, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren,
          staggerChildren,
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = '', yOffset = 20 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: yOffset },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { ease: [0.21, 0.47, 0.32, 0.98], duration: 0.5 }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Marquee component for infinite scrolling logos
export const Marquee = ({ children, speed = 40, className = '' }) => (
  <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
    <motion.div
      className="flex min-w-full shrink-0 items-center justify-around gap-10 pr-10"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
    >
      {children}
    </motion.div>
    <motion.div
      className="flex min-w-full shrink-0 items-center justify-around gap-10 pr-10"
      animate={{ x: ["0%", "-100%"] }}
      transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  </div>
);
