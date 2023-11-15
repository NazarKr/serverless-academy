const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const RequestError = require("../helpers/requestError");

const dbPath = path.resolve("db/data.json");

const putData = async (req, res) => {
  const { collection } = req.params;
  const data = req.body;

  const result = await readFile(dbPath, "utf8");

  if (!result) {
    console.error("File is empty");
    return res.status(400).json({ error: "File is empty" });
  }
  
  const db = JSON.parse(result);

  const uniqueId = uuidv4();

  if (!db[collection]) {
    const newContent = {
      [collection]: { [uniqueId]: { id: uniqueId, ...data } },
    };
    console.log("NEW CONTENT - ", newContent);
    await writeFile(dbPath, JSON.stringify({ ...db, ...newContent }), "utf8");
    return res.status(200).json({
      data: newContent,
    });
  }

  db[collection][uniqueId] = { id: uniqueId, ...data };

  console.log("DB LOG - ", db);
  await writeFile(dbPath, JSON.stringify(db), "utf8");

  return res.status(200).json({
    data: db[collection][uniqueId],
  });
};

const getData = async (req, res) => {
  const { collection } = req.params;
  const result = await readFile(dbPath, "utf8");
  const db = JSON.parse(result);

  if (!db[collection]) {
    throw RequestError(404);
  }
  return res.status(200).json({ data: db[collection] });
};

module.exports = { putData, getData };
