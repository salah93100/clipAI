"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from './supabase-auth-provider';

interface RouteProtectionProps {
  children: React.ReactNode;
}

export default function RouteProtection({ children }: RouteProtectionProps) {
  const { user, session, isLoading, checkAuth } = useSupabaseAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Vérification unique pour éviter les redirections en boucle
    if (authChecked || isLoading || isRedirecting) return;

    const verifyAuthentication = async () => {
      try {
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
          // Rediriger si l'utilisateur n'est pas authentifié
          const currentPath = window.location.pathname;
          console.log("Non authentifié, redirection vers la page de connexion depuis:", currentPath);
          
          // Éviter les redirections multiples
          setIsRedirecting(true);
          window.location.href = `/login?redirectedFrom=${encodeURIComponent(currentPath)}`;
          return;
        }
        
        setAuthChecked(true);
      } catch (error) {
        console.error("Erreur lors de la vérification d'authentification:", error);
        
        // Éviter les redirections multiples
        setIsRedirecting(true);
        window.location.href = '/login';
      }
    };
    
    verifyAuthentication();
  }, [isLoading, checkAuth, router, authChecked, isRedirecting]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading || !authChecked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Vérification de l'authentification...</p>
      </div>
    );
  }

  // Rendu des enfants uniquement si l'utilisateur est authentifié
  return <>{children}</>;
} 