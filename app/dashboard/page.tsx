"use client"

import { useState } from "react"
import { Film, LayoutGrid, MessageSquare, Plus, Settings, Upload, Video, Wand2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectCard } from "@/components/project-card"
import { FormatCard } from "@/components/format-card"
import { TemplateCard } from "@/components/template-card"

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("projects")

  const recentProjects = [
    {
      id: "1",
      title: "Présentation produit",
      thumbnail: "/placeholder.svg?height=180&width=320",
      updatedAt: "Il y a 2 heures",
      platform: "YouTube",
    },
    {
      id: "2",
      title: "Tutoriel application",
      thumbnail: "/placeholder.svg?height=180&width=320",
      updatedAt: "Hier",
      platform: "LinkedIn",
    },
    {
      id: "3",
      title: "Teaser événement",
      thumbnail: "/placeholder.svg?height=180&width=320",
      updatedAt: "Il y a 3 jours",
      platform: "Instagram",
    },
  ]

  const templates = [
    {
      id: "1",
      title: "Tutoriel produit",
      thumbnail: "/placeholder.svg?height=180&width=320",
      platform: "YouTube",
    },
    {
      id: "2",
      title: "Story promotionnelle",
      thumbnail: "/placeholder.svg?height=180&width=320",
      platform: "Instagram",
    },
    {
      id: "3",
      title: "Présentation entreprise",
      thumbnail: "/placeholder.svg?height=180&width=320",
      platform: "LinkedIn",
    },
    {
      id: "4",
      title: "Teaser court",
      thumbnail: "/placeholder.svg?height=180&width=320",
      platform: "TikTok",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Tableau de bord" text="Créez et gérez vos projets vidéo">
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nouveau projet
        </Button>
      </DashboardHeader>
      <div className="grid gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Bienvenue sur ClipAI</h2>
          <p className="text-muted-foreground">Commencez à créer des vidéos optimisées pour toutes les plateformes</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nouveau projet</CardTitle>
              <Upload className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Importer une vidéo</div>
              <p className="text-xs text-muted-foreground">Commencez avec votre propre contenu</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Importer
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modèles</CardTitle>
              <LayoutGrid className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{templates.length}</div>
              <p className="text-xs text-muted-foreground">Modèles prêts à l'emploi</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedTab("templates")}>
                Voir les modèles
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projets récents</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentProjects.length}</div>
              <p className="text-xs text-muted-foreground">Projets en cours</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedTab("projects")}>
                Voir les projets
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Édition IA</CardTitle>
              <Wand2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Automatique</div>
              <p className="text-xs text-muted-foreground">Sous-titres et recadrage IA</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline" className="w-full" onClick={() => setSelectedTab("formats")}>
                Voir les formats
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Mes projets</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
            <TabsTrigger value="formats">Formats</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center h-[220px]">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-lg font-medium">Nouveau projet</p>
                  <p className="text-sm text-muted-foreground">Créer un nouveau projet vidéo</p>
                </CardContent>
              </Card>
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  thumbnail={project.thumbnail}
                  updatedAt={project.updatedAt}
                  platform={project.platform}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="templates" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.title}
                  thumbnail={template.thumbnail}
                  platform={template.platform}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="formats" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FormatCard
                title="YouTube"
                ratio="16:9"
                icon={<Film className="h-8 w-8" />}
                description="Format paysage standard pour les vidéos YouTube"
              />
              <FormatCard
                title="Instagram Post"
                ratio="1:1"
                icon={<Film className="h-8 w-8" />}
                description="Format carré pour le fil d'actualité Instagram"
              />
              <FormatCard
                title="Instagram Reels"
                ratio="9:16"
                icon={<Film className="h-8 w-8" />}
                description="Format vertical pour les Reels Instagram"
              />
              <FormatCard
                title="TikTok"
                ratio="9:16"
                icon={<Film className="h-8 w-8" />}
                description="Format vertical optimisé pour TikTok"
              />
              <FormatCard
                title="LinkedIn"
                ratio="1:1, 16:9"
                icon={<Film className="h-8 w-8" />}
                description="Formats pour le fil d'actualité et vidéos LinkedIn"
              />
              <FormatCard
                title="Twitter/X"
                ratio="16:9"
                icon={<Film className="h-8 w-8" />}
                description="Format paysage pour Twitter/X"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2">
              <Upload className="h-5 w-5" />
              <span>Importer une vidéo</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Générer des sous-titres</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2">
              <Wand2 className="h-5 w-5" />
              <span>Édition IA</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2">
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

