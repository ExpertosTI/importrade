import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { APP_CONFIG } from "@/lib/config";
import { AppLoader } from "./components/AppLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
    template: `%s | ${APP_CONFIG.name}`
  },
  description: APP_CONFIG.description,
  keywords: [
    "importaciones",
    "China",
    "logística",
    "aduanas",
    "transporte",
    "comercio internacional",
    "República Dominicana",
    "compras por container",
    "envíos marítimos",
    "agencia de aduanas"
  ],
  authors: [{ name: "ImporTrade by Renace Logistics", url: "https://renace.do" }],
  creator: "ImporTrade",
  publisher: "ImporTrade",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    url: "https://renace.do",
    siteName: APP_CONFIG.name,
    title: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
    description: APP_CONFIG.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
    description: APP_CONFIG.description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-DO">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Renace" />
        <meta name="application-name" content="Renace" />
        <meta name="msapplication-TileImage" content="/icon-144x144.png" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//renace.do" />
        <link rel="canonical" href="https://renace.do" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLoader>
          {children}
        </AppLoader>
      </body>
    </html>
  );
}
