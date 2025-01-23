import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

const atkinsonSans = Atkinson_Hyperlegible({
  weight: ["700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Game to test your memory by yourself or with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${atkinsonSans.className} antialiased bg-white-fcf`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
