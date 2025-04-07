"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmailVerificationPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
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
            Vérifiez votre email
          </h2>
        </div>
        
        <div className="flex justify-center my-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <p className="text-lg">
          Un lien de confirmation a été envoyé à votre adresse email.
        </p>
        <p className="text-muted-foreground mt-2">
          Veuillez cliquer sur ce lien pour activer votre compte et commencer à utiliser ClipAI.
        </p>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border text-left">
          <h3 className="font-medium text-sm mb-2">Vous n'avez pas reçu d'email ?</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Vérifiez votre dossier de spam ou courrier indésirable</li>
            <li>• Assurez-vous que l'adresse email est correcte</li>
            <li>• L'email peut prendre quelques minutes pour arriver</li>
          </ul>
        </div>
        
        <div className="flex items-center justify-between mt-8">
          <Link
            href="/signup"
            className="flex items-center text-sm font-medium hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
} 