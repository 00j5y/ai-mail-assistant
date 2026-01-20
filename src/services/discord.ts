import { Client, Events, GatewayIntentBits, EmbedBuilder } from 'discord.js';

const ACCOUNT = Bun.env.ACCOUNT_ID as string;
const TOKEN = Bun.env.DISCORD_TOKEN as string;

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const initDiscord = async () => {
    if (client.isReady()) return;

    client.once(Events.ClientReady, (c) => {
        console.log(`🤖 Bot Discord connecté en tant que ${c.user.tag}`);
    });

    try {
        await client.login(TOKEN);
    } catch (error: unknown) {
        const e = error as Error;
        throw new Error(`❌ Impossible d'initialiser Discord : ${e.message}`);
    }
};

export const envoieRecapDiscord = async (recapEmail: string, nbrEmail: number) => {
    try {
        // Vérification si le bot est bien prêt
        await initDiscord();

        // Récupération de l'utilisateur
        const user = await client.users.fetch(ACCOUNT);

        // Si on ne trouve pas l'utilisateur
        if (!user) {
            console.error("❌ Utilisateur introuvable. Vérifie l'ID.");
            return;
        }

        console.log(`📤 Envoi du récapitulatif (${nbrEmail} mails) à ${user.username}...`);

        // Création de l'Embed
        const summaryEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`📬 Récapitulatif : ${nbrEmail} nouveaux mails`)
            .setDescription(recapEmail)
            .setTimestamp()
            .setFooter({ text: 'Bot Email Recap' });

        await user.send({ embeds: [summaryEmbed] });
        console.log("✅ MP envoyé avec succès.\n");

    } catch (error: unknown) {
        const e = error as Error;
        console.error("🔴 Erreur lors l'envoi du MP :", e);
    }
};