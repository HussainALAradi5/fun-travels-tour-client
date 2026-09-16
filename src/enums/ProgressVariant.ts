export enum ProgressVariant {
  SUBTLE = "subtle",
  SOLID = "solid",
  GRADIENT = "gradient",
  STRIPED = "striped",
  MINIMAL = "minimal",
}

export const ProgressVariantColor = {
  [ProgressVariant.SUBTLE]: "gray", [ProgressVariant.SOLID]: "blue",
  [ProgressVariant.GRADIENT]: "purple", [ProgressVariant.STRIPED]: "orange",
  [ProgressVariant.MINIMAL]: "teal",
} as const;
