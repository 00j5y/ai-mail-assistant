# upjv-mail-assistant

Un simple bot Discord permettant d'envoyer un récapitulatif quotidien des emails Universitaire UPJV généré avec Gemini 2.5 Flash via MP Discord

<h2 align="center">🔍 Sommaire</h2>

- [📋 Prérequis](#requirements)
- [✨ Téléchargement](#download)
- [⚙️ Configuration](#config)

<h2 id="requirements" align="center">📋 Prérequis</h2>

- Bun

<h2 id="download" align="center">✨ Téléchargement</h2>

### 1- Lancer un cmd dans un dossier
<img src="https://imgur.com/ERcae1L.gif" alt="Bannière" width="50%">

### 2- Cloner le code
```bash
git clone https://github.com/00j5y/upjv-mail-assistant.git
```

### 3- Aller dans le dossier
```bash
cd upjv-mail-assistant
```

### 4- Installer toutes les librairies
```bash
bun install
```
<h2 id="config" align="center">⚙️ Configuration</h2>

### Transferer vos mail UPJV sur Gmail
Astuce : [Gmail Horde UPJV](https://cdn.u-picardie.fr/docs_ent_etud/co/41__1-_ConfMail_Gmail_et_Hotmail.html#:~:text=Ajouter%20votre%20mail%20UPJV%20dans,Hotmail%20n'est%20pas%20possible.)

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
```
