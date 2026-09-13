import type { Metadata } from "next";
import { Providers } from "./providers";
import { ClientShell } from "./client-shell";

export const metadata: Metadata = {
  title: "Fun Travels",
  description: "Travel and tour management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentYear = new Date().getUTCFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers><ClientShell currentYear={currentYear}>{children}</ClientShell></Providers>
      </body>
    </html>
  );
}
