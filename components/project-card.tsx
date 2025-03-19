import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  title: string
  thumbnail: string
  updatedAt: string
  platform: string
}

export function ProjectCard({ title, thumbnail, updatedAt, platform }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center justify-between w-full">
          <span>{platform}</span>
          <span>{updatedAt}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

