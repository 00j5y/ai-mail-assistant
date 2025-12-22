const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser')

import type { ParsedMail } from "mailparser";
import type { FormatMail } from "../types";

// Définition de l'utilisateur
const client = new ImapFlow({
    host: Bun.env.HOST as string,
    port: Number(Bun.env.PORT) || 993,
    secure: true,
    auth: {
        user: Bun.env.USER as string,
        pass: Bun.env.PASSWORD as string
    },
    logger: false
});

// Fonction pour récupérer les emails
export const fetchEmails = async (): Promise<FormatMail[]> => {
    const mailCollecte: FormatMail[] = [];

    await client.connect();

    const lock = await client.getMailboxLock('INBOX');

    // Mail entre hier et aujourd'hui
    const now = new Date();
    const dateCible = new Date(now);
    dateCible.setDate(now.getDate() - 1);
    dateCible.setHours(0, 0, 0, 0);

    console.log(`🔎 Recherche depuis le : ${dateCible.toLocaleDateString()}`);

    try{
        const mailFetched = client.fetch(
            { since: dateCible},
            { source: true, envelope: true, uid: true }
        );

        // Ajout de tout les mails récupérés
        for await (const mail of mailFetched) {
            try {
                const parsed: ParsedMail = await simpleParser(mail.source);

                const cleanBody = parsed.text 
                    ? parsed.text.trim().substring(0, 1000)
                    : "[Contenu non-textuel ou vide]";

                
                mailCollecte.push({
                    seq: mail.seq,
                    from: parsed.from?.text || "(Inconnu)",
                    subject: parsed.subject || "(Pas de sujet)",
                    date: parsed.date ? parsed.date.toLocaleString('fr-FR') : "(Date inconnue)",
                    body: cleanBody.replace(/\s+/g, ' ') 
                });

            } catch (e) {
                console.error(`❌ Erreur parsing mail #${mail.seq}`);
            }
        }

    } catch (error: unknown) {
        const e = error as Error;
        console.error("🔴 Erreur fetch :", e.message);
    } finally {
        lock.release();
    }

    await client.logout();

    return mailCollecte;
};