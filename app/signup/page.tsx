"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

// Composant qui utilise useSearchParams
function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }

    // Vérifier s'il existe déjà une session active
    const checkExistingSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        console.log("Signup page - Vérification de session:", data.session ? "Session active" : "Pas de session");
        
        // Si une session existe, rediriger vers le dashboard
        if (data.session) {
          console.log("Session existante détectée, redirection vers le dashboard");
          setTimeout(() => {
            router.push('/dashboard');
          }, 100);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de session:", error);
      }
    };
    
    checkExistingSession();
  }, [errorParam, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Tentative d'inscription avec:", { email, fullName });
      
      // 1. Créer l'utilisateur avec email et mot de passe
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      console.log("Résultat d'inscription:", { 
        user: data.user ? "User created" : "No user", 
        session: data.session ? "Session created" : "No session",
        error: error ? error.message : "No error" 
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      // Vérifier que l'utilisateur a bien été créé
      if (!data.user) {
        setError("Erreur lors de la création du compte. Veuillez réessayer.");
        setIsLoading(false);
        return;
      }

      // Si l'inscription réussit
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });

      if (data.session) {
        console.log("Session créée lors de l'inscription, redirection vers le dashboard");
        // Ajouter un délai pour s'assurer que la session est bien établie
        setTimeout(() => {
          window.location.href = "/dashboard"; 
        }, 1000);
      } else {
        console.log("Inscription réussie, mais pas de session active");
        // Si pas de session (cas où la confirmation d'email est requise)
        toast({
          title: "Vérifiez votre email",
          description: "Un lien de vérification a été envoyé à votre adresse email.",
        });
        setTimeout(() => {
          window.location.href = "/login?registered=true";
        }, 2000);
      }
    } catch (error: any) {
      console.error("Exception lors de l'inscription:", error);
      setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      console.log("Tentative d'inscription avec Google...");
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          queryParams: {
            prompt: 'select_account', // Force la sélection du compte Google
            access_type: 'offline', // Pour obtenir un refresh token
          }
        }
      });

      if (error) {
        console.error("Erreur d'inscription avec Google:", error);
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
      console.error("Exception lors de l'inscription avec Google:", error);
      setError("Une erreur est survenue avec l'inscription via Google.");
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
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Commencez à utiliser ClipAI dès aujourd'hui
          </p>
        </div>

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
              <label htmlFor="fullName" className="block text-sm font-medium">
                Nom complet
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jean Dupont"
                className="mt-1"
              />
            </div>
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
              <label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                8 caractères minimum
              </p>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "Créer un compte"}
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
            S'inscrire avec Google
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
            <span className="text-muted-foreground">Déjà un compte ?</span>{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function SignupPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <SignupForm />
    </Suspense>
  );
} 