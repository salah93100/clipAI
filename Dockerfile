# Étape de base avec Node.js
FROM node:20-alpine AS base

# Installation des dépendances système nécessaires
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copie des fichiers package.json et package-lock.json (ou yarn.lock)
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm i --frozen-lockfile

# Étape de construction (build)
FROM base AS builder
WORKDIR /app

# Copie des dépendances de l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Définition des variables d'environnement pour Supabase
ENV NEXT_PUBLIC_SUPABASE_URL=https://hgfupycpysbmlwvxkxlo.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZnVweWNweXNibWx3dnhreGxvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzk1MDk0MCwiZXhwIjoyMDU5NTI2OTQwfQ.dAloBnb06HG984EC4whWWj55c8clqxmw8Q8afAC1-FQ


# Construction de l'application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install -g pnpm && pnpm build

# Étape de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1



# Création d'un utilisateur non-root pour plus de sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copie des fichiers nécessaires pour la production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Utilisation de l'utilisateur non-root
USER nextjs

EXPOSE 3000

ENV PORT 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"]