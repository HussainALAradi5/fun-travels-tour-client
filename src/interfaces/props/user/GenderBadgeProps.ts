import type { Gender } from "@/enums/Gender";

export interface GenderBadgeProps {
  /** Nothing is shown for accounts that have not set a gender yet. */
  gender?: Gender | null;
  size?: "xs" | "sm" | "md" | "lg";
}
