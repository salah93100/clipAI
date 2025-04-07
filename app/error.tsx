"use client"

import { useEffect } from "react"
import { AlertTriangle, ArrowLeft, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <Card className="max-w-md w-full p-8 space-y-6 border-2 border-dashed border-purple-400 bg-purple-50/5">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-purple-500" />
          </div>

          <h1 className="text-3xl font-bold">Oups! Une erreur est survenue</h1>
          
          <div className="w-16 h-1 bg-purple-300/50 rounded-full my-1" />
          
          <div className="flex items-center space-x-2 mt-2 p-2 rounded-full bg-purple-100/10 px-4">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-purple-800">Nous travaillons à résoudre ce problème</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          Désolé pour ce désagrément. L'équipe ClipAI a été informée et travaille pour résoudre ce problème dans les plus brefs délais.
        </p>

        <div className="flex flex-col space-y-2 mt-6">
          <Button onClick={() => reset()} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Réessayer
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4 border-t border-border">
          ClipAI vous remercie de votre compréhension et de votre patience.
        </p>
      </Card>
    </div>
  )
} 