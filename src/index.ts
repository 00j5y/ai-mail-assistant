import { genererRecap } from "./services/gemini";
import { fetchEmails } from "./services/mailer";
import { envoieRecapDiscord } from "./services/discord";
import type { FormatMail } from "./types";
import cron from "node-cron";

const mailAssistant = async () => {
    // Récupération des emails
    const emails = await fetchEmails() as FormatMail[];
    const nbrEmails: number = emails.length;

    // Si aucun email, on stoppe le processus
    if (nbrEmails === 0) {
        console.log("Aucun email récupéré.");
        return;
    } else {
        console.log(`✅ ${nbrEmails} emails récupérés.`);
    }

    // Analyse des mails avec Gemini
    console.log("🧠 Analyse IA en cours...");
    const recapEmail: string = await genererRecap(emails);

    // Envoie du message sur Discord
    console.log("📨 Envoi du récapitulatif sur Discord...");
    await envoieRecapDiscord(recapEmail, nbrEmails);
};

// Lecture de la config cron
const HORAIRE_CRON = (Bun.env.HORAIRE_CRON || "0 11 * * *").replace(/^["']|["']$/g, "").trim();

console.log(`⏳ Le bot est démarré. Planification : ${HORAIRE_CRON}`);

// Validation simple de la tâche cron
if (!cron.validate(HORAIRE_CRON)) {
    console.error("❌ Format CRON invalide via HORAIRE_CRON");
    process.exit(1);
}

// Planification
cron.schedule(HORAIRE_CRON, async () => {
    await mailAssistant();
});

mailAssistant();