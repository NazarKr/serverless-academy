import inquirer from "inquirer";
import { readDatabase, addToDatabase } from "./dbOperations.js";
import {
  loadDbQuestions,
  searchUserQuestions,
  startQuestions,
  userInfoQuestions,
} from "./questions.js";

const addUser = (name) => {
  inquirer.prompt(userInfoQuestions).then(async ({ userGender, userAge }) => {
    await addToDatabase(name, userGender, userAge);
    startPrompt();
  });
};

const loadDatabase = () => {
  inquirer.prompt(loadDbQuestions).then(async ({ confirmDisplayDb }) => {
    if (confirmDisplayDb) {
      console.log(await readDatabase());
      searchUser();
    }
    return;
  });
};

const searchUser = () => {
  inquirer.prompt(searchUserQuestions).then(async ({ userName }) => {
    const users = await readDatabase();
    const userFindRes =
      users.find(
        (item) => item.user.toLowerCase() === userName.toLowerCase()
      ) ?? startPrompt();
    return console.log(userFindRes);
  });
};

const startPrompt = () => {
  inquirer.prompt(startQuestions).then(({ userName }) => {
    if (userName.toLowerCase() !== "enter") {
      addUser(userName);
    } else {
      loadDatabase();
    }
  });
};

startPrompt();
