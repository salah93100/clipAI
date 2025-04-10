"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, CheckCircle2, ArrowUpRight, BarChart2, CheckCircle, Clock, Film, LucideIcon, 
  LayoutGrid, ShieldCheck, Zap, Heart, Star, ZapIcon, SlidersHorizontal, ArrowRightCircle, BarChart, Code,
  Linkedin as LinkedinIcon, Twitter as TwitterIcon, Youtube as YoutubeIcon, Sparkles, Layers, Shield, MessageSquare, Briefcase, LineChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FeatureCard } from "@/components/feature-card"
import { VideoFormatCard } from "@/components/video-format-card"
import { FloatingNavbar } from "@/components/floating-navbar"
import { createClient } from '@supabase/supabase-js'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingNavbar />
      <main className="flex-1">
        <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
          <div className="absolute inset-0 bg-grid-white/10 bg-[length:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]"></div>
          
          <div className="container mx-auto px-4 md:px-6 w-full md:w-4/5 lg:w-3/4 relative">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-background text-foreground mb-4 w-fit">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span>Solution d'entreprise
          </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">
                <span className="text-primary">Centralisez, pilotez</span> et optimisez votre production vidéo
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
                Digitalisez toutes les étapes de votre chaîne de production vidéo, suivez vos projets en temps réel et accédez à des outils d'optimisation avancés depuis une plateforme unique.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-5 sm:gap-8">
                <Button size="lg" className="font-medium px-8" asChild>
                  <Link href="/signup">
                    Demander une démo
            </Link>
                </Button>
                <Button size="lg" variant="outline" className="font-medium px-8" asChild>
                  <Link href="#demo">
                    Voir en action
            </Link>
                </Button>
              </div>
              
              <div className="mt-16 w-full max-w-4xl mx-auto relative">
                <div className="absolute -top-3 -left-3 w-24 h-24 border-t border-l border-primary/20 rounded-tl-xl"></div>
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b border-r border-primary/20 rounded-br-xl"></div>
                
                <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-background to-muted/30 shadow-[0_20px_80px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_-10px_rgba(0,0,0,0.3)]">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/videoHero.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1 text-xs font-medium flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    Plateforme en direct
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-background/70 border-t border-gray-200 dark:border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Film className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">ClipAI Enterprise Suite</p>
                          <p className="text-xs text-muted-foreground">Plateforme intégrée d'optimisation vidéo</p>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="gap-1.5">
                        <span>Voir la démo</span>
                        <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
                </div>
                
                <div className="text-center mt-3 text-xs text-muted-foreground">
                  Interface utilisateur de la plateforme ClipAI Enterprise — Vue dashboard administrateur
                </div>
              </div>
              
              
              <div className="mt-16 w-full">
                <div className="border-t border-gray-200 dark:border-gray-800 w-full mb-12"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">350+</div>
                    <p className="text-sm text-muted-foreground mt-1">Entreprises équipées</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                    <p className="text-sm text-muted-foreground mt-1">Taux de satisfaction</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">80%</div>
                    <p className="text-sm text-muted-foreground mt-1">Temps économisé</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <div className="text-3xl md:text-4xl font-bold text-primary">12M+</div>
                    <p className="text-sm text-muted-foreground mt-1">Vidéos générées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Une solution complète
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Solutions d'édition vidéo conçues pour les équipes marketing
              </h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl">
                Optimisez votre workflow de production vidéo et créez du contenu percutant pour tous vos canaux digitaux
              </p>
            </div>
            
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Édition IA"
                description="Optimisez automatiquement vos vidéos grâce à notre technologie d'intelligence artificielle avancée"
              />
              <FeatureCard
                icon={<Layers className="h-10 w-10 text-primary" />}
                title="Adaptation multi-format"
                description="Convertissez instantanément vos vidéos pour tous les canaux digitaux et maximisez votre portée"
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Sécurité entreprise"
                description="Protégez vos contenus avec notre infrastructure sécurisée et conforme aux normes RGPD"
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Sous-titrage automatique"
                description="Générez des sous-titres précis en plusieurs langues pour améliorer l'accessibilité et l'engagement"
              />
              <FeatureCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Gestion des ressources"
                description="Organisez, stockez et partagez efficacement vos projets vidéo au sein de votre équipe"
              />
              <FeatureCard
                icon={<BarChart className="h-10 w-10 text-primary" />}
                title="Analytics avancés"
                description="Suivez les performances de vos vidéos et optimisez votre stratégie de contenu"
              />
            </div>
          </div>
        </section>

        <section id="why-clipai" className="py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  Pourquoi ClipAI
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Optimisez votre workflow vidéo et boostez votre ROI marketing
                </h2>
                <p className="text-muted-foreground mb-8">
                  Les équipes marketing et communication font confiance à ClipAI pour produire davantage de contenu vidéo de qualité, en moins de temps et avec moins de ressources.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">80% de temps gagné</h3>
                      <p className="text-muted-foreground text-sm">Automatisez les tâches répétitives d'édition vidéo et concentrez-vous sur la stratégie de contenu</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <LineChart className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">3x plus de contenu</h3>
                      <p className="text-muted-foreground text-sm">Créez du contenu de qualité pour tous vos canaux à partir d'une seule vidéo source</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Qualité professionnelle</h3>
                      <p className="text-muted-foreground text-sm">Résultats parfaitement adaptés aux standards et bonnes pratiques de chaque plateforme</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden border bg-background">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={640}
                  height={480}
                  alt="ClipAI Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">ROI vérifié</h4>
                        <p className="text-xs text-muted-foreground">Par des centaines d'entreprises</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1 rounded-full bg-primary/20 w-full">
                        <div className="h-1 rounded-full bg-primary w-3/4"></div>
                      </div>
                      <span className="text-xs font-medium">75%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="formats" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Flexibilité maximale
              </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Un seul contenu, tous les formats
                </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Optimisez votre stratégie multi-canal avec des vidéos parfaitement adaptées à chaque plateforme
              </p>
            </div>
            
            <div className="relative mt-16 mb-8 mx-auto max-w-5xl">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border rounded-full p-4 shadow-lg">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border rounded-xl overflow-hidden shadow-lg">
                <div className="relative bg-muted p-6 border-b md:border-b-0 md:border-r flex flex-col items-center text-center">
                  <h3 className="text-lg font-medium mb-2">Réseaux Professionnels</h3>
                  <p className="text-sm text-muted-foreground mb-4">Formats optimisés pour générer des leads et renforcer votre image de marque</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">LinkedIn 16:9</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Twitter/X 16:9</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Webinaire 16:9</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" size="sm">En savoir plus</Button>
                  </div>
                </div>
                <div className="relative bg-primary/5 p-6 border-b md:border-b-0 md:border-r flex flex-col items-center text-center">
                  <h3 className="text-lg font-medium mb-2">Réseaux Grand Public</h3>
                  <p className="text-sm text-muted-foreground mb-4">Formats optimisés pour maximiser l'engagement et la visibilité de votre marque</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Instagram 1:1</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Facebook 16:9</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">YouTube 16:9</span>
                  </div>
                  <div className="mt-auto">
                    <Button size="sm">Essayer maintenant</Button>
                  </div>
                </div>
                <div className="relative bg-muted p-6 flex flex-col items-center text-center">
                  <h3 className="text-lg font-medium mb-2">Réseaux Verticaux</h3>
                  <p className="text-sm text-muted-foreground mb-4">Formats optimisés pour les plateformes mobiles et le contenu de courte durée</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">TikTok 9:16</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Reels 9:16</span>
                    <span className="bg-background text-xs font-medium px-2 py-1 rounded border">Stories 9:16</span>
                  </div>
                  <div className="mt-auto">
                    <Button variant="outline" size="sm">En savoir plus</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-12">
              <Button variant="outline" className="group" asChild>
                <Link href="#pricing">
                  Voir toutes nos options <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="demo" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  Démonstration
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Voyez ClipAI en action
                </h2>
                <p className="text-muted-foreground mb-6">
                  Découvrez comment des entreprises comme la vôtre utilisent ClipAI pour transformer leur stratégie de contenu vidéo.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Interface intuitive pour tous les niveaux d'expertise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Workflow guidé pour une prise en main rapide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Résultats professionnels en quelques minutes</span>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button asChild>
                    <Link href="/signup">Essayer gratuitement</Link>
                  </Button>
                  <Button variant="outline" className="gap-1" asChild>
                    <Link href="#contact">
                      <span className="text-primary">Planifier une démo</span>
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-xl bg-background">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary hover:scale-105 transition-all">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                    <span className="sr-only">Play video</span>
                  </Button>
            </div>
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Démo de ClipAI"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Tarification transparente
              </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Des plans adaptés à votre échelle
                </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Solutions flexibles pour les équipes marketing de toutes tailles, sans frais cachés
              </p>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm font-medium">Facturation mensuelle</span>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full border bg-muted">
                  <span className="absolute h-4 w-4 rounded-full bg-primary transition-transform translate-x-6"></span>
                </div>
                <span className="text-sm font-medium">Facturation annuelle</span>
                <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-0.5">Économisez 20%</span>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              <PricingCard
                title="Startup"
                price="99€"
                period="/mois"
                description="Idéal pour les petites équipes marketing"
                features={[
                  "15 projets vidéo/mois",
                  "Exports en 1080p",
                  "Formats standards",
                  "Sous-titres automatiques",
                  "1 utilisateur",
                  "Support par email",
                ]}
                buttonText="Démarrer l'essai gratuit"
                buttonVariant="outline"
              />
              <PricingCard
                title="Business"
                price="249€"
                period="/mois"
                description="Pour les équipes marketing en croissance"
                features={[
                  "Projets illimités",
                  "Exports en 4K",
                  "Tous les formats",
                  "Sous-titres multilingues",
                  "5 utilisateurs",
                  "API d'intégration",
                  "Support prioritaire",
                ]}
                buttonText="Démarrer l'essai gratuit"
                buttonVariant="default"
                popular
              />
              <PricingCard
                title="Enterprise"
                price="Personnalisé"
                description="Solutions sur mesure pour les grandes organisations"
                features={[
                  "Volume personnalisé",
                  "SSO et contrôles avancés",
                  "Stockage dédié",
                  "SLA garantis",
                  "Utilisateurs illimités",
                  "Intégrations personnalisées",
                  "Gestionnaire de compte dédié",
                ]}
                buttonText="Contacter les ventes"
                buttonVariant="outline"
              />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Besoin d'une solution personnalisée ? Contactez notre équipe commerciale pour un plan adapté à vos besoins spécifiques.
              </p>
              <Button variant="link" asChild>
                <Link href="#contact" className="text-primary font-medium">
                  Discuter avec un conseiller <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Témoignages clients
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                La confiance des professionnels
                </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Découvrez comment ClipAI transforme les workflows vidéo d'entreprises comme la vôtre
              </p>
            </div>
            
            <div className="relative mt-12">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                <Button variant="ghost" size="icon" className="rounded-full bg-background shadow-md">
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </Button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <Button variant="ghost" size="icon" className="rounded-full bg-background shadow-md">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-8">
                <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99996 14.1668L5.42163 17.0002L6.6583 11.7835L2.5 8.16683L7.84163 7.6835L9.99996 2.8335L12.1583 7.6835L17.5 8.16683L13.3416 11.7835L14.5783 17.0002L9.99996 14.1668Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 text-base mb-4">
                    "ClipAI a complètement transformé notre approche du contenu vidéo. Ce qui prenait auparavant des jours ne prend désormais que quelques heures, avec des résultats de meilleure qualité."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image 
                      src="/placeholder.svg?height=80&width=80" 
                      width={48} 
                      height={48} 
                      alt="Avatar" 
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Sophie Martinet</div>
                      <div className="text-sm text-muted-foreground">Directrice Marketing, TechCorp</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99996 14.1668L5.42163 17.0002L6.6583 11.7835L2.5 8.16683L7.84163 7.6835L9.99996 2.8335L12.1583 7.6835L17.5 8.16683L13.3416 11.7835L14.5783 17.0002L9.99996 14.1668Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 text-base mb-4">
                    "La possibilité d'adapter automatiquement nos webinaires pour LinkedIn et Twitter nous fait gagner un temps précieux. Notre équipe a augmenté sa productivité de 65% depuis que nous utilisons ClipAI."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image 
                      src="/placeholder.svg?height=80&width=80" 
                      width={48} 
                      height={48} 
                      alt="Avatar" 
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Thomas Dubois</div>
                      <div className="text-sm text-muted-foreground">Responsable Contenu, InnovGroup</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-5 w-5 fill-primary" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99996 14.1668L5.42163 17.0002L6.6583 11.7835L2.5 8.16683L7.84163 7.6835L9.99996 2.8335L12.1583 7.6835L17.5 8.16683L13.3416 11.7835L14.5783 17.0002L9.99996 14.1668Z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 text-base mb-4">
                    "Le ROI de ClipAI est évident dès le premier mois. Notre engagement sur les réseaux sociaux a augmenté de 147% grâce à la régularité et à la qualité de nos publications vidéo."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <Image 
                      src="/placeholder.svg?height=80&width=80" 
                      width={48} 
                      height={48} 
                      alt="Avatar" 
                      className="rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">Marie Legrand</div>
                      <div className="text-sm text-muted-foreground">CMO, DataSphere</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-10">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((dot) => (
                  <div 
                    key={dot} 
                    className={`h-2 w-2 rounded-full ${dot === 1 ? 'bg-primary' : 'bg-primary/30'}`}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 flex justify-center">
              <div className="rounded-xl border bg-background p-8 shadow-lg max-w-4xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <Image 
                      src="/placeholder.svg?height=150&width=150" 
                      width={150} 
                      height={150} 
                      alt="Logo client" 
                      className="h-24 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <blockquote className="text-lg font-medium mb-4">
                      "Nous avons réduit nos coûts de production vidéo de 60% tout en doublant notre volume de contenu grâce à ClipAI. Une solution incontournable pour toute équipe marketing sérieuse."
                    </blockquote>
                    <div className="font-medium">Jean-Pierre Martin</div>
                    <div className="text-sm text-muted-foreground">Directeur Digital, GlobalTech</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Prêt à démarrer ?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Transformez votre stratégie vidéo dès aujourd'hui
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Rejoignez plus de 350 entreprises qui optimisent leur production vidéo et augmentent leur ROI grâce à ClipAI.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>14 jours d'essai sans engagement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Accès complet à toutes les fonctionnalités</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Support technique dédié</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Commencer gratuitement
                  </Button>
                  <Button variant="outline" size="lg">
                    Demander une démo <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg dark:bg-gray-950">
                <h3 className="text-xl font-bold mb-4">Demandez une démo personnalisée</h3>
                <p className="text-gray-500 mb-6 dark:text-gray-400">
                  Notre équipe vous contactera sous 24h pour organiser une démonstration adaptée à vos besoins.
                </p>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Prénom</Label>
                      <Input id="first-name" placeholder="Prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nom</Label>
                      <Input id="last-name" placeholder="Nom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
                    <Input id="email" placeholder="vous@entreprise.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Entreprise</Label>
                    <Input id="company" placeholder="Nom de votre entreprise" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Fonction</Label>
                    <Input id="job-title" placeholder="Directeur Marketing, etc." />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                    Demander ma démo
                </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <video className="h-6 w-6" autoPlay loop muted playsInline>
                  <source src="/logo.mp4" type="video/mp4" />
                </video>
                <span className="text-xl font-bold">ClipAI</span>
              </div>
              <p className="text-gray-500 max-w-sm dark:text-gray-400">
                La plateforme d'édition vidéo IA qui transforme la façon dont les entreprises créent du contenu vidéo à grande échelle.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <LinkedinIcon className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-primary">
                  <YoutubeIcon className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produit</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#solutions" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#formats" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Formats
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Témoignages
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Statut système
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 ClipAI. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Conditions générales
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

