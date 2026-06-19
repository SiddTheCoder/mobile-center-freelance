import type { Metadata } from "next";
import "./globals.css";

import { AuthSessionProvider } from "@/components/auth-session-provider";
import { PLATFORM_LOGO_SRC, PLATFORM_NAME } from "@/lib/platform";

export const metadata: Metadata = {
  title: PLATFORM_NAME,
  description: "An animated ecommerce platform for tech products.",
  icons: {
    icon: [
      {
        url: PLATFORM_LOGO_SRC,
        type: "image/png",
        sizes: "870x565",
      },
    ],
    apple: [
      {
        url: PLATFORM_LOGO_SRC,
        type: "image/png",
        sizes: "870x565",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full bg-background text-foreground">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
