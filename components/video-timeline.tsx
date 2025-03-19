"use client"

import { Slider } from "@/components/ui/slider"

interface VideoTimelineProps {
  currentTime: number
  duration: number
  onTimeChange: (time: number) => void
}

export function VideoTimeline({ currentTime, duration, onTimeChange }: VideoTimelineProps) {
  return (
    <div className="space-y-1">
      <Slider
        value={[currentTime]}
        max={duration}
        step={0.1}
        onValueChange={(value) => onTimeChange(value[0])}
        className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-muted [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary/50 [&>span:first-child_span]:bg-primary"
      />
      <div className="flex justify-between">
        <div className="grid grid-cols-11 w-full">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-1 w-px bg-border" />
              <span className="text-[10px] text-muted-foreground">{formatTime((i * duration) / 10)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

