const program = require("commander");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: true });

program
  .command("m <message>")
  .description("Send a message to the Telegram bot.")
  .action((message) => {
    bot.sendMessage(CHAT_ID, message);
    console.log("You message send");

  });

program
  .command("p <path>")
  .description("Send a photo to the Telegram bot.")
  .action((path) => {
    bot.sendPhoto(CHAT_ID, path);
    console.log("You photo send");

  });

program.parse(process.argv);
