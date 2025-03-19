import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FormatCardProps {
  title: string
  ratio: string
  icon: ReactNode
  description: string
}

export function FormatCard({ title, ratio, icon, description }: FormatCardProps) {
  return (
    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <span className="text-sm font-medium text-muted-foreground">{ratio}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

