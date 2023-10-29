import TelegramApi from "node-telegram-bot-api";
import { startOption, weatherOptions } from "./options.js";
import { getWether } from "./weaterOperations.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true });

const start = async () => {
  bot.setMyCommands([
    { command: "/start", description: "What about the weather ?" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        return bot.sendMessage(chatId, "Start", startOption);
      }
      if (text === "Weather in Wakanda") {
        return bot.sendMessage(chatId, "Choose the period", weatherOptions);
      }
      if (
        text === "at intervals of 3 hours" ||
        text === "at intervals of 6 hours"
      ) {
        const weather = text.includes("3")
          ? await getWether()
          : await getWether(6);
        return bot.sendMessage(chatId, weather);
      }

      return bot.sendMessage(chatId, "Unknown command, try again");
    } catch (e) {
      return bot.sendMessage(chatId, "Something went wrong");
    }
  });
};

start();
