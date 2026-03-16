import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const apiId = parseInt(process.env.TG_API_ID ?? "");
const apiHash = process.env.TG_API_HASH ?? "";
const sessionString = process.env.TG_SESSION ?? "";
const recipientId = process.env.TG_RECIPIENT_ID ?? "";
const messageText = process.env.TG_MESSAGE ?? "";

if (!apiId || !apiHash || !sessionString || !recipientId || !messageText) {
  console.error(
    "Missing required env vars: TG_API_ID, TG_API_HASH, TG_SESSION, TG_RECIPIENT_ID, TG_MESSAGE"
  );
  process.exit(1);
}

(async () => {
  const client = new TelegramClient(
    new StringSession(sessionString),
    apiId,
    apiHash,
    { connectionRetries: 3 }
  );

  await client.connect();
  await client.sendMessage(recipientId, { message: messageText });
  console.log(`Message sent to ${recipientId}`);
  await client.disconnect();
})();
