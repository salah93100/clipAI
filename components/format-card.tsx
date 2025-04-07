import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormatCardProps {
  title: string
  ratio: string
  icon: React.ReactNode
  description: string
  formatId?: string
}

export function FormatCard({ title, ratio, icon, description, formatId }: FormatCardProps) {
  const handleFormatSelect = () => {
    // Obtenir l'ID du format basé sur le titre si formatId n'est pas fourni
    const id = formatId || title.toLowerCase().replace(' ', '-');
    
    // Créer un événement personnalisé avec l'ID du format
    const event = new CustomEvent('formatselect', {
      detail: { format: id }
    });
    
    // Dispatcher l'événement au niveau du document
    document.dispatchEvent(event);
    
    // Notifier d'autres composants via le DOM
    const videoUploadComponent = document.querySelector('.video-upload-container');
    if (videoUploadComponent) {
      const formatChangeEvent = new CustomEvent('formatchange', { 
        detail: { format: id } 
      });
      videoUploadComponent.dispatchEvent(formatChangeEvent);
    }
    
    console.log("Format sélectionné:", id);
  };

  return (
    <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleFormatSelect}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <div className="h-10 w-10 rounded-md bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2">{description}</CardDescription>
        <div className="text-sm text-muted-foreground">
          <p>Format: {ratio}</p>
        </div>
      </CardContent>
    </Card>
  )
}

