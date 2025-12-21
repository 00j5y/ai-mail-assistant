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