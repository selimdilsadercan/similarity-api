import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/query-provider";
import ThemeProvider from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";

import Navbar from "@/components/navbar/Navbar";

import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
const font = Inter({ subsets: ["latin"] });

////

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("bg-white text-slate-900 antialiased", font.className)}>
        <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-900">
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              <ToastProvider />
              <Navbar />
              {children}
            </ThemeProvider>
            <div className="h-40 md:hidden"></div>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
