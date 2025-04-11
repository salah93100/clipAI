import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import * as os from 'os';
import ffmpeg from 'fluent-ffmpeg';

// Types pour ffprobe
interface FfprobeData {
  streams: Array<{
    codec_type?: string;
    width?: number;
    height?: number;
    [key: string]: any;
  }>;
  [key: string]: any;
}

// Configuration des formats supportés
const SUPPORTED_FORMATS = {
  'youtube': { width: 1920, height: 1080, ratio: '16:9' },
  'youtube-shorts': { width: 1080, height: 1920, ratio: '9:16' },
  'instagram-post': { width: 1080, height: 1080, ratio: '1:1' },
  'instagram-reels': { width: 1080, height: 1920, ratio: '9:16' },
  'tiktok': { width: 1080, height: 1920, ratio: '9:16' },
  'linkedin': { width: 1920, height: 1080, ratio: '16:9' },
  'twitter': { width: 1920, height: 1080, ratio: '16:9' }
};

// Limite de taille de fichier (200 MB)
const MAX_FILE_SIZE = 200 * 1024 * 1024;

// Timeout pour la conversion (5 minutes)
const CONVERSION_TIMEOUT = 5 * 60 * 1000;

// Fonction pour assurer l'existence des dossiers nécessaires
async function ensureDirectoriesExist() {
  const tmpDir = join(os.tmpdir(), 'clipai-video-uploads');
  const outputDir = join(os.tmpdir(), 'clipai-video-outputs');
  
  if (!existsSync(tmpDir)) {
    await mkdir(tmpDir, { recursive: true });
  }
  
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }
  
  return { tmpDir, outputDir };
}

