/** Stable identity for a picked file (two different files can share a name). */
export const fileKey = (file: File) => `${file.name}:${file.size}:${file.lastModified}`;
