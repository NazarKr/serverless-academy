import TelegramApi from "node-telegram-bot-api";
import { getCurrency, myCache } from "./currencyOperations.js";
import { currentOption, startOption, intervalOptions } from "./options.js";
import { getWether } from "./weaterOperations.js";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TOKEN;

const bot = new TelegramApi(TOKEN, { polling: true });

const currencyCodes = {
  USD: 840,
  EUR: 978,
};

const getSelectedCurrecy = (selected, arr) => {
  return arr.find((item) => item.currencyCodeA === currencyCodes[selected]);
};

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
        return bot.sendMessage(chatId, "Choose the period", intervalOptions);
      }
      if (text === "Check current exchange rates") {
        return bot.sendMessage(chatId, "Choose the currency", currentOption);
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

      if (text === "USD" || text === "EUR") {
        try {
          const result = await getCurrency();
          const { rateBuy, rateSell } = getSelectedCurrecy(text, result);
          return bot.sendMessage(
            chatId,
            `Here is rates for ${text}: \nBuy: ${rateBuy}\nSell: ${rateSell}`
          );
        } catch (error) {
          const cachedResult = myCache.get("currency");
          const { rateBuy, rateSell } = getSelectedCurrecy(text, cachedResult);
          return bot.sendMessage(
            chatId,
            `Here is rates for ${text}: \nBuy: ${rateBuy}\nSell: ${rateSell}`
          );
        }
      }

      return bot.sendMessage(chatId, "Unknown command, try again");
    } catch (e) {
      return bot.sendMessage(chatId, "Something went wrong");
    }
  });
};

start();
