"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Tentative d'inscription avec:", { email, name });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });
      
      console.log("Résultat d'inscription:", {
        user: data.user ? "User created" : "No user",
        session: data.session ? "Session created" : "No session", 
        error: error ? error.message : "No error"
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error("Erreur lors de la création du compte.");
      }

      // Si email de confirmation est requis dans Supabase
      if (!data.session) {
        toast({
          title: "Vérifiez votre email",
          description: "Un lien de confirmation a été envoyé à votre adresse email.",
        });
        router.push("/signup/email-verification");
      } else {
        // Si l'utilisateur est directement connecté
        toast({
          title: "Compte créé avec succès",
          description: "Bienvenue sur ClipAI !",
        });
        
        // Ajouter un délai plus long avant la redirection pour s'assurer que les cookies soient bien établis
        setTimeout(() => {
          console.log("Redirection vers le dashboard après inscription...");
          // Forcer une navigation complète au lieu d'une navigation côté client
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      setError(error.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
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
      setError("Une erreur est survenue avec la connexion Google.");
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
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Nom complet
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmer le mot de passe
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "S'inscrire"}
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
            <span className="text-muted-foreground">Déjà inscrit ?</span>{" "}
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