import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";

export const dbPath = path.resolve("database.txt");

export async function readDatabase() {
  try {
    const users = await readFile(dbPath, "utf8");
    return JSON.parse(users);
  } catch (error) {
    console.log(error);
  }
}

export async function addToDatabase(user, gender, age) {
  try {
    const users = await readFile(dbPath, "utf8");
    const parsedUsers = JSON.parse(users);
    const newContent = [...parsedUsers, { user, gender, age }];
    await writeFile(dbPath, JSON.stringify(newContent), "utf8");
  } catch (error) {
    console.log(error);
  }
}
