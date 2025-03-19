import Link from "next/link"
import { ArrowLeft, Film, Save, Settings, Share } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EditorHeader() {
  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-primary" />
          <span className="font-semibold">ClipAI</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <Input className="h-8 w-40" defaultValue="Projet sans titre" placeholder="Nom du projet" />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Paramètres
        </Button>
        <Button variant="outline" size="sm">
          <Share className="mr-2 h-4 w-4" />
          Partager
        </Button>
        <Button size="sm">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </div>
  )
}

