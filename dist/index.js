"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = require("telegram");
const sessions_1 = require("telegram/sessions");
const apiId = parseInt((_a = process.env.TG_API_ID) !== null && _a !== void 0 ? _a : "");
const apiHash = (_b = process.env.TG_API_HASH) !== null && _b !== void 0 ? _b : "";
const sessionString = (_c = process.env.TG_SESSION) !== null && _c !== void 0 ? _c : "";
const recipientId = (_d = process.env.TG_RECIPIENT_ID) !== null && _d !== void 0 ? _d : "";
const messagesRaw = (_e = process.env.TG_MESSAGE) !== null && _e !== void 0 ? _e : "";
if (!apiId || !apiHash || !sessionString || !recipientId || !messagesRaw) {
    console.error("Missing required env vars: TG_API_ID, TG_API_HASH, TG_SESSION, TG_RECIPIENT_ID, TG_MESSAGE");
    process.exit(1);
}
const messages = messagesRaw.split("\n").map((l) => l.trim()).filter(Boolean);
const messageText = messages[Math.floor(Math.random() * messages.length)];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new telegram_1.TelegramClient(new sessions_1.StringSession(sessionString), apiId, apiHash, { connectionRetries: 3 });
    yield client.connect();
    yield client.sendMessage(recipientId, { message: messageText });
    console.log(`Sent to ${recipientId}: "${messageText}"`);
    yield client.disconnect();
}))();
