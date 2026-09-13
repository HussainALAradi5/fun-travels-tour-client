export const fadeIn = {
  "0%": { opacity: "0" } as Record<string, string>,
  "100%": { opacity: "1" } as Record<string, string>,
};

export const floatIn = {
  "0%": { opacity: "0", transform: "translateY(10px)" } as Record<string, string>,
  "100%": { opacity: "1", transform: "translateY(0)" } as Record<string, string>,
};

export const slideIn = {
  "0%": { transform: "translateX(-100%)" } as Record<string, string>,
  "100%": { transform: "translateX(0)" } as Record<string, string>,
};

export const slideDown = {
  "0%": { maxHeight: "0", opacity: "0" } as Record<string, string>,
  "100%": { maxHeight: "1000px", opacity: "1" } as Record<string, string>,
};

export const glowPulse = {
  "0%": { boxShadow: "0 0 0px rgba(66, 153, 225, 0)" } as Record<string, string>,
  "50%": { boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)" } as Record<string, string>,
  "100%": { boxShadow: "0 0 0px rgba(66, 153, 225, 0)" } as Record<string, string>,
};

export const barGlow = {
  "0%": { boxShadow: "inset 0 0 5px rgba(66, 153, 225, 0)" } as Record<string, string>,
  "50%": { boxShadow: "inset 0 0 10px rgba(66, 153, 225, 0.5)" } as Record<string, string>,
  "100%": { boxShadow: "inset 0 0 5px rgba(66, 153, 225, 0)" } as Record<string, string>,
};

export const bounceIn = {
  "0%": { opacity: "0", transform: "translateY(-30px) scale(0.95) rotate(-1deg)" } as Record<string, string>,
  "50%": { opacity: "1", transform: "translateY(5px) scale(1.02) rotate(0.5deg)" } as Record<string, string>,
  "100%": { opacity: "1", transform: "translateY(0) scale(1) rotate(0)" } as Record<string, string>,
};

export const ticketDropIn = {
  "0%": { opacity: "0", transform: "scale(0.8) translateY(-20px)" } as Record<string, string>,
  "100%": { opacity: "1", transform: "scale(1) translateY(0)" } as Record<string, string>,
};

export const calendarPopIn = {
  "0%": { opacity: "0", transform: "translateY(-8px) scale(0.97)" } as Record<string, string>,
  "100%": { opacity: "1", transform: "translateY(0) scale(1)" } as Record<string, string>,
};

export const dateSelectPulse = {
  "0%": { transform: "scale(0.75)", opacity: "0.4" } as Record<string, string>,
  "65%": { transform: "scale(1.12)", opacity: "1" } as Record<string, string>,
  "100%": { transform: "scale(1)", opacity: "1" } as Record<string, string>,
};

export const rangeHighlightIn = {
  "0%": { opacity: "0", transform: "scaleX(0.7)" } as Record<string, string>,
  "100%": { opacity: "1", transform: "scaleX(1)" } as Record<string, string>,
};

export const workflowStepComplete = {
  "0%": { transform: "scale(0.85)", opacity: "0.6" } as Record<string, string>,
  "60%": { transform: "scale(1.1)", opacity: "1" } as Record<string, string>,
  "100%": { transform: "scale(1)", opacity: "1" } as Record<string, string>,
};
