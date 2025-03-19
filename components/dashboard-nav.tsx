import Link from "next/link"
import { Film, Home, LayoutGrid, MessageSquare, Settings, User, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function DashboardNav() {
  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Film className="h-6 w-6 text-primary" />
          <span>ClipAI</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard">
              <Home className="h-4 w-4" />
              Tableau de bord
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/projects">
              <Video className="h-4 w-4" />
              Mes projets
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/templates">
              <LayoutGrid className="h-4 w-4" />
              Modèles
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/subtitles">
              <MessageSquare className="h-4 w-4" />
              Sous-titres
            </Link>
          </Button>
          <Separator className="my-2" />
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              Paramètres
            </Link>
          </Button>
          <Button asChild variant="ghost" className="justify-start gap-2">
            <Link href="/dashboard/account">
              <User className="h-4 w-4" />
              Mon compte
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}

