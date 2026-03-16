import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import * as readline from "readline";

const apiId = parseInt(process.env.TG_API_ID ?? "");
const apiHash = process.env.TG_API_HASH ?? "";

if (!apiId || !apiHash) {
  console.error("Set TG_API_ID and TG_API_HASH env vars");
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q: string) => new Promise<string>((r) => rl.question(q, r));

(async () => {
  const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
    connectionRetries: 3,
  });

  await client.start({
    phoneNumber: () => ask("Phone number: "),
    password: () => ask("2FA password (if any): "),
    phoneCode: () => ask("Code from Telegram: "),
    onError: (e) => console.error(e),
  });

  console.log("\nYour session string (save as TG_SESSION secret):\n");
  console.log(client.session.save());
  rl.close();
  await client.disconnect();
})();
