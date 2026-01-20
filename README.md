# ai-mail-assistant

Un simple script TypeScript permettant d'envoyer un récapitulatif quotidien des vos emails Gmail généré avec Gemini 2.5 Flash via MP Discord

<h2 align="center">🔍 Sommaire</h2>

- [📋 Prérequis](#requirements)
- [⚙️ Configuration](#config)
- [✨ Installation](#download)
- [🐳 Installation via Docker](#docker)

<h2 id="requirements" align="center">📋 Prérequis</h2>

- Bun/NPM (pour l'instalation standard)
- Docker (pour l'instalation via Docker)

<h2 id="config" align="center">⚙️ Configuration</h2>

### Insérer votre prompt dans le fichier prompt.txt
Un prompt par défaut est déjà présent</br>
⚠️ La balise {{EMAILS}} réprésente vos emails dans le prompt

### Créer un .env avec les informations suivantes
```bash
# GMAIL Configuration
HOST=imap.gmail.com
PORT=993
USER=votre_addresse_gmail
PASSWORD=votre_mdp_d\'app

#GEMINI Configuration
GEMINI_API_KEY=votre_clé_api_gemini

# DISCORD Configuration
DISCORD_TOKEN=votre_token
ACCOUNT_ID=votre_id_discord

# CRON Configuration
HORAIRE_CRON="00 11 * * *" #Le code ce lance tout les jours à 11h
```


<h2 id="download" align="center">✨ Installation</h2>

### 1- Cloner le code
```bash
git clone https://github.com/00j5y/ai-mail-assistant.git
```

### 2- Aller dans le dossier
```bash
cd ai-mail-assistant
```

### 3- Installer toutes les librairies
```bash
bun install
```

<h2 id="docker" align="center">🐳 Installation via Docker</h2>

### 1- Cloner le code
```bash
git clone https://github.com/00j5y/ai-mail-assistant.git
```

### 2- Aller dans le dossier
```bash
cd ai-mail-assistant
```

### 3- Configurer l'environnement
Créez votre fichier `.env` et modifiez `prompt.txt` comme indiqué dans la section [Configuration](#config).

### 4- Lancer avec Docker Compose
```bash
docker compose up -d
```