// Fonction pour convertir la vidéo dans le format souhaité avec recadrage intelligent automatique
async function convertVideo(inputPath: string, outputPath: string, format: string, cropPosition: number = 50): Promise<void> {
  return new Promise((resolve, reject) => {
    // Définir un timeout pour la conversion
    const timeoutId = setTimeout(() => {
      reject(new Error('Le temps de conversion a expiré. Veuillez essayer avec une vidéo plus petite.'));
    }, CONVERSION_TIMEOUT);
    
    const formatConfig = SUPPORTED_FORMATS[format as keyof typeof SUPPORTED_FORMATS] || SUPPORTED_FORMATS.youtube;
    
    // Analyser la vidéo source pour obtenir ses dimensions
    (ffmpeg as any).ffprobe(inputPath, (err: Error, metadata: FfprobeData) => {
      if (err) {
        clearTimeout(timeoutId);
        return reject(new Error('Impossible d\'analyser la vidéo source: ' + err.message));
      }

      // Extraire les dimensions de la vidéo source
      const videoStream = metadata.streams.find(s => s.codec_type === 'video');
      if (!videoStream || !videoStream.width || !videoStream.height) {
        clearTimeout(timeoutId);
        return reject(new Error('Impossible de déterminer les dimensions de la vidéo'));
      }

      const sourceWidth = videoStream.width;
      const sourceHeight = videoStream.height;
      const sourceRatio = sourceWidth / sourceHeight;
      
      console.log(`Dimensions source: ${sourceWidth}x${sourceHeight}, ratio: ${sourceRatio.toFixed(2)}`);
      
      // Calculer le ratio du format cible
      const targetRatio = formatConfig.width / formatConfig.height;
      console.log(`Ratio cible (${format}): ${targetRatio.toFixed(2)}`);
      
      // Calculer le décalage horizontal en fonction de cropPosition (0-100)
      // où 0 = tout à gauche, 50 = centré, 100 = tout à droite
      const positionAdjustment = (cropPosition - 50) / 100;
      
      let command = ffmpeg(inputPath)
        .outputFormat('mp4')
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-pix_fmt yuv420p', // Pour une meilleure compatibilité
          '-movflags faststart', // Pour une lecture plus rapide
          '-preset fast', // Bon compromis entre vitesse et qualité
          '-crf 23' // Qualité raisonnable
        ]);
      
      // Appliquer différentes stratégies de recadrage en fonction des ratios source et cible
      
      // Cas 1: Format cible carré (1:1)
      if (formatConfig.ratio === '1:1') {
        if (sourceRatio > 1) { 
          // Source plus large que haute (paysage -> carré)
          // On prend la hauteur comme référence et on recadre la largeur
          const cropWidth = sourceHeight;
          const xOffset = Math.round((sourceWidth - cropWidth) * 0.5 + positionAdjustment * (sourceWidth - cropWidth));
          
          command = command.videoFilters([
            `crop=${cropWidth}:${sourceHeight}:${xOffset}:0`,
            `scale=${formatConfig.width}:${formatConfig.height}`
          ]);
        } else if (sourceRatio < 1) { 
          // Source plus haute que large (portrait -> carré)
          // On prend la largeur comme référence et on recadre la hauteur
          const cropHeight = sourceWidth;
          const yOffset = Math.round((sourceHeight - cropHeight) * 0.5 + positionAdjustment * (sourceHeight - cropHeight));
          
          command = command.videoFilters([
            `crop=${sourceWidth}:${cropHeight}:0:${yOffset}`,
            `scale=${formatConfig.width}:${formatConfig.height}`
          ]);
        } else {
          // Déjà un carré, simple redimensionnement
          command = command.videoFilters([
            `scale=${formatConfig.width}:${formatConfig.height}`
          ]);
        }
      }
      // Cas 2: Format cible vertical (9:16)
      else if (formatConfig.ratio === '9:16') {
        if (sourceRatio >= 0.5625) { // sourceRatio > 9/16
          // Source trop large pour le format vertical
          // Recadrer la largeur pour obtenir un ratio 9:16
          const cropWidth = Math.round(sourceHeight * 9 / 16);
          const xOffset = Math.round((sourceWidth - cropWidth) * 0.5 + positionAdjustment * (sourceWidth - cropWidth));
          
          command = command.videoFilters([
            `crop=${cropWidth}:${sourceHeight}:${xOffset}:0`,
            `scale=${formatConfig.width}:${formatConfig.height}`
          ]);
        } else if (sourceRatio < 0.5625) { // sourceRatio < 9/16
          // Source déjà plus verticale que 9:16
          // Recadrer la hauteur pour obtenir un ratio 9:16
          const cropHeight = Math.round(sourceWidth * 16 / 9);
          // Si la hauteur à recadrer est plus grande que la source, on redimensionne simplement
          if (cropHeight > sourceHeight) {
            // Redimensionner pour maintenir le ratio
            command = command.videoFilters([
              `scale=${formatConfig.width}:-2`,
              `pad=${formatConfig.width}:${formatConfig.height}:(ow-iw)/2:(oh-ih)/2`
            ]);
          } else {
            const yOffset = Math.round((sourceHeight - cropHeight) * 0.5 + positionAdjustment * (sourceHeight - cropHeight));
            
            command = command.videoFilters([
              `crop=${sourceWidth}:${cropHeight}:0:${yOffset}`,
              `scale=${formatConfig.width}:${formatConfig.height}`
            ]);
          }
        }
      }
      // Cas 3: Format cible paysage (16:9)
      else {
        if (sourceRatio <= 1.7778) { // sourceRatio < 16/9
          // Source trop haute pour le format paysage
          // Recadrer la hauteur pour obtenir un ratio 16:9
          const cropHeight = Math.round(sourceWidth * 9 / 16);
          const yOffset = Math.round((sourceHeight - cropHeight) * 0.5 + positionAdjustment * (sourceHeight - cropHeight));
          
          command = command.videoFilters([
            `crop=${sourceWidth}:${cropHeight}:0:${yOffset}`,
            `scale=${formatConfig.width}:${formatConfig.height}`
          ]);
        } else if (sourceRatio > 1.7778) { // sourceRatio > 16/9
          // Source déjà plus large que 16:9
          // Recadrer la largeur pour obtenir un ratio 16:9
          const cropWidth = Math.round(sourceHeight * 16 / 9);
          // Si la largeur à recadrer est plus grande que la source, on redimensionne simplement
          if (cropWidth > sourceWidth) {
            // Redimensionner pour maintenir le ratio
            command = command.videoFilters([
              `scale=-2:${formatConfig.height}`,
              `pad=${formatConfig.width}:${formatConfig.height}:(ow-iw)/2:(oh-ih)/2`
            ]);
          } else {
            const xOffset = Math.round((sourceWidth - cropWidth) * 0.5 + positionAdjustment * (sourceWidth - cropWidth));
            
            command = command.videoFilters([
              `crop=${cropWidth}:${sourceHeight}:${xOffset}:0`,
              `scale=${formatConfig.width}:${formatConfig.height}`
            ]);
          }
        }
      }
      
      command
        .on('start', () => {
          console.log('Conversion démarrée');
        })
        .on('progress', (progress) => {
        })
        .on('end', () => {
          console.log('Conversion terminée');
          clearTimeout(timeoutId);
          resolve();
        })
        .on('error', (err) => {
          console.error('Erreur de conversion:', err);
          clearTimeout(timeoutId);
          reject(err);
        })
        .save(outputPath);
    });
  });
}

