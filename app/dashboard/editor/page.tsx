"use client"

import { useState } from "react"
import { Film, MessageSquare, Upload, Wand2, ArrowLeft, ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Undo, Redo, ZoomIn, CropIcon, Type, LayoutGrid, Download, Share2, Settings, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/components/dashboard-shell"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EditorPage() {
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(52.9)
  const [playing, setPlaying] = useState(false)
  const [selectedTab, setSelectedTab] = useState("subtitles")
  const [aiMagicEnabled, setAiMagicEnabled] = useState(true)
  const [selectedSubtitleLanguage, setSelectedSubtitleLanguage] = useState("fr")
  
  const subtitles = [
    { id: 1, start: 1.5, end: 5, text: "Avec notre SaaS de montage vidéo, vous avez" },
    { id: 2, start: 6.2, end: 9.5, text: "à portée de main un outil puissant qui" },
    { id: 3, start: 10.8, end: 14, text: "transforme vos idées en contenu captivant." },
    { id: 4, start: 15.2, end: 19, text: "Imaginez pouvoir créer des vidéos professionnelles" },
  ]

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const milliseconds = Math.floor((time % 1) * 10)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${milliseconds}`
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-medium">Créez des Vidéos Pro en Un Clic</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Partager</span>
          </Button>
          <Button className="hidden md:flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[84px] border-r flex flex-col items-center py-2 gap-6">
          <Button variant="ghost" size="icon" className="rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M21 15V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              <rect x="10" y="14" width="4" height="4" rx="1" />
              <rect x="3" y="9" width="4" height="4" rx="1" />
              <path d="M14 4h6v6" />
              <path d="M21 3l-7 7" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Film className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-primary/10">
            <MessageSquare className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Type className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CropIcon className="h-5 w-5" />
          </Button>
          <div className="mt-auto">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Preview */}
          <div className="flex-1 bg-black flex items-center justify-center p-4 overflow-hidden">
            <div className="relative w-full max-w-3xl aspect-video bg-zinc-900 rounded">
              <img 
                src="/placeholder.svg?height=720&width=1280" 
                alt="Video preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t">
            {/* Controls */}
            <div className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <span className="text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ZoomIn className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Timeline ruler */}
            <div className="px-4 pt-2 pb-4 relative">
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <div className="w-24 flex-shrink-0"></div>
                <div className="flex-1 flex">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className="flex-1 flex items-center">
                      <span>{i * 5}s</span>
                      {i < 10 && (
                        <div className="flex-1 flex justify-between">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="h-2 border-l border-muted-foreground/30"></div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Clips */}
              <div className="flex gap-1 mb-2">
                <div className="w-24 flex-shrink-0 text-xs text-muted-foreground">Vidéo</div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex gap-1">
                    <div className="bg-zinc-200 rounded h-12 flex-1 overflow-hidden">
                      <img 
                        src="/placeholder.svg?height=48&width=1280" 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover opacity-50" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitles */}
              <div className="flex gap-1">
                <div className="w-24 flex-shrink-0 text-xs text-muted-foreground">Sous-titres</div>
                <div className="flex-1 relative h-12 bg-zinc-100/50 rounded">
                  {subtitles.map(subtitle => (
                    <div 
                      key={subtitle.id}
                      className="absolute h-8 top-2 bg-violet-300 rounded px-1 text-xs flex items-center overflow-hidden text-violet-950"
                      style={{ 
                        left: `${(subtitle.start / duration) * 100}%`, 
                        width: `${((subtitle.end - subtitle.start) / duration) * 100}%` 
                      }}
                    >
                      {subtitle.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline marker */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-primary z-10" 
                style={{ left: `calc(${(currentTime / duration) * 100}% + 24px)` }}
              >
                <div className="h-2 w-2 bg-primary rounded-full -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[300px] border-l flex flex-col bg-background">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Subtitles</h2>
            <div className="flex items-center mt-2">
              <div className="mr-2 text-sm flex items-center gap-2">
                <span className="rounded bg-blue-100 text-blue-700 px-1 py-0.5 text-xs">FR</span>
                French (France)
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">
                <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
            <div className="mt-3 flex">
              <RadioGroup defaultValue="fr" className="flex gap-3" value={selectedSubtitleLanguage} onValueChange={setSelectedSubtitleLanguage}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fr" id="fr" />
                  <Label htmlFor="fr">Français</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">Anglais</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Button variant="outline" size="sm">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1">
                  <path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 4.5C3 3.11929 4.11929 2 5.5 2C6.88071 2 8 3.11929 8 4.5C8 5.88071 6.88071 7 5.5 7C4.11929 7 3 5.88071 3 4.5ZM5.5 9C4.67157 9 4 9.67157 4 10.5C4 11.3284 4.67157 12 5.5 12C6.32843 12 7 11.3284 7 10.5C7 9.67157 6.32843 9 5.5 9ZM3 10.5C3 9.11929 4.11929 8 5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5ZM11.5 9C10.6716 9 10 9.67157 10 10.5C10 11.3284 10.6716 12 11.5 12C12.3284 12 13 11.3284 13 10.5C13 9.67157 12.3284 9 11.5 9ZM9 10.5C9 9.11929 10.1193 8 11.5 8C12.8807 8 14 9.11929 14 10.5C14 11.8807 12.8807 13 11.5 13C10.1193 13 9 11.8807 9 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                Style
              </Button>
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1">
                  <path d="M7.59375 0.90625C7.26562 0.578125 6.73438 0.578125 6.40625 0.90625L0.65625 6.65625C0.328125 6.98438 0.328125 7.51562 0.65625 7.84375C0.984375 8.17188 1.51562 8.17188 1.84375 7.84375L2.25 7.4375V12.5C2.25 13.3125 2.9375 14 3.75 14H11.25C12.0625 14 12.75 13.3125 12.75 12.5V7.4375L13.1562 7.84375C13.4844 8.17188 14.0156 8.17188 14.3438 7.84375C14.6719 7.51562 14.6719 6.98438 14.3438 6.65625L8.59375 0.90625ZM11.25 6.34375L7.5 2.59375L3.75 6.34375V12.5H11.25V6.34375Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                Ajouter
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-medium">Magie IA</span>
              <Switch
                checked={aiMagicEnabled}
                onCheckedChange={setAiMagicEnabled}
                id="ai-magic"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {subtitles.map(subtitle => (
              <Card key={subtitle.id} className="border-l-4 border-violet-500">
                <CardContent className="p-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{formatTime(subtitle.start)} - {formatTime(subtitle.end)}</span>
                    <span>{Math.round((subtitle.end - subtitle.start) * 10) / 10}s</span>
                  </div>
                  <Input 
                    value={subtitle.text} 
                    className="text-sm" 
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 