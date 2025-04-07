"use client"

import { useState, useEffect } from "react"
import { Film, MessageSquare, Plus, Settings, Upload, Wand2, ArrowRight, CropIcon, Move, Eye, Type, MousePointer, Zap, Instagram, Linkedin, Smartphone, Twitter, Check } from "lucide-react"
import { useSupabaseAuth } from "@/components/supabase-auth-provider"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ProjectCard } from "@/components/project-card"
import { FormatCard } from "@/components/format-card"
import { TemplateCard } from "@/components/template-card"
import { VideoUpload } from "@/components/VideoUpload"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function DashboardPage() {
  const { user, session, isLoading } = useSupabaseAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("projects")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState("tiktok")
  const [croppingMethod, setCroppingMethod] = useState("ai")
  const [useAI, setUseAI] = useState(false)
  const [importantElements, setImportantElements] = useState({
    faces: true,
    text: true,
    action: false,
    center: false
  })
  const [cropPositionAdjustment, setCropPositionAdjustment] = useState(50)
  
  // Formats disponibles
  const formats = [
    { id: "youtube", name: "YouTube", ratio: "16:9", icon: <Film className="w-5 h-5" /> },
    { id: "instagram-post", name: "Instagram Post", ratio: "1:1", icon: <Instagram className="w-5 h-5" /> },
    { id: "instagram-reels", name: "Instagram Reels", ratio: "9:16", icon: <Instagram className="w-5 h-5" /> },
    { id: "tiktok", name: "TikTok", ratio: "9:16", icon: <Smartphone className="w-5 h-5" /> },
    { id: "linkedin", name: "LinkedIn", ratio: "16:9", icon: <Linkedin className="w-5 h-5" /> },
    { id: "twitter", name: "Twitter/X", ratio: "16:9", icon: <Twitter className="w-5 h-5" /> },
  ]

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

  const handleVideoSelect = (file: File) => {
    console.log('Vidéo sélectionnée:', file.name);
    toast({
      title: "Vidéo importée",
      description: `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
    });
  }

  const handleFormatChange = (format: string) => {
    console.log('Format sélectionné:', format);
    setSelectedFormat(format);
    
    // Récupérer les informations du format sélectionné
    const formatInfo = formats.find(f => f.id === format) || formats[0];
    
    // Mise à jour immédiate de l'aperçu en notifiant VideoUpload du changement de format
    const videoUploadComponent = document.querySelector('.video-upload-container');
    if (videoUploadComponent) {
      // Déclencher un événement personnalisé pour notifier le composant VideoUpload
      const formatChangeEvent = new CustomEvent('formatchange', { 
        detail: { format: format }
      });
      videoUploadComponent.dispatchEvent(formatChangeEvent);
      
      // Forcer un rafraîchissement visuel de l'aperçu
      videoUploadComponent.classList.add('format-changed');
      setTimeout(() => videoUploadComponent.classList.remove('format-changed'), 50);
    }
    
    // Notifier l'utilisateur du changement de format
    toast({
      title: "Format modifié",
      description: `Format: ${formatInfo.name} (${formatInfo.ratio})`,
      variant: "default",
    });
  }

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  }

  const handleUpload = () => {
    setShowUploadForm(true);
    setSelectedTab("upload");
  }

  const handleImportantElementChange = (element: string) => {
    setImportantElements({
      ...importantElements,
      [element]: !importantElements[element as keyof typeof importantElements]
    });
  }

  // Détermine la classe d'aspect ratio en fonction du format sélectionné
  const getAspectRatioClass = () => {
    if (selectedFormat === "instagram-post") {
      return "aspect-square"; // 1:1
    } else if (selectedFormat === "instagram-reels" || selectedFormat === "tiktok") {
      return "aspect-[9/16]"; // 9:16
    } else {
      return "aspect-video"; // 16:9
    }
  };

  // Obtenir le format actuel
  const currentFormat = formats.find(f => f.id === selectedFormat) || formats[0];

  // Effet pour synchroniser les changements de format
  useEffect(() => {
    // Cette fonction sera appelée à chaque changement de selectedFormat
    console.log('Format actif:', selectedFormat);
    
    // Trouver le composant VideoUpload et lui passer le nouveau format
    const videoUploadElement = document.querySelector('.video-upload-container');
    if (videoUploadElement) {
      // Déclencher un événement personnalisé pour notifier le composant
      const formatChangeEvent = new CustomEvent('formatchange', { 
        detail: { format: selectedFormat }
      });
      videoUploadElement.dispatchEvent(formatChangeEvent);
      
      // Appliquer une classe temporaire pour forcer un rafraîchissement visuel
      videoUploadElement.classList.add('format-updating');
      setTimeout(() => videoUploadElement.classList.remove('format-updating'), 50);
      
      // Déclencher également un ajustement du cadrage automatique
      // Cela permet de voir immédiatement l'effet du changement de format sur l'aperçu
      const event = new CustomEvent('croppositionchange', { 
        detail: { position: cropPositionAdjustment } 
      });
      window.dispatchEvent(event);
    }
  }, [selectedFormat, cropPositionAdjustment]); // Se déclenche quand selectedFormat ou cropPositionAdjustment change

  // Écouter les sélections de format depuis les FormatCard
  useEffect(() => {
    const handleFormatSelection = (event: CustomEvent) => {
      if (event.detail && event.detail.format) {
        console.log('Format sélectionné depuis FormatCard:', event.detail.format);
        setSelectedFormat(event.detail.format);
        
        // Ouvrir le formulaire d'upload si ce n'est pas déjà le cas
        if (!showUploadForm) {
          setShowUploadForm(true);
        }
      }
    };
    
    // Ajouter l'écouteur d'événement
    document.addEventListener('formatselect', handleFormatSelection as EventListener);
    
    // Nettoyage lors du démontage
    return () => {
      document.removeEventListener('formatselect', handleFormatSelection as EventListener);
    };
  }, [showUploadForm]);

  // Émettre un événement lorsque la position du cadre change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('croppositionchange', { 
        detail: { position: cropPositionAdjustment } 
      });
      window.dispatchEvent(event);
    }
  }, [cropPositionAdjustment]);

  return (
    <DashboardShell>
      <DashboardHeader heading="" text="">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 mr-4 border border-dashed border-purple-400 bg-purple-50/10 px-3 py-1 rounded-full">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-purple-800">Édition IA bientôt disponible</span>
          </div>
          <Button onClick={toggleUploadForm}>
            {showUploadForm ? (
              <>Fermer</>
            ) : (
              <><Plus className="mr-2 h-4 w-4" /> Nouveau projet</>
            )}
        </Button>
        </div>
      </DashboardHeader>

      {showUploadForm ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Importer une nouvelle vidéo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-[1fr_1.5fr]">
              <div className="space-y-6">
                <VideoUpload 
                  onVideoSelect={handleVideoSelect} 
                  onFormatChange={handleFormatChange}
                  maxSizeInMB={200}
                  allowedFormats={['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']}
                  cropPosition={cropPositionAdjustment}
                />
                
                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between space-x-2 p-4 rounded-md border border-dashed border-purple-400 bg-purple-50/10">
                    <div className="flex-1">
                      <Label htmlFor="ai-mode" className="flex items-center text-base font-medium text-muted-foreground">
                        <Zap className="h-4 w-4 mr-2 text-purple-500" />
                        Édition Magique IA
                        <span className="ml-2 inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                          Bientôt disponible
                        </span>
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        L'IA optimisera automatiquement votre vidéo pour chaque format
                      </p>
                    </div>
                    <Switch
                      id="ai-mode"
                      checked={false}
                      onCheckedChange={() => {}}
                      disabled={true}
                      className="opacity-50 data-[state=unchecked]:bg-purple-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Film className="w-5 h-5 text-primary" />
                    </div>
        <div>
                      <h3 className="text-lg font-medium">Format de sortie</h3>
                      <p className="text-sm text-muted-foreground">Choisissez le format pour votre vidéo</p>
                    </div>
        </div>

                  <div className="grid grid-cols-3 gap-2">
                    {formats.map(format => (
                      <Button
                        key={format.id}
                        variant={selectedFormat === format.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFormatChange(format.id)}
                        className="flex flex-col h-auto py-2 px-0 w-full"
                      >
                        <div className="text-lg mb-1 flex justify-center">{format.icon}</div>
                        <span className="text-xs">{format.name}</span>
                        <span className="text-xs text-muted-foreground">{format.ratio}</span>
              </Button>
                    ))}
                  </div>
                  
                  {/* Recommandations de format */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-2">Recommandations pour ce format</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {selectedFormat.includes('tiktok') || selectedFormat.includes('reels') ? (
                        <>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Privilégiez des plans serrés</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Texte centré et lisible</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Optimisé pour le visionnage mobile</li>
                        </>
                      ) : selectedFormat.includes('post') ? (
                        <>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Parfait pour les compositions centrées</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Idéal pour les portraits et produits</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Bonne visibilité dans les fils d'actualité</li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Format standard pour vidéos professionnelles</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Parfait pour les paysages et scènes larges</li>
                          <li className="flex items-center"><Check className="h-3 w-3 mr-1 text-green-500" /> Compatible avec la plupart des écrans</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6 space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <CropIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Recadrage</h3>
                      <p className="text-sm text-muted-foreground">Personnalisez comment votre vidéo sera recadrée</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Méthode de recadrage</h4>
                      <RadioGroup value={croppingMethod} onValueChange={setCroppingMethod} className="grid grid-cols-2 gap-2">
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="ai" id="ai" className="mt-1" />
                          <div>
                            <Label htmlFor="ai" className="flex items-center font-medium">
                              <Wand2 className="h-4 w-4 mr-2 text-primary" />
                              Intelligent (IA)
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Détecte automatiquement les zones importantes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="manual" id="manual" className="mt-1" />
                          <div>
                            <Label htmlFor="manual" className="flex items-center font-medium">
                              <MousePointer className="h-4 w-4 mr-2 text-primary" />
                              Manuel
                            </Label>
                            <p className="text-xs text-muted-foreground mt-1">
                              Contrôlez précisément le cadrage
                            </p>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  
                    <div>
                      <h4 className="font-medium mb-2">Éléments importants à préserver</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <Checkbox 
                            id="faces" 
                            checked={importantElements.faces}
                            onCheckedChange={() => handleImportantElementChange('faces')}
                          />
                          <Label htmlFor="faces" className="flex items-center">
                            <span className="mr-2">👤</span>
                            Visages
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <Checkbox 
                            id="text" 
                            checked={importantElements.text}
                            onCheckedChange={() => handleImportantElementChange('text')}
                          />
                          <Label htmlFor="text" className="flex items-center">
                            <Type className="h-4 w-4 mr-2" />
                            Texte
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <Checkbox 
                            id="action" 
                            checked={importantElements.action}
                            onCheckedChange={() => handleImportantElementChange('action')}
                          />
                          <Label htmlFor="action" className="flex items-center">
                            <span className="mr-2">🎬</span>
                            Action
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <Checkbox 
                            id="center" 
                            checked={importantElements.center}
                            onCheckedChange={() => handleImportantElementChange('center')}
                          />
                          <Label htmlFor="center" className="flex items-center">
                            <span className="mr-2">⊕</span>
                            Centre
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Position du cadre</h4>
                        <div className="text-sm text-muted-foreground">
                          <Move className="h-4 w-4 inline mr-1" />
                          {cropPositionAdjustment}%
                        </div>
                      </div>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        value={[cropPositionAdjustment]}
                        onValueChange={(value) => setCropPositionAdjustment(value[0])}
                        className="my-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Gauche</span>
                        <span>Centre</span>
                        <span>Droite</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">
                        <Eye className="h-4 w-4 mr-2" /> Prévisualiser le recadrage
              </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={toggleUploadForm}>Annuler</Button>
            <Button>Continuer l'édition</Button>
            </CardFooter>
          </Card>
      ) : (
        <div className="grid gap-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Mes projets</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
            <TabsTrigger value="formats">Formats</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer" onClick={handleUpload}>
                <CardContent className="flex flex-col items-center justify-center h-[220px]">
                  <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-lg font-medium">Nouveau projet</p>
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
                formatId="youtube"
              />
              <FormatCard
                title="Instagram Post"
                ratio="1:1"
                icon={<Film className="h-8 w-8" />}
                description="Format carré pour le fil d'actualité Instagram"
                formatId="instagram-post"
              />
              <FormatCard
                title="Instagram Reels"
                ratio="9:16"
                icon={<Film className="h-8 w-8" />}
                description="Format vertical pour les Reels Instagram"
                formatId="instagram-reels"
              />
              <FormatCard
                title="TikTok"
                ratio="9:16"
                icon={<Film className="h-8 w-8" />}
                description="Format vertical optimisé pour TikTok"
                formatId="tiktok"
              />
              <FormatCard
                title="LinkedIn"
                ratio="1:1, 16:9"
                icon={<Film className="h-8 w-8" />}
                description="Formats pour le fil d'actualité et vidéos LinkedIn"
                formatId="linkedin"
              />
              <FormatCard
                title="Twitter/X"
                ratio="16:9"
                icon={<Film className="h-8 w-8" />}
                description="Format paysage pour Twitter/X"
                formatId="twitter"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2" onClick={handleUpload}>
              <Upload className="h-5 w-5" />
              <span>Importer une vidéo</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2 opacity-70 relative" disabled>
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <span>Générer des sous-titres</span>
              <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                Bientôt
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2 opacity-70 relative" disabled>
              <Wand2 className="h-5 w-5 text-purple-500" />
              <span>Édition IA</span>
              <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                Bientôt
              </span>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-center justify-center p-4 gap-2">
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </Button>
          </div>
        </div>
      </div>
      )}
    </DashboardShell>
  )
}

