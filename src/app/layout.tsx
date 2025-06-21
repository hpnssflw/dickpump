import { Space_Mono } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Crypto Pumper",
  description: "Crypto analytics dashboard and chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
