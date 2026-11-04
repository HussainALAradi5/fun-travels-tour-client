/** What a stored file is for; mirrors the server's MediaCategory. */
export const MediaCategory = {
  REPORT: "REPORT",
} as const;

export type MediaCategory = (typeof MediaCategory)[keyof typeof MediaCategory];
