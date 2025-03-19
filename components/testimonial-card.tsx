import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar: string
}

export function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{author}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic">"{quote}"</p>
      </CardContent>
    </Card>
  )
}

