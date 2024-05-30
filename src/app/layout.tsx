import type { Metadata } from "next";
import localFonts from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskify",
  description: "side project",
};

const pretendardFont = localFonts({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendardFont.className}>{children}</body>
    </html>
  );
}
