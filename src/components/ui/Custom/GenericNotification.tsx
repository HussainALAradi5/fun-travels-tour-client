import { toaster } from "@/components/ui/toaster";

export type NotificationVariant = "success" | "error" | "warning" | "info" | "alert";

interface NotifyProps {
  title: string;
  description?: string;
  type?: NotificationVariant;
}

// === GLOBAL ESCAPE KEY LISTENER ===
// Instantly clears any toast blocking the screen when you press 'Esc'
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toaster.dismiss(); 
    }
  });
}

export const notify = ({ title, description, type = "info" }: NotifyProps) => {
  toaster.create({
    title: title,
    description: description,
    type: type === "alert" ? "warning" : type, 
    duration: 5000,
    closable: true, 
  });
};