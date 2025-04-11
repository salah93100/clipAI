# Étape de base avec Node.js
FROM node:18-alpine AS base

# Installation des dépendances système nécessaires
FROM base AS deps
RUN apk add --no-cache libc6-compat ffmpeg
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Étape de construction (build)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Définition des arguments pour les variables d'environnement
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Affichage des valeurs pour debug (optionnel)
RUN echo "Supabase URL: $NEXT_PUBLIC_SUPABASE_URL"
RUN echo "Supabase Key: $NEXT_PUBLIC_SUPABASE_ANON_KEY"

# Définition des variables d'environnement pour le build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_TELEMETRY_DISABLED=1

# Construction de l'application
RUN npm install -g pnpm && pnpm build

# Étape de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Transfert des variables d'environnement pour l'exécution
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Installation de FFmpeg dans l'image finale
RUN apk add --no-cache ffmpeg

# Création d'un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Commande pour démarrer l'application
CMD ["npm", "start"]