"use client"

import { useState } from "react"
import Image from "next/image"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Download,
  Italic,
  Layers,
  MessageSquare,
  Pause,
  Play,
  Redo,
  Save,
  Share,
  Text,
  Type,
  Underline,
  Undo,
  Upload,
  Volume2,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EditorHeader } from "@/components/editor-header"
import { FormatSelector } from "@/components/format-selector"
import { VideoTimeline } from "@/components/video-timeline"

export default function EditorPage() {
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [volume, setVolume] = useState(80)
  const [selectedFormat, setSelectedFormat] = useState("youtube")

  const togglePlay = () => {
    setPlaying(!playing)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-muted/40 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Formats</h3>
              <FormatSelector value={selectedFormat} onValueChange={setSelectedFormat} />
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 text-sm font-medium">Éléments</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto flex-col items-center justify-center p-3 gap-2">
                  <Text className="h-4 w-4" />
                  <span className="text-xs">Texte</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col items-center justify-center p-3 gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="text-xs">Média</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col items-center justify-center p-3 gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-xs">Calques</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto flex-col items-center justify-center p-3 gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">Sous-titres</span>
                </Button>
              </div>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 text-sm font-medium">Ajustements</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="brightness">Luminosité</Label>
                    <span className="text-xs text-muted-foreground">50%</span>
                  </div>
                  <Slider id="brightness" defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contrast">Contraste</Label>
                    <span className="text-xs text-muted-foreground">50%</span>
                  </div>
                  <Slider id="contrast" defaultValue={[50]} max={100} step={1} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="saturation">Saturation</Label>
                    <span className="text-xs text-muted-foreground">50%</span>
                  </div>
                  <Slider id="saturation" defaultValue={[50]} max={100} step={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center bg-black/5 p-4 overflow-hidden">
            <div className="relative aspect-video max-h-full max-w-full overflow-hidden rounded-md border bg-background shadow-md">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                width={1280}
                height={720}
                alt="Aperçu vidéo"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-full bg-background/80 text-primary hover:bg-background/90"
                  onClick={togglePlay}
                >
                  {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t bg-muted/40 p-4">
            <div className="space-y-4">
              <VideoTimeline currentTime={currentTime} duration={duration} onTimeChange={setCurrentTime} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={togglePlay}>
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      className="w-24"
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Undo className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Annuler</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Redo className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Rétablir</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Separator orientation="vertical" className="h-6" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Enregistrer</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Exporter</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Partager</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-64 border-l bg-muted/40 p-4 overflow-y-auto">
          <Tabs defaultValue="text">
            <TabsList className="w-full">
              <TabsTrigger value="text" className="flex-1">
                <Type className="mr-2 h-4 w-4" />
                Texte
              </TabsTrigger>
              <TabsTrigger value="subtitles" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Sous-titres
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-content">Contenu du texte</Label>
                <Input id="text-content" placeholder="Entrez votre texte ici" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" className="p-2">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <Underline className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Couleur du texte</Label>
                <div className="grid grid-cols-6 gap-2">
                  {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-white"].map(
                    (color, index) => (
                      <div key={index} className={`h-6 w-6 cursor-pointer rounded-full ${color} border`} />
                    ),
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="subtitles" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Sous-titres automatiques</Label>
                <Switch id="auto-subtitles" />
              </div>
              <Button className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Générer des sous-titres
              </Button>
              <div className="space-y-2">
                <div className="rounded-md border bg-background p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">00:05 - 00:08</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">Bienvenue dans cette présentation de ClipAI</p>
                </div>
                <div className="rounded-md border bg-background p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">00:09 - 00:12</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">L'outil d'édition vidéo le plus simple</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

