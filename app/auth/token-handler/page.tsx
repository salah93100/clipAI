"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TokenHandler() {
  const [message, setMessage] = useState("Authentification en cours...");

  useEffect(() => {
    const handleToken = async () => {
      try {
        // Récupérer le fragment d'URL (la partie après le #)
        const hash = window.location.hash.substring(1);
        
        if (!hash || !hash.includes('access_token=')) {
          console.error("Aucun token trouvé dans l'URL");
          setMessage("Erreur d'authentification: token non trouvé");
          setTimeout(() => {
            window.location.href = '/login?error=notoken';
          }, 1500);
          return;
        }
        
        console.log("Token trouvé dans le fragment d'URL");
        
        // Convertir la chaîne du hash en objet URLSearchParams pour extraire les paramètres
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const expiresIn = parseInt(params.get('expires_in') || '3600');
        
        if (!accessToken || !refreshToken) {
          console.error("Tokens incomplets dans l'URL");
          setMessage("Erreur d'authentification: informations incomplètes");
          setTimeout(() => {
            window.location.href = '/login?error=incomplete';
          }, 1500);
          return;
        }
        
        // Calculer la date d'expiration
        const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
        
        console.log("Configuration de la session avec les tokens...");
        
        // Utiliser les tokens pour configurer manuellement la session Supabase
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        
        if (error) {
          console.error("Erreur lors de la définition de la session:", error);
          setMessage("Erreur lors de la configuration de votre session");
          setTimeout(() => {
            window.location.href = '/login?error=session';
          }, 1500);
          return;
        }
        
        console.log("Session établie avec succès:", !!data.session);
        setMessage("Connexion réussie! Redirection...");
        
        // Écrire les cookies directement si le SDK ne le fait pas correctement
        document.cookie = `sb-auth-token-detected=true; path=/; max-age=3600`;
        
        // Redirection immédiate sans délai
        console.log("Redirection immédiate vers le dashboard...");
        window.location.href = '/dashboard';
      } catch (error) {
        console.error("Erreur lors du traitement du token:", error);
        setMessage("Une erreur inattendue s'est produite");
        setTimeout(() => {
          window.location.href = '/login?error=process';
        }, 1500);
      }
    };
    
    handleToken();
  }, []);
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-lg text-center">{message}</p>
    </div>
  );
} 