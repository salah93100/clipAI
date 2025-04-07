# ClipAI
<img width="1440" alt="Capture d’écran 2025-04-07 à 18 26 41" src="https://github.com/user-attachments/assets/ed502835-cdaf-4b1b-a939-e41c33fd1266" />

ClipAI est une plateforme d'édition vidéo alimentée par l'IA qui optimise automatiquement vos vidéos pour tous les formats de réseaux sociaux.

## 🚀 Fonctionnalités

- **Édition Automatique** : Recadrage, sous-titrage et édition alimentés par l'IA
- **Multi-formats** : Adaptation automatique pour TikTok, Instagram, YouTube, LinkedIn et autres plateformes
- **Sous-titrage Intelligent** : Génération et synchronisation automatique des sous-titres
- **Interface Intuitive** : Expérience utilisateur fluide et accessible
- **Gestion de Projets** : Organisation et suivi de vos projets vidéo

## 🛠️ Technologies

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Authentification & Base de données)
- Shadcn/UI (Composants)
- API IA pour traitement vidéo

## 📋 Prérequis

- Node.js (version 18+)
- npm ou yarn
- Compte Supabase (pour l'authentification et le stockage)

## 🔧 Installation

1. Clonez le dépôt
   ```bash
   git clone https://github.com/votre-username/clipai.git
   cd clipai
   ```

2. Installez les dépendances
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez les variables d'environnement
   - Créez un fichier `.env.local` à la racine du projet
   - Ajoutez les variables suivantes:
   ```
   NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anon-supabase
   ```

4. Lancez le serveur de développement
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🏗️ Structure du Projet

```
/app                    # Routes et pages (App Router)
  /api                  # Endpoints API
  /auth                 # Pages d'authentification
  /dashboard            # Interface principale
  /editor              # Éditeur vidéo
/components            # Composants React réutilisables
/lib                   # Utilitaires et fonctions partagées
/public                # Assets statiques
```

## 🔒 Authentification

ClipAI utilise Supabase pour la gestion de l'authentification, offrant les fonctionnalités suivantes:
- Inscription/Connexion par email/mot de passe
- Authentification sociale (Google)
- Gestion des sessions
- Protection des routes

## 🌐 Déploiement

Pour déployer l'application sur Vercel:

1. Créez un compte sur [Vercel](https://vercel.com) si ce n'est pas déjà fait
2. Connectez votre dépôt GitHub à Vercel
3. Configurez les variables d'environnement dans les paramètres du projet
4. Déployez!

## 📝 Licence

Ce projet est sous licence [MIT](LICENSE)

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à nous contacter à [votre-email@example.com]

---

Développé avec ❤️ par [Votre Nom/Société]
