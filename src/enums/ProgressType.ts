export enum ProgressType {
  AUTO = "auto",
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
  NEUTRAL = "neutral",
}

export const ProgressTypeColor = {
  [ProgressType.AUTO]: "blue", [ProgressType.DANGER]: "red", [ProgressType.WARNING]: "orange",
  [ProgressType.SUCCESS]: "green", [ProgressType.INFO]: "cyan", [ProgressType.NEUTRAL]: "gray",
} as const;
