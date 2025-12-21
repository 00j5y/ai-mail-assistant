import { fetchEmails } from "./services/mailer";
import type { FormatMail } from "./types";

const client = async () => {
    console.log("✅ Démarrage du bot");
    
    // Récupération des emails
    const emails = await fetchEmails() as FormatMail[];

    if (emails.length === 0) {
        console.log("Aucun email récupéré.");
        return;
    } else {
        console.log(`✅ ${emails.length} emails récupérés.`);
    }

    // Analyse des mails avec Gemini
    console.log("🧠 Analyse IA en cours...");

    //

};

client();