import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import QueryProvider from "@/components/query-provider";

export const metadata: Metadata = {
  title: "Jira Clone App",
  description: "A Next.js clone of the popular project management tool Jira",
};

const interFonts = Inter({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interFonts.className} antialiased min-h-screen`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
