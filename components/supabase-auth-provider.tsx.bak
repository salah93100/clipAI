"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";

// Étendre le type pour inclure des méthodes de vérification
type SupabaseAuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<boolean>; // Nouvelle méthode
};

const SupabaseAuthContext = createContext<SupabaseAuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signOut: async () => {},
  checkAuth: async () => false, // Valeur par défaut
});

// Liste des routes protégées qui nécessitent une authentification
const PROTECTED_ROUTES = ['/dashboard', '/editor'];
// Liste des routes d'authentification
const AUTH_ROUTES = ['/login', '/signup'];

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Méthode pour vérifier l'authentification
  const checkAuth = async (): Promise<boolean> => {
    try {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        return false;
      }
      
      if (!currentSession) {
        // Tenter de rafraîchir la session si des cookies sont présents
        const hasSbAuthCookie = document.cookie.includes('sb-access-token') || 
                              document.cookie.includes('sb-refresh-token');
        
        if (hasSbAuthCookie) {
          const { data, error: refreshError } = await supabase.auth.refreshSession();
          if (refreshError || !data.session) {
            console.log("Échec du rafraîchissement de session");
            return false;
          }
          return true;
        }
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la vérification d'authentification:", error);
      return false;
    }
  };

  useEffect(() => {
    // Vérifier si la route actuelle nécessite une authentification
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname?.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some(route => pathname?.startsWith(route));
    
    // Gérer la redirection en fonction de l'état d'authentification et de la route
    const handleRouteProtection = async () => {
      if (!pathname) return;
      
      const isAuthenticated = await checkAuth();
      
      if (isProtectedRoute && !isAuthenticated) {
        // Rediriger vers la page de connexion si la route est protégée et l'utilisateur n'est pas authentifié
        console.log("Route protégée, redirection vers login");
        window.location.href = `/login?redirectedFrom=${encodeURIComponent(pathname)}`;
      } else if (isAuthRoute && isAuthenticated) {
        // Rediriger vers le tableau de bord si l'utilisateur est sur une page d'authentification mais déjà connecté
        console.log("Déjà authentifié, redirection vers dashboard");
        window.location.href = "/dashboard";
      }
    };
    
    handleRouteProtection();
  }, [pathname]);

  useEffect(() => {
    // Récupérer la session au chargement
    const initializeAuth = async () => {
      try {
        console.log("Initialisation de l'authentification...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session initiale:", session ? `Utilisateur: ${session.user.email}` : "Aucune session");
        
        setSession(session);
        setUser(session?.user ?? null);

        // Écouter les changements d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log(`Événement d'authentification: ${event}`, session?.user?.email);
            
            setSession(session);
            setUser(session?.user ?? null);
            
            // Redirection automatique pour les événements d'authentification
            if (event === 'SIGNED_IN') {
              console.log("Redirection après connexion...");
              
              // Extraire l'URL de redirection des paramètres si elle existe
              const urlParams = new URLSearchParams(window.location.search);
              const redirectUrl = urlParams.get('redirectedFrom') || '/dashboard';
              
              // Rediriger vers l'URL demandée ou le dashboard par défaut
              window.location.href = redirectUrl;
            } else if (event === 'SIGNED_OUT') {
              console.log("Redirection après déconnexion...");
              window.location.href = '/login';
            } else if (event === 'TOKEN_REFRESHED') {
              console.log("Token rafraîchi avec succès");
              router.refresh();
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Erreur d'initialisation de l'authentification:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router, pathname]);

  const signOut = async () => {
    try {
      console.log("Tentative de déconnexion...");
      await supabase.auth.signOut();
      console.log("Déconnexion réussie");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <SupabaseAuthContext.Provider value={{ user, session, isLoading, signOut, checkAuth }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export const useSupabaseAuth = () => useContext(SupabaseAuthContext); 