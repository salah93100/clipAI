"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { FormatSelector } from "@/components/format-selector";
import { cn } from "@/lib/utils";

export interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  onFormatChange?: (format: string) => void;
  maxSizeInMB?: number;
  allowedFormats?: string[];
  cropPosition?: number;
}

export function VideoUpload({
  onVideoSelect,
  onFormatChange,
  maxSizeInMB = 100,
  allowedFormats = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
  cropPosition = 50,
}: VideoUploadProps) {
  const [error, setError] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [format, setFormat] = useState('paysage'); // Format par défaut: paysage (16:9)
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentCropPosition, setCurrentCropPosition] = useState<number>(cropPosition);

  const validateVideo = (file: File): boolean => {
    // Vérification du format
    if (!allowedFormats.includes(file.type)) {
      setError(`Format non supporté. Formats acceptés : ${allowedFormats.map(format => format.replace('video/', '')).join(', ')}`);
      return false;
    }

    // Vérification de la taille
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      setError(`La taille du fichier dépasse ${maxSizeInMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');

    if (file) {
      if (validateVideo(file)) {
        setSelectedFile(file);
        setVideoUrl(URL.createObjectURL(file));
        onVideoSelect(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormatChange = (value: string) => {
    setFormat(value);
    onFormatChange?.(value);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setError('');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (validateVideo(file)) {
        setSelectedFile(file);
        setVideoUrl(URL.createObjectURL(file));
        onVideoSelect(file);
      }
    } else {
      setError("Veuillez déposer un fichier vidéo valide");
    }
  };

  const handleClearVideo = () => {
    setSelectedFile(null);
    setVideoUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Détermine la classe d'aspect ratio en fonction du format sélectionné
  const getAspectRatioClass = () => {
    switch (format) {
      case 'portrait':
      case 'instagram-reels':
      case 'instagram-story':
      case 'tiktok':
        return 'aspect-[9/16]'; // 9:16
      case 'carré':
      case 'instagram-post':
        return 'aspect-square'; // 1:1
      case 'paysage':
      case 'youtube':
      case 'linkedin':
      case 'twitter':
      default:
        return 'aspect-video'; // 16:9
    }
  };

  // Style dynamique pour le conteneur vidéo en fonction du format
  const getVideoContainerStyle = () => {
    if (!selectedFile) return {};

    // Appliquer des styles différents selon le format
    switch (format) {
      case 'portrait':
      case 'instagram-reels':
      case 'instagram-story':
      case 'tiktok':
        return {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        };
      case 'carré':
      case 'instagram-post':
        return {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        };
      case 'paysage':
      case 'youtube':
      case 'linkedin': 
      case 'twitter':
      default:
        return {
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        };
    }
  };

  // Informations sur le format pour l'affichage
  const getFormatInfo = () => {
    switch (format) {
      case 'instagram-post':
        return { name: 'Instagram Post', ratio: '1:1' };
      case 'instagram-reels':
        return { name: 'Instagram Reels', ratio: '9:16' };
      case 'tiktok':
        return { name: 'TikTok', ratio: '9:16' };
      case 'youtube':
        return { name: 'YouTube', ratio: '16:9' };
      case 'linkedin':
        return { name: 'LinkedIn', ratio: '16:9' };
      case 'twitter':
        return { name: 'Twitter/X', ratio: '16:9' };
      default:
        return { name: 'Format personnalisé', ratio: '' };
    }
  };
  
  const formatInfo = getFormatInfo();

  // Effet pour écouter les changements de format externes
  useEffect(() => {
    const handleExternalFormatChange = (event: any) => {
      if (event.detail && event.detail.format) {
        console.log('Format change détecté:', event.detail.format);
        setFormat(event.detail.format);
        
        // Appeler aussi le callback externe
        onFormatChange?.(event.detail.format);
      }
    };
    
    // Récupérer le conteneur du composant actuel
    const container = document.querySelector('.video-upload-container');
    if (container) {
      container.addEventListener('formatchange', handleExternalFormatChange);
      
      // Nettoyage lors du démontage du composant
      return () => {
        container.removeEventListener('formatchange', handleExternalFormatChange);
      };
    }
  }, []); // S'exécute une seule fois à l'initialisation

  // Surveiller les changements de la prop cropPosition
  useEffect(() => {
    setCurrentCropPosition(cropPosition);
  }, [cropPosition]);

  // Écouter l'événement croppositionchange
  useEffect(() => {
    const handleCropPositionChange = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.position === 'number') {
        setCurrentCropPosition(event.detail.position);
      }
    };

    window.addEventListener('croppositionchange', handleCropPositionChange as EventListener);
    
    return () => {
      window.removeEventListener('croppositionchange', handleCropPositionChange as EventListener);
    };
  }, []);

  // Calculer le décalage pour l'aperçu visuel
  const getTransformStyle = (cropPos: number) => {
    // Convertir cropPosition (0-100) en translation (-30% à 30%)
    // Amplifier le mouvement pour une meilleure visualisation
    const translateX = ((cropPos - 50) / 1.7);
    
    // Ajuster le transform en fonction du format
    switch (format) {
      case 'portrait':
      case 'instagram-reels':
      case 'instagram-story':
      case 'tiktok':
        return {
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.3s ease-out',
          width: '300%', // Élargir la vidéo pour le format vertical
          height: '100%',
          objectFit: 'cover' as const
        };
      case 'carré':
      case 'instagram-post':
        return {
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.3s ease-out',
          width: '200%', // Élargir légèrement pour le format carré
          height: '100%',
          objectFit: 'cover' as const
        };
      case 'paysage':
      case 'youtube':
      case 'linkedin':
      case 'twitter':
      default:
        return {
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.3s ease-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover' as const
        };
    }
  };

  return (
    <div className="w-full video-upload-container">
      <div
        className={cn(
          "relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 flex flex-col items-center justify-center gap-4 text-center",
          { "border-primary/70 bg-primary/5": isDragging }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <div className="w-full flex flex-col items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={handleClearVideo}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className={cn("relative w-full max-w-md overflow-hidden rounded-md", getAspectRatioClass())}>
              <div className="absolute inset-0 flex items-center justify-center bg-black/5"
                   style={getVideoContainerStyle()}>
                {/* Zone vidéo avec translation basée sur currentCropPosition */}
                <div
                  className="absolute w-full h-full" 
                  style={{
                    zIndex: 1
                  }}
                >
                  <video
                    src={videoUrl}
                    controls
                    className="object-cover w-full h-full"
                    style={getTransformStyle(currentCropPosition)}
                  />
                </div>
                
                {/* Cadre fixe (zone de découpe) qui change en fonction du format */}
                <div 
                  className={cn("absolute pointer-events-none", getAspectRatioClass())}
                  style={{
                    border: '2px solid var(--primary)',
                    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
                    zIndex: 2,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between w-full max-w-md text-sm text-muted-foreground">
              <span>
                {selectedFile ? 
                  `${selectedFile.name.length > 20 ? selectedFile.name.substring(0, 18) + '...' : selectedFile.name} (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)` 
                  : ''}
              </span>
              <span>Position: {Math.round(currentCropPosition)}%</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-10 aspect-video">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Glissez et déposez une vidéo</p>
            <p className="text-sm text-muted-foreground mb-4">ou cliquez pour choisir un fichier</p>
            <Button 
              variant="outline" 
              onClick={handleButtonClick}
              className="mt-2"
            >
              Sélectionner une vidéo
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Formats acceptés: {allowedFormats.map(format => format.replace('video/', '')).join(', ')}
            </p>
            <p className="text-xs text-muted-foreground">
              Taille maximale: {maxSizeInMB}MB
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={allowedFormats.join(',')}
        className="hidden"
      />
    </div>
  );
} 