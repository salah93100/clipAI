"use client"

import { Film, Instagram, Linkedin, Smartphone, Twitter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormatSelectorProps {
  value: string
  onValueChange: (value: string) => void
}

export function FormatSelector({ value, onValueChange }: FormatSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionner un format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="youtube">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4" />
            <span>YouTube (16:9)</span>
          </div>
        </SelectItem>
        <SelectItem value="instagram-post">
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            <span>Instagram Post (1:1)</span>
          </div>
        </SelectItem>
        <SelectItem value="instagram-reels">
          <div className="flex items-center gap-2">
            <Instagram className="h-4 w-4" />
            <span>Instagram Reels (9:16)</span>
          </div>
        </SelectItem>
        <SelectItem value="tiktok">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>TikTok (9:16)</span>
          </div>
        </SelectItem>
        <SelectItem value="linkedin">
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn (16:9)</span>
          </div>
        </SelectItem>
        <SelectItem value="twitter">
          <div className="flex items-center gap-2">
            <Twitter className="h-4 w-4" />
            <span>Twitter/X (16:9)</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

