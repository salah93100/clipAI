import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VideoFormatCardProps {
  platform: string
  ratio: string
  icon: string
}

export function VideoFormatCard({ platform, ratio, icon }: VideoFormatCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{platform}</CardTitle>
          <Image
            src={icon || "/placeholder.svg"}
            alt={platform}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md"
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Format: {ratio}</p>
      </CardContent>
    </Card>
  )
}

