"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

// Composant qui utilise useSearchParams
function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Une erreur s'est produite lors de l'authentification.";
  let errorDescription = "Veuillez réessayer ou contacter notre support si le problème persiste.";

  // Personnaliser les messages d'erreur en fonction du type d'erreur
  if (error === "Signin") {
    errorMessage = "Erreur de connexion";
    errorDescription = "Identifiants incorrects ou problème temporaire. Veuillez réessayer.";
  } else if (error === "OAuthSignin" || error === "OAuthCallback") {
    errorMessage = "Erreur avec le fournisseur d'authentification";
    errorDescription = "Un problème est survenu avec votre fournisseur d'authentification. Veuillez réessayer.";
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "Le compte existe déjà";
    errorDescription = "Un compte utilisant cette adresse email existe déjà. Veuillez vous connecter avec la méthode utilisée précédemment.";
  } else if (error === "Callback") {
    errorMessage = "Échec de l'authentification";
    errorDescription = "La tentative d'authentification a échoué. Veuillez réessayer.";
  } else if (error === "AccessDenied") {
    errorMessage = "Accès refusé";
    errorDescription = "Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource.";
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-red-600">
            {errorMessage}
          </h2>
          <p className="mt-2 text-gray-600">
            {errorDescription}
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button asChild>
            <Link href="/login">
              Retourner à la page de connexion
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Composant principal avec Suspense
export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Chargement...</div>}>
      <ErrorContent />
    </Suspense>
  );
} 