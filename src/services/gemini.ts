import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FormatMail } from "../types";

const genAI = new GoogleGenerativeAI(Bun.env.GEMINI_API_KEY as string);

const MailFormatGemini = (emails: FormatMail[]): string => {
    return emails.map((mail, index) => `
        --- EMAIL ${index + 1} ---
        📅 DATE : ${mail.date}
        👤 DE : ${mail.from}
        📑 SUJET : ${mail.subject}
        📝 CONTENU : ${mail.body}
        `).join('\n');
};

export const genererRecap = async (emails: FormatMail[]): Promise<string> => {
    if (emails.length === 0) return "Aucun email à traiter.";

    const formattedData = MailFormatGemini(emails) as string;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) as any;
    
    const prompt = `
    Tu es un assistant personnel rigoureux pour un étudiant à l'université UPJV.
    Ton rôle est de trier et résumer les emails reçus ces dernières 24h.

    Voici les règles STRICTES à suivre pour la réponse :
    1. **Formatage Discord :** Utilise du Markdown (gras, italique, listes).
    2. **Catégorisation :** Tu dois classer CHAQUE mail dans une des 3 catégories ci-dessous :
       - 🚨 **URGENT / IMPORTANT** : Changement de salle, annulation de cours, examen, note publiée, deadline, message direct d'un prof.
       - ℹ️ **INFORMATIONS** : Offres de stage, événements associatifs, infos administratives générales.
       - 🗑️ **SPAM / INUTILE** : Publicités, newsletters génériques sans intérêt immédiat (ne les affiche pas, dis juste combien il y en a).
    3. **Style :** Sois ultra-concis. Pas de phrases complètes si possible. Va droit au but.
    4. **Dates et Lieux :** Si un mail mentionne une date ou une salle, mets-les en **GRAS**.
    
    ---
    
    FORMAT DE RÉPONSE ATTENDU (Respecte scrupuleusement ce modèle) :

    **📅 Récapitulatif du [Date d'aujourd'hui]**

    🚨 **URGENT / À FAIRE**
    - [Sujet du mail] : Résumé en 5 mots (**Date/Lieu** si applicable).
    - [Sujet du mail] : Résumé...
    *(Si aucun mail urgent, écrire : "✅ Rien à signaler")*

    ℹ️ **INFORMATIONS**
    - [Sujet du mail] : Résumé rapide.
    *(Si aucune info, écrire : "∅ Aucune nouvelle information")*

    🗑️ *[Nombre] mails ignorés (Spam/Pub)*

    ---
    
    Voici les emails à analyser :
    ${formattedData}
    `;

    try {
        const result: any = await model.generateContent(prompt);
        return result.response.text();
    } catch (error: unknown) {
        const e = error as Error;
        console.error("❌ Erreur API Gemini:", e.message);
        return "Désolé, impossible de générer le résumé pour le moment.";
    }
};