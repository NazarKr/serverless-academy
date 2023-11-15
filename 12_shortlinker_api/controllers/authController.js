const client = require('../db');
const { v4: uuidv4 } = require("uuid");
const RequestError = require("../helpers/requestError");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenOperations");
const { incryptPassword } = require("../utils/incryptPassword");
const { isValidPassword } = require("../utils/isValidPassword");
const { successTemplate } = require('../utils/successTemplate');

const userAttributes = [
  "id",
  "email",
  "password",
  "refreshToken",
  "created_at",
];

const insertParsedAttributes = userAttributes.slice(0, 4).join(", ");

const registration = async (req, res) => {
  const { email: reqEmail, password } = req.body;

  //check query in use
  const checkQuery = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [reqEmail],
  };
  const user = await client.query(checkQuery);

  //check alredy in use
  if (user.rows[0]) throw RequestError(409, "This email is alredy in use");

  const userId = uuidv4();
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  const incryptedPassword = await incryptPassword(password);

  await client.query(
    `insert into users (${insertParsedAttributes})
        values ($1, $2, $3, $4)`,
    [userId, reqEmail, incryptedPassword, refreshToken]
  );

  return res.status(201).json(
    successTemplate({
      id: userId,
      accessToken,
      refreshToken,
    })
  );
};

const login = async (req, res) => {
    const { email: reqEmail, password } = req.body;

    const checkQuery = {
        text: "SELECT * FROM users WHERE email = $1",
        values: [reqEmail],
    };
    
    const user = (await client.query(checkQuery)).rows[0];

    if (!user) {
        throw RequestError(401, "User with this email not found");
    }

    if (!(await isValidPassword(password, user.password))) {
        throw RequestError(401, "Wrong password");
    }

    const accessToken = genereteAccessToken(user.id);
    const refreshToken = genereteRefreshToken(user.id);

    return res.status(200).json(
        successTemplate({
            id: user.id,
            accessToken,
            refreshToken,
        })
    )
};

module.exports = { registration, login };