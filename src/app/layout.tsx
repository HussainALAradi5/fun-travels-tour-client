import type { Metadata } from "next";
import { Providers } from "./providers";
import { ClientShell } from "./client-shell";

export const metadata: Metadata = {
  title: "Fun Travels",
  description: "Travel and tour management",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers><ClientShell>{children}</ClientShell></Providers>
      </body>
    </html>
  );
}
