import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = "Emanuel Caballero | Technical Artist Portfolio";
const siteDescription =
  "Technical Artist, Character TD, Pipeline TD and Technical Animator portfolio focused on production-ready rigs, tools, GLB/USD pipelines and real-time workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://emanuel-caballero-technical-artist.vercel.app"),
  title: {
    default: siteTitle,
    template: "%s | Emanuel Caballero",
  },
  description: siteDescription,
  applicationName: "Emanuel Caballero Technical Artist Portfolio",
  creator: "Emanuel Caballero",
  authors: [{ name: "Emanuel Caballero" }],
  keywords: [
    "Technical Artist",
    "Character TD",
    "Pipeline TD",
    "Technical Animator",
    "Rigging",
    "Python Tools",
    "Maya",
    "Unreal Engine",
    "GLB",
    "USD",
    "Game Art Pipeline",
  ],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: siteDescription,
    siteName: "Emanuel Caballero Technical Artist Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
