"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

// Composant qui utilise useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const registeredParam = searchParams.get("registered");
  const errorParam = searchParams.get("error");
  const redirectedFromParam = searchParams.get("redirectedFrom");

  useEffect(() => {
    // Vérifier s'il existe déjà une session active
    const checkExistingSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Login page - Vérification de session:", data.session ? "Session active" : "Pas de session");
        
        // Commenter la redirection automatique qui peut causer des boucles
        // if (data.session) {
        //   console.log("Session détectée sur la page de login, redirection vers le dashboard");
        //   setTimeout(() => {
        //     window.location.href = redirectedFromParam || "/dashboard";
        //   }, 100);
        // }
      } catch (error) {
        console.error("Erreur lors de la vérification de session:", error);
      }
    };
    
    checkExistingSession();
    
    if (registeredParam === "true") {
      setShowSuccessMessage(true);
    }
    
    if (errorParam) {
      switch (errorParam) {
        case 'nocode':
          console.log("Redirection vers token-handler...");
          if (window.location.hash && window.location.hash.includes('access_token=')) {
            window.location.href = '/auth/token-handler' + window.location.hash;
            return;
          }
          setError("Erreur d'authentification: code non reçu");
          break;
        case 'notoken':
          setError("Échec de l'authentification: token non trouvé");
          break;
        case 'incomplete':
          setError("Échec de l'authentification: informations incomplètes");
          break;
        case 'session':
          setError("Échec de l'initialisation de la session");
          break;
        case 'exchange':
          setError("Erreur lors de l'échange du code d'authentification");
          break;
        case 'process':
          setError("Une erreur s'est produite lors du traitement de l'authentification");
          break;
        case 'auth':
          setError("Échec de l'authentification");
          break;
        default:
          setError(`Erreur lors de la connexion: ${errorParam}`);
      }
    }
  }, [registeredParam, errorParam, redirectedFromParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Tentative de connexion avec:", { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log("Résultat de connexion:", { 
        user: data.user ? "User logged in" : "No user", 
        session: data.session ? "Session created" : "No session",
        error: error ? error.message : "No error" 
      });

      if (error) {
        setError(error.message || "Identifiants invalides. Veuillez réessayer.");
        setIsLoading(false);
        return;
      }

      if (data.session) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        
        // Récupérer l'URL de redirection s'il y en a une
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectedFrom') || '/dashboard';
        
        // Redirection immédiate vers l'URL demandée ou le dashboard
        console.log("Redirection vers:", redirectUrl);
        window.location.href = redirectUrl;
      } else {
        setError("Erreur lors de la création de la session. Veuillez réessayer.");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      console.log("Tentative de connexion avec Google...");
      
      // Définir l'URL de redirection absolue
      const redirectUrl = `${window.location.origin}/auth/callback?next=/dashboard`;
      console.log("URL de redirection OAuth configurée:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: 'select_account', // Force la sélection du compte Google
            access_type: 'offline', // Pour obtenir un refresh token
          }
        }
      });

      if (error) {
        console.error("Erreur de connexion Google:", error);
        setError(error.message);
        setIsLoading(false);
      } else if (!data.url) {
        console.error("URL de redirection manquante");
        setError("Erreur lors de la redirection Google. Veuillez réessayer.");
        setIsLoading(false);
      } else {
        console.log("Redirection OAuth initiée vers:", data.url);
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Exception lors de la connexion Google:", error);
      setError("Une erreur est survenue avec la connexion Google.");
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Veuillez saisir votre email pour réinitialiser votre mot de passe");
      return;
    }
    
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setError(error.message);
      } else {
        toast({
          title: "Email envoyé",
          description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe",
        });
      }
    } catch (error: any) {
      setError("Erreur lors de l'envoi de l'email de réinitialisation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Image 
              src="/placeholder.svg?height=80&width=80" 
              alt="ClipAI Logo" 
              width={80} 
              height={80} 
              className="mx-auto h-12 w-auto"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Se connecter
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Accédez à votre compte ClipAI
          </p>
        </div>

        {showSuccessMessage && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Mot de passe
                </label>
                <button 
                  type="button"
                  onClick={handleResetPassword}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background px-2 text-sm text-muted-foreground">
              OU
            </span>
          </div>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Se connecter avec Google
          </Button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <Link
            href="/"
            className="flex items-center text-sm font-medium hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au site
          </Link>
          <div className="text-sm">
            <span className="text-muted-foreground">Pas encore de compte ?</span>{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <LoginForm />
    </Suspense>
  );
} 