import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface TemplateCardProps {
  title: string
  thumbnail: string
  platform: string
}

export function TemplateCard({ title, thumbnail, platform }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:border-primary/50 transition-colors">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <span className="text-xs text-muted-foreground">{platform}</span>
        </div>
      </CardContent>
    </Card>
  )
}

