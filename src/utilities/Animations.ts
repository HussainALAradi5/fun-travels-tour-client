// src/theme/animations.ts
import { defineKeyframes } from "@chakra-ui/react";

export const glowPulse = defineKeyframes({
  "0%": { boxShadow: "0 0 0px rgba(66, 153, 225, 0)" } as any,
  "50%": { boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)" } as any,
  "100%": { boxShadow: "0 0 0px rgba(66, 153, 225, 0)" } as any,
});

export const floatIn = defineKeyframes({
  from: { opacity: 0, transform: "translateY(10px)" } as any,
  to: { opacity: 1, transform: "translateY(0)" } as any,
});

export const barGlow = defineKeyframes({
  "0%, 100%": { 
    opacity: 0.7, 
    boxShadow: "0 0 4px currentColor" 
  } as any,
  "50%": { 
    opacity: 1, 
    boxShadow: "0 0 12px currentColor" 
  } as any,
});

export const slideDownVariant = {
  hidden: { opacity: 0, height: 0, y: -20, transition: { duration: 0.2 } },
  visible: { 
    opacity: 1, 
    height: "auto", 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 25 } 
  },
};
export const slideDown = defineKeyframes({
  from: { 
    opacity: 0, 
    transform: "translateY(-10px)",
    maxHeight: "0px" 
  } as any,
  to: { 
    opacity: 1, 
    transform: "translateY(0)",
    maxHeight: "1000px" 
  } as any,
});

export const ticketDropIn = defineKeyframes({
  "0%": { opacity: 0, transform: "translateY(-30px) scale(0.95) rotate(-1deg)" } as any,
  "50%": { opacity: 1, transform: "translateY(5px) scale(1.02) rotate(0.5deg)" } as any,
  "100%": { opacity: 1, transform: "translateY(0) scale(1) rotate(0)" } as any,
});