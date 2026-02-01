import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KudiKlass - Smart Payments for Nigerian Schools",
  description: "KudiKlass is the leading digital payment platform for Nigerian schools. Manage tuition, meals, trips, and more with our secure, easy-to-use system.",
  keywords: ["school payments", "Nigeria", "education", "fintech", "KudiKlass"],
  authors: [{ name: "KudiKlass Team" }],
  openGraph: {
    title: "KudiKlass - Smart Payments for Nigerian Schools",
    description: "Transform how Nigerian schools handle payments with KudiKlass",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
