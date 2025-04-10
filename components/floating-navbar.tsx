"use client";

import Link from "next/link";
import { Film, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingNavbarProps {
  className?: string;
}

export function FloatingNavbar({ className }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Détecter le défilement pour ajouter plus d'ombre/opacité à la navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Fermer le menu mobile lorsqu'on clique sur un lien
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Empêcher le défilement du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-screen-xl px-4">
      <div
        className={cn(
          "flex items-center justify-between rounded-2xl backdrop-blur-md transition-all duration-300",
          "border border-zinc-200/30 shadow-sm bg-white/80 dark:bg-zinc-900/70 dark:border-zinc-800/30",
          "py-3 px-4 md:px-6 mx-auto", 
          scrolled ? "shadow-md bg-white/90 dark:bg-zinc-900/90" : "shadow-sm",
          className
        )}
      >
        {/* Logo et Marque */}
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            ClipAI
          </span>
        </div>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-1">
          <Link 
            href="#solutions" 
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
          >
            Solutions
          </Link>
          <Link 
            href="#why-clipai" 
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
          >
            Pourquoi ClipAI
          </Link>
          <Link 
            href="#formats" 
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
          >
            Formats
          </Link>
          <Link 
            href="#pricing" 
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
          >
            Tarification
          </Link>
          <Link 
            href="#testimonials" 
            className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
          >
            Témoignages
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link 
            href="/login" 
            className="hidden sm:inline-flex text-sm font-medium rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
          >
            Connexion
          </Link>
          <Button 
            size="sm" 
            className="font-medium shadow-sm hover:shadow transition-all"
            asChild
          >
            <Link href="/signup">Démarrer</Link>
          </Button>

          {/* Bouton menu mobile */}
          <button 
            className="md:hidden p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-transform active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span className={cn(
                "absolute block h-0.5 w-5 bg-foreground rounded-sm transition-all duration-300",
                mobileMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0.5"
              )} />
              <span className={cn(
                "absolute block h-0.5 bg-foreground rounded-sm transition-all duration-300",
                mobileMenuOpen ? "opacity-0 w-0" : "opacity-100 w-5 top-2"
              )} />
              <span className={cn(
                "absolute block h-0.5 w-5 bg-foreground rounded-sm transition-all duration-300",
                mobileMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-3.5"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[72px] z-40 w-full max-w-screen-xl mx-auto px-4 transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8 pointer-events-none"
        )}
      >
        <div className="mt-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 p-4 shadow-lg">
          <nav className="flex flex-col space-y-1">
            <Link 
              href="#solutions" 
              className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
              onClick={closeMobileMenu}
            >
              Solutions
            </Link>
            <Link 
              href="#why-clipai" 
              className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
              onClick={closeMobileMenu}
            >
              Pourquoi ClipAI
            </Link>
            <Link 
              href="#formats" 
              className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700" 
              onClick={closeMobileMenu}
            >
              Formats
            </Link>
            <Link 
              href="#pricing" 
              className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
              onClick={closeMobileMenu}
            >
              Tarification
            </Link>
            <Link 
              href="#testimonials" 
              className="p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
              onClick={closeMobileMenu}
            >
              Témoignages
            </Link>
            <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800">
              <Link 
                href="/login" 
                className="block p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors sm:hidden active:scale-95 active:bg-zinc-200 dark:active:bg-zinc-700"
                onClick={closeMobileMenu}
              >
                Connexion
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 