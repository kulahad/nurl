import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nurl.vercel.app"),
  title: "Nurl",
  description: "Your url shortener",
  icons: "/favicon.ico",
  authors: [{ name: "Mohammed Ahad", url: "https://kulahad.github.io" }],
  openGraph: {
    type: "website",
    url: "https://nurl.vercel.app",
    title: "Nurl",
    description: "Your url shortener ",
    siteName: "Nurl",
    images: [
      {
        url: "/1.png",
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
