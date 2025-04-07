"use client";

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart, CheckCircle, ChevronRight, Film, Layers, LineChart, MessageSquare, Shield, Sparkles, Briefcase, Video, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FeatureCard } from "@/components/feature-card"
import { VideoFormatCard } from "@/components/video-format-card"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ClipAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#solutions" className="text-sm font-medium hover:text-primary">
              Solutions
            </Link>
            <Link href="#why-clipai" className="text-sm font-medium hover:text-primary">
              Pourquoi ClipAI
            </Link>
            <Link href="#formats" className="text-sm font-medium hover:text-primary">
              Formats
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Tarification
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Témoignages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Connexion
            </Link>
            <Button asChild>
              <Link href="/signup">Démarrer</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-[length:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]"></div>
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-background text-foreground mb-2 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-1"></span> 
                    Créez des vidéos professionnelles en quelques clics
                  </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                  <span className="text-primary">Automatisez</span> votre production de contenu vidéo
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  ClipAI optimise votre workflow vidéo. Adaptez votre contenu pour tous les canaux digitaux et augmentez votre ROI marketing avec notre plateforme IA.
                  </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button size="lg" className="font-medium" asChild>
                    <Link href="/signup">
                      Essai gratuit de 14 jours <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="font-medium" asChild>
                    <Link href="#demo">
                      Demander une démo <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-background/50 shadow-xl">
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
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/80 backdrop-blur-sm p-4 shadow-lg border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">ClipAI Dashboard</p>
                      <p className="text-xs text-muted-foreground">Transformez vos vidéos en quelques clics</p>
                    </div>
                    <Button size="sm" variant="secondary">Voir la démo</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-y bg-muted/30">
          <div className="container px-4 md:px-6">
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
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl">
                    Populaire
                  </div>
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

        <section id="contact" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
          <div className="container relative px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border bg-background p-8 md:p-12 shadow-lg">
                <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                      Prêt à transformer votre workflow vidéo ?
                </h2>
                    <p className="text-muted-foreground mb-6">
                      Rejoignez des centaines d'entreprises qui optimisent déjà leur stratégie vidéo avec ClipAI.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm">
                          <strong>Essai gratuit de 14 jours</strong> - Aucune carte de crédit requise
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm">
                          <strong>Onboarding personnalisé</strong> - Support dédié pour votre équipe
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-sm">
                          <strong>Annulation à tout moment</strong> - Sans engagement de durée
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-6 rounded-xl border">
                    <h3 className="text-lg font-medium mb-4">Démarrer votre essai gratuit</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">
                          Nom de l'entreprise
                        </label>
                        <input
                          type="text"
                          id="company"
                          className="w-full px-3 py-2 rounded-md border bg-background"
                          placeholder="Votre entreprise"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email professionnel
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 rounded-md border bg-background"
                          placeholder="vous@entreprise.com"
                        />
                      </div>
                      <Button className="w-full">Démarrer l'essai gratuit</Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      En vous inscrivant, vous acceptez nos{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Conditions d'utilisation
                      </Link>{" "}
                      et notre{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Politique de confidentialité
                      </Link>
                      .
                </p>
              </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t bg-muted/30">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Film className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ClipAI</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                Solution d'édition vidéo IA qui permet aux équipes marketing de créer du contenu professionnel pour tous les canaux.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Produit</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Fonctionnalités</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Intégrations</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Tarification</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cas d'usage</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Roadmap</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Communauté</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Tutoriels</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Webinaires</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Entreprise</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">À propos</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Clients</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Carrières</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Presse</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 ClipAI Technologies SAS. Tous droits réservés.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Conditions d'utilisation
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Politique de confidentialité
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Mentions légales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

