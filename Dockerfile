FROM oven/bun:1

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json bun.lock ./

# Installation des dépendances de production
RUN bun install --frozen-lockfile --production

# Copie du code source
COPY . .

# Définition de la variable d'environnement pour la prod
ENV NODE_ENV=production

# Commande de lancement
CMD ["bun", "run", "start"]