export async function POST(request: NextRequest) {
  // Fichiers temporaires à nettoyer
  const filesToCleanup: string[] = [];
  
  try {
    // Créer les dossiers temporaires si nécessaires
    const { tmpDir, outputDir } = await ensureDirectoriesExist();
    
    // Récupérer les données de la demande
    const formData = await request.formData();
    const videoFile = formData.get('video') as File | null;
    const format = formData.get('format') as string || 'youtube';
    const cropPosition = parseInt(formData.get('cropPosition') as string || '50', 10);
    
    // Vérifier qu'une vidéo a été fournie
    if (!videoFile) {
      return NextResponse.json({ error: 'Aucune vidéo fournie' }, { status: 400 });
    }
    
    // Vérifier la taille du fichier
    if (videoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Taille de fichier dépassée. Limite: ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }
    
    // Vérifier que le format est supporté
    if (!Object.keys(SUPPORTED_FORMATS).includes(format)) {
      return NextResponse.json(
        { error: `Format non supporté. Formats disponibles: ${Object.keys(SUPPORTED_FORMATS).join(', ')}` },
        { status: 400 }
      );
    }
    
    // Générer des noms de fichiers uniques
    const fileId = randomUUID();
    const inputPath = join(tmpDir, `input-${fileId}.mp4`);
    const outputPath = join(outputDir, `output-${fileId}.mp4`);
    
    filesToCleanup.push(inputPath);
    filesToCleanup.push(outputPath);
    
    // Écrire le fichier vidéo sur le disque
    const videoBuffer = Buffer.from(await videoFile.arrayBuffer());
    await writeFile(inputPath, videoBuffer);
    
    // Convertir la vidéo avec un timeout
    try {
      await convertVideo(inputPath, outputPath, format, cropPosition);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      throw error;
    }
    
    // Lire le fichier converti
    const convertedFile = await readFile(outputPath);
    
    // Renvoyer la vidéo convertie
    return new NextResponse(convertedFile, {
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="converted-${format}.mp4"`,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la conversion de la vidéo:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la conversion de la vidéo' },
      { status: 500 }
    );
  } finally {
    // Nettoyer les fichiers temporaires
    for (const file of filesToCleanup) {
      try {
        if (existsSync(file)) {
          await unlink(file);
        }
      } catch (err) {
        console.error(`Erreur lors du nettoyage du fichier ${file}:`, err);
      }
    }
  }
} 