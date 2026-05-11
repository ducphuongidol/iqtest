import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Ai Thông Minh Hơn Học Sinh Lớp 5? – Thử Thách IQ 🧠",
  description:
    "Tham gia Thử Thách IQ để xem liệu bạn có thực sự thông minh hơn một học sinh lớp 5 không nhé! 💕",
  keywords: ["test iq", "ai thong minh hon hoc sinh lop 5", "trắc nghiệm iq", "iq vui"],
  authors: [{ name: "IQ Challenge" }],
  openGraph: {
    title: "Ai Thông Minh Hơn Học Sinh Lớp 5? 🧠",
    description:
      "Mình vừa làm bài Test IQ này và kết quả thật bất ngờ. Thử ngay xem bạn có thông minh hơn học sinh lớp 5 không! 💀✨",
    type: "website",
    siteName: "Thử Thách IQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thử Thách IQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thử Thách IQ 🧠",
    description: "Khám phá chỉ số IQ của bạn ngay. Kết quả có thể gây sốc! 💕",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1a0525",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased bg-[#0f0616] selection:bg-pink-500/30">
        {children}
      </body>
    </html>
  );
}
