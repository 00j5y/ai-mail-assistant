const { ImapFlow } = require('imapflow');
const { simpleParser } = require('mailparser')

// Définition de l'utilisateur
const client = new ImapFlow({
    host: Bun.env.HOST,
    port: Bun.env.PORT,
    secure: true,
    auth: {
        user: Bun.env.USER,
        pass: Bun.env.PASSWORD
    }
});

const main = async () => {
    await client.connect();

    console.log("📥 Login")

    const lock = await client.getMailboxLock('INBOX');

    try{
        const messageGenerator = client.fetch(
            { seen: false }, 
            { 
                source: true,
                envelope: true,
                uid: true
            }
        );

        for await (const message of messageGenerator) {
            
            // Sépare le mail en plusieurs partie
            const parsed = await simpleParser(message.source);

            console.log(`\n--- Email #${message.seq} ---`);
            console.log(`Subject: ${parsed.subject}`);
            console.log(`From: ${parsed.from?.text}`);
            console.log(`Date: ${parsed.date}`);
            
            const bodyPreview = parsed.text ? parsed.text.substring(0, 100).replace(/\n/g, ' ') : '[Empty email body]';
            console.log(`Body: ${bodyPreview}...`);
            
            await client.messageFlagsAdd(message.uid, ['\Seen']);
        }
    } catch (e){
        console.error("🔴 Error :", e);
    } finally {
        lock.release();
    }

    await client.logout();
    console.log("📤 Logout");
};

main().catch(err => console.error(err));