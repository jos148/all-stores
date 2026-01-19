import type { Metadata } from "next";
import "./globals.css";
import AppNav from "../components/appNav";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import AppNavWrapper from "./components/AppNavWrapper";
import Footer from "./components/footer";
import SupabaseProvider from "@/lib/supabase/provider";


export const metadata: Metadata = {
  title: "All Stores",
  description: "An e-commerce platform built with Next.js and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/*<SupabaseProvider>*/}
          <div className="flex min-h-screen flex-col">
            <AppNavWrapper />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          {/*</SupabaseProvider>*/}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
