import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BitLinks",
  description: "BitLinks is a URL shortening service that allows you to shorten long URLs to short URLs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className=" max-h-[15vh]">
          <Navbar/>
        </div>
        <div className="min-h-[75vh]">
          {children}
        </div>
        <div className="max-h-[10vh] bottom-0">
          <Footer/>
        </div>
      </body>
    </html>
  );
}
