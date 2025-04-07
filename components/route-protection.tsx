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
  const router = useRouter();

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        if (isLoading) {
          // Attendre que l'état d'authentification soit chargé
          return;
        }
        
        const isAuthenticated = await checkAuth();
        
        if (!isAuthenticated) {
          // Rediriger si l'utilisateur n'est pas authentifié
          const currentPath = window.location.pathname;
          console.log("Non authentifié, redirection vers la page de connexion depuis:", currentPath);
          window.location.href = `/login?redirectedFrom=${encodeURIComponent(currentPath)}`;
          return;
        }
        
        setAuthChecked(true);
      } catch (error) {
        console.error("Erreur lors de la vérification d'authentification:", error);
        window.location.href = '/login';
      }
    };
    
    verifyAuthentication();
  }, [isLoading, checkAuth, router]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Vérification de l'authentification...</p>
      </div>
    );
  }

  // Rendu des enfants uniquement si l'utilisateur est authentifié
  return <>{children}</>;
} 