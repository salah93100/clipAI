"use client"

import { Film, Wand2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <Card className="max-w-md w-full p-8 space-y-6 border-2 border-dashed border-purple-400 bg-purple-50/5">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100/10 flex items-center justify-center">
            <Film className="w-8 h-8 text-purple-500" />
          </div>

          <h1 className="text-3xl font-bold">Page non trouvée</h1>
          
          <div className="w-16 h-1 bg-purple-300/50 rounded-full my-1" />
          
          <div className="flex items-center space-x-2 mt-2 p-2 rounded-full bg-purple-100/10 px-4">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-purple-800">Fonctionnalité en cours de développement</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          Cette page ou fonctionnalité n'est pas encore disponible. L'équipe ClipAI travaille activement pour vous offrir une expérience d'édition vidéo optimale.
        </p>

        <div className="flex flex-col space-y-2 mt-6">
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4 border-t border-border">
          ClipAI vous remercie de votre patience pendant que nous développons de nouvelles fonctionnalités.
        </p>
      </Card>
    </div>
  )
} 