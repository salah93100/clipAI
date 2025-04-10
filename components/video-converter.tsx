"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, RotateCcw, Check, AlertCircle, Film, Share2, Heart, MessageCircle, Bookmark, Send, Users, ThumbsUp, MessageSquare, Repeat, Twitter as TwitterIcon, Smartphone, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface VideoConverterProps {
  videoFile: File | null;
  format: string;
  cropPosition?: number;
  onConversionComplete?: (url: string) => void;
}

// Fonction pour obtenir la maquette de plateforme
const getPlatformMockup = (platform: string, videoUrl: string) => {
  switch (platform) {
    case 'tiktok':
      return (
        <div className="relative max-w-[280px] mx-auto border-8 border-black rounded-3xl overflow-hidden bg-black">
          {/* Barre d'état */}
          <div className="bg-black text-white flex justify-between items-center p-2 text-xs">
            <div>20:30</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          
          {/* Contenu vidéo TikTok */}
          <div className="relative bg-black aspect-[9/16]">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-contain"
            />
            {/* Superposition d'éléments UI TikTok */}
            <div className="absolute right-2 bottom-16 flex flex-col items-center gap-4 text-white">
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6" />
                <span className="text-xs">23.5k</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="h-6 w-6" />
                <span className="text-xs">1024</span>
              </div>
              <div className="flex flex-col items-center">
                <Bookmark className="h-6 w-6" />
                <span className="text-xs">5.2k</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="h-6 w-6" />
                <span className="text-xs">2.8k</span>
              </div>
            </div>
            
            {/* Informations sur la vidéo */}
            <div className="absolute bottom-2 left-2 text-white text-xs">
              <p className="font-bold">@votrecompte</p>
              <p className="max-w-[200px] truncate">Votre description #hashtag #clipai</p>
            </div>
          </div>
          
          {/* Barre de navigation */}
          <div className="bg-black text-white flex justify-around py-2 px-1">
            <div className="flex flex-col items-center">
              <div className="h-5 w-5 bg-white rounded-sm"></div>
              <span className="text-[10px]">Home</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5" />
              <span className="text-[10px]">Discover</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                <Plus className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="h-5 w-5" />
              <span className="text-[10px]">Inbox</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5" />
              <span className="text-[10px]">Me</span>
            </div>
          </div>
        </div>
      );
    
    case 'instagram-reels':
      return (
        <div className="relative max-w-[280px] mx-auto border-8 border-black rounded-3xl overflow-hidden bg-black">
          {/* Barre d'état */}
          <div className="bg-black text-white flex justify-between items-center p-2 text-xs">
            <div>20:30</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          
          {/* Contenu vidéo Instagram Reels */}
          <div className="relative bg-black aspect-[9/16]">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-contain"
            />
            {/* Superposition d'éléments UI Instagram */}
            <div className="absolute right-2 bottom-16 flex flex-col items-center gap-4 text-white">
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6" />
                <span className="text-xs">18.3k</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle className="h-6 w-6" />
                <span className="text-xs">842</span>
              </div>
              <div className="flex flex-col items-center">
                <Send className="h-6 w-6" />
                <span className="text-xs">1.2k</span>
              </div>
              <div className="flex flex-col items-center">
                <Bookmark className="h-6 w-6" />
              </div>
            </div>
            
            {/* Informations sur la vidéo */}
            <div className="absolute bottom-2 left-2 text-white text-xs">
              <p className="font-bold">votrecompte</p>
              <p className="max-w-[200px] truncate">Votre description #instagram #reels</p>
            </div>
          </div>
          
          {/* Barre de navigation */}
          <div className="bg-black text-white flex justify-around py-2">
            <div className="h-5 w-5 bg-white rounded-sm"></div>
            <div className="h-5 w-5 border border-white rounded-sm"></div>
            <div className="h-5 w-5 rounded-full border border-white"></div>
            <div className="h-5 w-5 rounded-full border border-white"></div>
            <div className="h-5 w-5 rounded-full border border-white"></div>
          </div>
        </div>
      );
    
    case 'instagram-post':
      return (
        <div className="relative max-w-[280px] mx-auto border-8 border-black rounded-3xl overflow-hidden bg-black">
          {/* Barre d'état */}
          <div className="bg-white text-black flex justify-between items-center p-2 text-xs">
            <div>Instagram</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-black"></div>
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </div>
          </div>
          
          {/* En-tête de post */}
          <div className="bg-white flex items-center p-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div className="text-xs font-medium">votrecompte</div>
            <div className="ml-auto">•••</div>
          </div>
          
          {/* Contenu vidéo Instagram Post */}
          <div className="bg-white">
            <div className="aspect-square">
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Actions post */}
          <div className="bg-white p-2">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-3">
                <Heart className="h-6 w-6" />
                <MessageCircle className="h-6 w-6" />
                <Send className="h-6 w-6" />
              </div>
              <Bookmark className="h-6 w-6" />
            </div>
            <div className="text-xs font-medium mb-1">12,345 likes</div>
            <div className="text-xs">
              <span className="font-medium">votrecompte</span> Votre description #instagram
            </div>
          </div>
        </div>
      );
    
    case 'youtube':
      return (
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
          {/* Interface YouTube */}
          <div className="aspect-video bg-black">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full"
            />
          </div>
          
          {/* Informations vidéo */}
          <div className="p-3">
            <h3 className="font-medium text-sm mb-2">Titre de votre vidéo YouTube</h3>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
              <div>
                <div className="text-xs font-medium">Votre chaîne</div>
                <div className="text-xs text-gray-500">10K vues • il y a 3 jours</div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-between mt-3 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">1.2K</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 transform rotate-180" />
                <span className="text-xs">24</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">86</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span className="text-xs">Share</span>
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'linkedin':
      return (
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
          {/* En-tête LinkedIn */}
          <div className="p-3 flex items-start">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
            <div>
              <div className="font-medium text-sm">Votre entreprise</div>
              <div className="text-xs text-gray-500">1,234 followers</div>
              <div className="text-xs text-gray-500">Sponsored • 2d</div>
            </div>
          </div>
          
          {/* Description */}
          <div className="px-3 pb-2 text-sm">
            Découvrez notre nouvelle solution pour optimiser votre workflow vidéo. #innovation #marketing
          </div>
          
          {/* Contenu vidéo LinkedIn */}
          <div className="aspect-video bg-black">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full"
            />
          </div>
          
          {/* Metrics */}
          <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
            42 reactions • 8 comments
          </div>
          
          {/* Actions */}
          <div className="flex justify-between px-6 py-2">
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 mr-1" />
              <span className="text-xs">Like</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-1" />
              <span className="text-xs">Comment</span>
            </div>
            <div className="flex items-center">
              <Repeat className="h-5 w-5 mr-1" />
              <span className="text-xs">Repost</span>
            </div>
            <div className="flex items-center">
              <Send className="h-5 w-5 mr-1" />
              <span className="text-xs">Send</span>
            </div>
          </div>
        </div>
      );
    
    case 'twitter':
      return (
        <div className="max-w-md mx-auto border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
          {/* En-tête Twitter/X */}
          <div className="p-3 flex items-start">
            <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Votre compte</span>
                <span className="text-gray-500 text-xs ml-1">@votrecompte</span>
                <span className="text-gray-500 text-xs ml-1">• 2h</span>
              </div>
              <div className="text-sm mb-2">
                Notre nouvelle vidéo optimisée pour X. #ClipAI #Marketing
              </div>
              
              {/* Contenu vidéo Twitter */}
              <div className="rounded-xl overflow-hidden border border-gray-100">
                <div className="aspect-video bg-black">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-full"
                  />
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-between mt-3">
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">24</span>
                </div>
                <div className="flex items-center">
                  <Repeat className="h-4 w-4 mr-1" />
                  <span className="text-xs">118</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span className="text-xs">437</span>
                </div>
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
    default:
      // Format par défaut
      return (
        <div className="rounded-md overflow-hidden border">
          <video 
            src={videoUrl} 
            controls 
            className="w-full h-auto"
          />
        </div>
      );
  }
};

export function VideoConverter({ videoFile, format, cropPosition = 50, onConversionComplete }: VideoConverterProps) {
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [convertedVideoUrl, setConvertedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const formatLabel = {
    'youtube': 'YouTube (16:9)',
    'youtube-shorts': 'YouTube Shorts (9:16)',
    'instagram-post': 'Instagram Post (1:1)',
    'instagram-reels': 'Instagram Reels (9:16)',
    'tiktok': 'TikTok (9:16)',
    'linkedin': 'LinkedIn (16:9)',
    'twitter': 'Twitter/X (16:9)'
  }[format] || format;
  
  const formatIcon = {
    youtube: <Film className="h-3.5 w-3.5" />,
    'youtube-shorts': <Film className="h-3.5 w-3.5" />,
    'instagram-post': <Film className="h-3.5 w-3.5" />,
    'instagram-reels': <Film className="h-3.5 w-3.5" />,
    'tiktok': <Film className="h-3.5 w-3.5" />,
    'linkedin': <Film className="h-3.5 w-3.5" />,
    'twitter': <Film className="h-3.5 w-3.5" />
  }[format] || <Film className="h-3.5 w-3.5" />;

  const convertVideo = async () => {
    if (!videoFile) {
      setError('Aucune vidéo sélectionnée');
      return;
    }

    try {
      setIsConverting(true);
      setProgress(0);
      setError(null);
      
      // Simulation de progression - l'API réelle ne renvoie pas de progression
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);
      
      // Préparation des données pour l'API
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('format', format);
      formData.append('cropPosition', cropPosition.toString());
      
      // Appel à l'API de conversion
      const response = await fetch('/api/convert-video', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur pendant la conversion');
      }
      
      // Création d'un blob à partir de la réponse
      const videoBlob = await response.blob();
      const url = URL.createObjectURL(videoBlob);
      
      setConvertedVideoUrl(url);
      setProgress(100);
      
      toast({
        title: "Conversion réussie",
        description: `Vidéo convertie au format ${formatLabel}`,
      });
      
      if (onConversionComplete) {
        onConversionComplete(url);
      }
    } catch (err) {
      console.error('Erreur de conversion:', err);
      setError(err instanceof Error ? err.message : 'Erreur pendant la conversion');
      toast({
        title: "Échec de conversion",
        description: err instanceof Error ? err.message : 'Erreur pendant la conversion',
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  // Effet pour lancer automatiquement la conversion lorsque la vidéo et le format sont disponibles
  useEffect(() => {
    if (videoFile && format && !isConverting && !convertedVideoUrl) {
      // Attendre un court délai pour permettre aux composants de s'initialiser
      const timer = setTimeout(() => {
        convertVideo();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [videoFile, format]);

  // Effet pour écouter les événements de réinitialisation
  useEffect(() => {
    const handleReset = (event: CustomEvent) => {
      console.log('Réinitialisation du convertisseur demandée');
      resetConverter();
      
      // Après la réinitialisation, la conversion démarrera automatiquement
      // car l'effet précédent sera déclenché
    };
    
    // Ajouter l'écouteur d'événement
    document.addEventListener('reset-converter', handleReset as EventListener);
    
    // Nettoyage lors du démontage
    return () => {
      document.removeEventListener('reset-converter', handleReset as EventListener);
    };
  }, []);

  const downloadVideo = () => {
    if (!convertedVideoUrl) return;
    
    const a = document.createElement('a');
    a.href = convertedVideoUrl;
    a.download = `video-convertie-${format}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Téléchargement démarré",
      description: "Votre vidéo convertie est en cours de téléchargement",
    });
  };
  
  const shareVideo = async () => {
    if (!convertedVideoUrl) return;
    
    try {
      // Vérifier si l'API de partage est disponible
      if (navigator.share) {
        // Créer un fichier à partir du blob
        const response = await fetch(convertedVideoUrl);
        const blob = await response.blob();
        const file = new File([blob], `video-${format}.mp4`, { type: 'video/mp4' });
        
        await navigator.share({
          title: `Vidéo convertie pour ${formatLabel}`,
          files: [file]
        });
      } else {
        // Fallback si l'API de partage n'est pas disponible
        navigator.clipboard.writeText(convertedVideoUrl);
        toast({
          title: "Lien copié",
          description: "Le lien de la vidéo a été copié dans le presse-papier",
        });
      }
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  const resetConverter = () => {
    if (convertedVideoUrl) {
      URL.revokeObjectURL(convertedVideoUrl);
    }
    setConvertedVideoUrl(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {!convertedVideoUrl ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Conversion vidéo</h3>
              <p className="text-xs text-muted-foreground">
                {videoFile ? 
                  `Prêt à convertir: ${videoFile.name} (${(videoFile.size / (1024 * 1024)).toFixed(1)} MB)` : 
                  'Sélectionnez une vidéo pour commencer'}
              </p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 px-2">
              {formatIcon}
              {formatLabel}
            </Badge>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={convertVideo} 
              disabled={!videoFile || isConverting}
              variant="default"
              size="sm"
              className="min-w-24"
            >
              {isConverting ? 'Conversion...' : 'Convertir maintenant'}
            </Button>
          </div>
          
          {isConverting && (
            <div className="space-y-2 mt-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Conversion en cours</span>
                <span>{progress}%</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Conversion terminée</h3>
                <p className="text-xs text-muted-foreground">
                  Format: {formatLabel}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 px-2">
              {formatIcon}
              {formatLabel}
            </Badge>
          </div>
          
          {/* Remplacer la visualisation simple par le mockup de la plateforme */}
          {getPlatformMockup(format, convertedVideoUrl)}
          
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={resetConverter}
              className="flex-1"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Réinitialiser
            </Button>
            <div className="flex gap-2 flex-1">
              <Button
                variant="outline"
                size="sm"
                onClick={shareVideo}
                className="flex-1"
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                Partager
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={downloadVideo}
                className="flex-1"
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Télécharger
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
            <p className="flex items-center mb-1">
              <Check className="h-3 w-3 mr-1.5 text-green-500" />
              Vidéo optimisée pour {formatLabel}
            </p>
            <p className="flex items-center">
              <Check className="h-3 w-3 mr-1.5 text-green-500" />
              Prête à être téléchargée et partagée
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 