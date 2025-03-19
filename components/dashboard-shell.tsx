import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr]">
      <DashboardNav />
      <main className="flex flex-col p-8">{children}</main>
    </div>
  )
}

