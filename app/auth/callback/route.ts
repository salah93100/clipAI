import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const next = searchParams.get('next') || '/dashboard';
    
    // Logs supplémentaires pour le debugging
    console.log("URL complète de la requête:", request.url);
    console.log("Paramètres de recherche:", Object.fromEntries(searchParams.entries()));
    console.log("Code:", code ? "Présent" : "Absent");
    console.log("Destination next:", next);
    
    console.log(`Callback OAuth reçu - Code présent: ${!!code}, Erreur: ${error || 'aucune'}`);
    
    // Si nous recevons une erreur "nocode" mais qu'il y a un fragment d'URL,
    // c'est probablement parce que l'access_token est dans le fragment
    if (error === 'nocode') {
      console.log("Détection de l'erreur 'nocode', redirection vers la page de login avec script de récupération");
      
      // Rediriger vers une page intermédiaire qui pourra accéder au fragment
      return NextResponse.redirect(new URL('/auth/token-handler', request.url));
    }
    
    if (!code) {
      console.error("Aucun code d'authentification reçu");
      return NextResponse.redirect(new URL('/login?error=nocode', request.url));
    }
    
    // Échange du code contre une session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error("Erreur lors de l'échange de code:", exchangeError);
      return NextResponse.redirect(new URL('/login?error=exchange', request.url));
    }
    
    console.log("Session créée avec succès après OAuth:", !!data.session);
    
    // Ajouter un cookie spécial pour indiquer une redirection post-auth
    const redirectUrl = new URL(next, request.url);
    console.log("URL de redirection complète:", redirectUrl.toString());
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Ajouter un cookie temporaire pour indiquer une redirection après authentification
    response.cookies.set({
      name: 'post-auth-redirect',
      value: 'true',
      maxAge: 60, // 1 minute
      path: '/',
    });
    
    console.log("Redirection immédiate vers:", next);
    return response;
  } catch (error) {
    console.error("Erreur dans la route de callback:", error);
    // En cas d'erreur, rediriger vers la page de connexion
    return NextResponse.redirect(new URL('/login?error=auth', request.url));
  }
} 