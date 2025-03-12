import type { Metadata } from "next";
import localFonts from "next/font/local";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryProvider } from "../core/providers/react-query-provider";
import { ToastContainer } from "react-toastify";

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
    <html lang="ko" className="h-full">
      <body className={pretendardFont.className + "h-full"}>
        <ToastContainer />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
