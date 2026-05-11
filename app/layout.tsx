import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#1a0525",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-animated">{children}</body>
    </html>
  );
}
