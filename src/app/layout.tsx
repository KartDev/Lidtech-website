import type { Metadata } from "next";
import localFont from "next/font/local";

import { siteConfig } from "@/content/site";

import "./globals.css";

const sans = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "200 800",
});

const serif = localFont({
  src: [
    {
      path: "./fonts/cormorant-garamond-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/cormorant-garamond-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.meta.description,
  applicationName: siteConfig.companyName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: ["/og-image.svg"],
  },
  icons: {
    icon: new URL("favicon.svg", `${siteConfig.url}/`).toString(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
