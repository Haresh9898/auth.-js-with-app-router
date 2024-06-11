import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import StoreProvider from "@/components/StoreProvider";
import { ThemeProvider } from "@/components/theme-provide";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo",
  description: "This is todo wep app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
