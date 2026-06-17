import type { Metadata } from "next";
import "./globals.css";

import { PLATFORM_NAME } from "@/lib/platform";

export const metadata: Metadata = {
  title: PLATFORM_NAME,
  description: "An animated ecommerce platform for tech products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
