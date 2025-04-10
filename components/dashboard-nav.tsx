"use client"

import Link from "next/link"
import { Film, Home, LayoutGrid, MessageSquare, Settings, User, Video, ChevronLeft, ChevronRight, LogOut, HelpCircle, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useSupabaseAuth } from "./supabase-auth-provider"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DashboardNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname()
  const { signOut, user } = useSupabaseAuth()

  // Vérifier si on est sur mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Enregistrer la préférence dans localStorage
    localStorage.setItem('sidebarCollapsed', String(!collapsed));
    
    // Déclencher un événement personnalisé pour notifier les autres composants
    document.dispatchEvent(new CustomEvent('sidebarStateChanged'));
  };

  // Récupérer la préférence utilisateur
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null && !isMobile) {
      setCollapsed(savedState === 'true');
    }
  }, [isMobile]);

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link 
          href={href}
          className={cn(
            "flex h-10 items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            collapsed ? "justify-center" : "justify-start gap-3"
          )}
        >
          <div className="flex-shrink-0 w-5 h-5">{icon}</div>
          {!collapsed && <span>{label}</span>}
        </Link>
      </TooltipTrigger>
      {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );

  return (
    <aside className={cn(
      "flex flex-col border-r bg-background transition-all duration-300 ease-in-out h-screen",
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      {/* Header */}
      <div className={cn(
        "flex h-16 items-center border-b",
        collapsed ? "justify-center px-0" : "px-4 justify-between"
      )}>
        {collapsed ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Film className="h-6 w-6 text-primary" />
              <span>ClipAI</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={toggleSidebar}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Main Nav */}
      <div className={cn(
        "flex-1 overflow-auto py-4",
        collapsed ? "px-2" : "px-3"
      )}>
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-1">
            <NavItem 
              href="/dashboard"
              icon={<Home className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Tableau de bord"
            />
            <NavItem 
              href="/dashboard/projects"
              icon={<Video className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Mes projets"
            />
            <NavItem 
              href="/dashboard/templates"
              icon={<LayoutGrid className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Réseaux sociaux"
            />
            <NavItem 
              href="/dashboard/subtitles"
              icon={<MessageSquare className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Sous-titres"
            />
          </nav>
          
          <Separator className="my-4" />
          
          <nav className="flex flex-col gap-1">
            <NavItem 
              href="/dashboard/settings"
              icon={<Settings className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Paramètres"
            />
            <NavItem 
              href="/dashboard/account"
              icon={<User className={cn("text-muted-foreground", collapsed ? "w-5 h-5" : "w-5 h-5")} />}
              label="Mon compte"
            />
          </nav>
        </TooltipProvider>
      </div>
      
      {/* Footer */}
      <div className="border-t">
        <TooltipProvider delayDuration={0}>
          <div className={cn(
            "py-3",
            collapsed ? "px-2" : "px-3"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/help"
                  className={cn(
                    "flex h-10 items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                    collapsed ? "justify-center" : "justify-start gap-3"
                  )}
                >
                  <HelpCircle className="flex-shrink-0 w-5 h-5" />
                  {!collapsed && <span>Centre d'aide</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">Centre d'aide</TooltipContent>}
            </Tooltip>
            
            {user && (
              <div className="mt-8 space-y-2">
                <div className="rounded-md border px-3 py-2">
                  <div className="text-sm font-medium">{user.email}</div>
                  <div className="text-xs text-muted-foreground">{user.user_metadata?.name || 'Utilisateur'}</div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal" 
                  onClick={() => signOut()}
                >
                  <div className="mr-2 h-4 w-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                  </div>
                  Se déconnecter
                </Button>
              </div>
            )}
          </div>
        </TooltipProvider>
      </div>
    </aside>
  );
}

