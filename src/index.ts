import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = parseInt(process.env.TG_API_ID ?? "");
const apiHash = process.env.TG_API_HASH ?? "";
const sessionString = process.env.TG_SESSION ?? "";
const recipientId = process.env.TG_RECIPIENT_ID ?? "";
const messagesRaw = process.env.TG_MESSAGE ?? "";

if (!apiId || !apiHash || !sessionString || !recipientId || !messagesRaw) {
  console.error(
    "Missing required env vars: TG_API_ID, TG_API_HASH, TG_SESSION, TG_RECIPIENT_ID, TG_MESSAGE"
  );
  process.exit(1);
}

const messages = messagesRaw.split("\n").map((l) => l.trim()).filter(Boolean);
const messageText = messages[Math.floor(Math.random() * messages.length)];

(async () => {
  const client = new TelegramClient(
    new StringSession(sessionString),
    apiId,
    apiHash,
    { connectionRetries: 3 }
  );

  await client.connect();
  await client.sendMessage(recipientId, { message: messageText });
  console.log(`Sent to ${recipientId}: "${messageText}"`);
  await client.disconnect();
})();
