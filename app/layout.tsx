import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SupabaseAuthProvider } from "@/components/supabase-auth-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClipAI - Édition vidéo IA pour optimiser votre contenu sur tous les réseaux",
  description: "ClipAI est une plateforme d'édition vidéo alimentée par l'IA qui optimise automatiquement vos vidéos pour tous les formats de réseaux sociaux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}



import './globals.css'