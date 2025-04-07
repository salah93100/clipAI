"use client"

import { useEffect, useState, type ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Vérifier l'état de la sidebar dans localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }
  }, []);
  
  // Écouter les changements d'état de la sidebar
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        setSidebarCollapsed(savedState === 'true');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event pour les changements dans la même fenêtre
    const handleCustomEvent = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        setSidebarCollapsed(savedState === 'true');
      }
    };
    
    document.addEventListener('sidebarStateChanged', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('sidebarStateChanged', handleCustomEvent);
    };
  }, []);
  
  return (
    <div className="grid h-screen w-full transition-all duration-300 ease-in-out" 
      style={{ 
        gridTemplateColumns: sidebarCollapsed ? '60px 1fr' : '240px 1fr',
      }}
    >
      <DashboardNav />
      <main className="flex flex-col p-8 overflow-y-auto">{children}</main>
    </div>
  )
}

