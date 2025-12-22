import { genererRecap } from "./services/gemini";
import { fetchEmails } from "./services/mailer";
import { envoieRecapDiscord } from "./services/discord";
import type { FormatMail } from "./types";

const main = async () => {
    console.log("✅ Démarrage du bot...");

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
    envoieRecapDiscord(recapEmail, nbrEmails);
};

main();