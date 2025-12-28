import { GoogleGenerativeAI } from "@google/generative-ai";
import type { FormatMail } from "../types";
import { resolve } from "path";

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
    
    try {
        const cheminPrompt = resolve(import.meta.dir, "../../prompt.txt");
        const fichierPrompt = Bun.file(cheminPrompt);

        if (!await fichierPrompt.exists()) {
            throw new Error(`Le fichier prompt.txt est introuvable au chemin : ${cheminPrompt}`);
        }

        const promptVierge = await fichierPrompt.text();

        const promptFinal = promptVierge.replace("{{EMAILS}}", formattedData);

        const result = await model.generateContent(promptFinal);
        return result.response.text();

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ Erreur API Gemini:", error.message);
        } else {
            console.error("❌ Erreur inconnue Gemini:", error);
        }
        return "Désolé, impossible de générer le résumé pour le moment.";
    }
};