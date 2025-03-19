import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, Film, Layers, MessageSquare, Sparkles, Video } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FeatureCard } from "@/components/feature-card"
import { VideoFormatCard } from "@/components/video-format-card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ClipAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Fonctionnalités
            </Link>
            <Link href="#formats" className="text-sm font-medium hover:text-primary">
              Formats
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Tarifs
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
              <Link href="/signup">S'inscrire</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Créez des vidéos professionnelles en quelques clics
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ClipAI transforme votre contenu brut en vidéos optimisées pour toutes les plateformes sociales grâce
                    à l'IA.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Commencer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#demo">Voir la démo</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-background">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Interface d'édition vidéo ClipAI"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Fonctionnalités puissantes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tout ce dont vous avez besoin pour créer des vidéos professionnelles pour chaque plateforme
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Édition IA"
                description="Recadrage automatique, sous-titres et transitions générés par intelligence artificielle"
              />
              <FeatureCard
                icon={<Layers className="h-10 w-10 text-primary" />}
                title="Formats multiples"
                description="Adaptez vos vidéos pour toutes les plateformes sociales en un clic"
              />
              <FeatureCard
                icon={<Video className="h-10 w-10 text-primary" />}
                title="Modèles prêts à l'emploi"
                description="Des dizaines de modèles professionnels pour chaque type de contenu"
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Sous-titres automatiques"
                description="Générez et éditez des sous-titres précis en quelques secondes"
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Ajustements simples"
                description="Contrôlez la luminosité, le contraste et les couleurs facilement"
              />
              <FeatureCard
                icon={<Film className="h-10 w-10 text-primary" />}
                title="Prévisualisation en temps réel"
                description="Voyez vos modifications instantanément sur différents formats d'écran"
              />
            </div>
          </div>
        </section>

        <section id="formats" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Optimisé pour chaque plateforme
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Adaptez automatiquement vos vidéos aux formats requis par chaque réseau social
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <VideoFormatCard platform="YouTube" ratio="16:9" icon="/placeholder.svg?height=80&width=80" />
              <VideoFormatCard platform="Instagram" ratio="1:1, 9:16" icon="/placeholder.svg?height=80&width=80" />
              <VideoFormatCard platform="TikTok" ratio="9:16" icon="/placeholder.svg?height=80&width=80" />
              <VideoFormatCard platform="LinkedIn" ratio="1:1, 16:9" icon="/placeholder.svg?height=80&width=80" />
              <VideoFormatCard platform="Twitter/X" ratio="16:9" icon="/placeholder.svg?height=80&width=80" />
              <VideoFormatCard platform="Facebook" ratio="16:9, 1:1" icon="/placeholder.svg?height=80&width=80" />
            </div>
          </div>
        </section>

        <section id="demo" className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Voyez ClipAI en action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez comment transformer vos vidéos en quelques clics
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl mt-12">
              <div className="aspect-video overflow-hidden rounded-xl border bg-background">
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Démo de ClipAI"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Plans simples et transparents
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choisissez le plan qui correspond à vos besoins
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <PricingCard
                title="Gratuit"
                price="0€"
                description="Parfait pour débuter"
                features={[
                  "5 projets vidéo",
                  "Exports en 720p",
                  "Formats basiques",
                  "Sous-titres automatiques",
                  "Filigrane ClipAI",
                ]}
                buttonText="Commencer gratuitement"
                buttonVariant="outline"
              />
              <PricingCard
                title="Pro"
                price="19€"
                period="/mois"
                description="Pour les créateurs réguliers"
                features={[
                  "Projets illimités",
                  "Exports en 1080p",
                  "Tous les formats sociaux",
                  "Sous-titres personnalisables",
                  "Sans filigrane",
                  "Modèles premium",
                ]}
                buttonText="S'abonner"
                buttonVariant="default"
                popular
              />
              <PricingCard
                title="Entreprise"
                price="49€"
                period="/mois"
                description="Pour les équipes professionnelles"
                features={[
                  "Projets illimités",
                  "Exports en 4K",
                  "Tous les formats sociaux",
                  "Sous-titres multilingues",
                  "Sans filigrane",
                  "Modèles exclusifs",
                  "Stockage cloud 100GB",
                  "Support prioritaire",
                ]}
                buttonText="Contacter les ventes"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-muted py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ce que disent nos utilisateurs
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Des milliers de créateurs font confiance à ClipAI pour leurs vidéos
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <TestimonialCard
                quote="ClipAI a révolutionné ma façon de créer du contenu. Je peux maintenant produire des vidéos pour toutes les plateformes en quelques minutes."
                author="Marie L."
                role="Influenceuse lifestyle"
                avatar="/placeholder.svg?height=80&width=80"
              />
              <TestimonialCard
                quote="L'outil parfait pour notre équipe marketing. Nous avons multiplié par 3 notre production de contenu vidéo depuis que nous utilisons ClipAI."
                author="Thomas D."
                role="Directeur Marketing, TechCorp"
                avatar="/placeholder.svg?height=80&width=80"
              />
              <TestimonialCard
                quote="Les sous-titres automatiques sont d'une précision incroyable, même avec mon accent. Un gain de temps phénoménal !"
                author="Sophie M."
                role="YouTubeuse"
                avatar="/placeholder.svg?height=80&width=80"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Prêt à transformer vos vidéos ?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rejoignez des milliers de créateurs qui utilisent ClipAI chaque jour
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Commencer gratuitement <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#demo">Voir la démo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">ClipAI</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 ClipAI. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

