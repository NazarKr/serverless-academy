const shortid = require("shortid");
const { v4: uuidv4 } = require("uuid");
const client = require("../db");
const RequestError = require("../helpers/requestError");

const linkAttributes = ["id", "originalLink", "shortToken", "created_at"];
const insertParsedAttributes = linkAttributes.slice(0, 3).join(", ");

const shortenLink = async (req, res) => {
  const { link: originalLink } = req.body;

  const id = uuidv4();
  const partForHash = originalLink.split("/");
  partForHash.splice(0, 3);

  const linkToken = shortid.generate(partForHash.join(""));

  const checkQuery = {
    text: "SELECT * FROM links WHERE originalLink = $1",
    values: [originalLink],
  };
  const link = await client.query(checkQuery);

  if (
    link?.rows[0]?.originallink === originalLink ||
    link?.rows[0]?.shorttoken === linkToken
  ) {
    throw RequestError(409, "Link already exists");
  }

  const createLinkQuery = {
    text: `
  insert into links (${insertParsedAttributes})
  values ($1, $2, $3)
    `,
    values: [id, originalLink, linkToken],
  };
  await client.query(createLinkQuery);

  const shortUrl = `${req.protocol}://${req.get("host")}/${linkToken}`;

  return res.status(200).json({
    data: shortUrl,
  });
};

const getShortLink = async (req, res) => {
  const { linkToken } = req.params;

  const linkQuery = {
    text: "SELECT originallink FROM links WHERE shorttoken = $1",
    values: [linkToken],
  };
  const linkData = await client.query(linkQuery);

  if (!linkData.rows[0]?.originallink) {
    throw RequestError(404, "Link wasn`t found");
  }

  res.redirect(linkData.rows[0].originallink);
};

module.exports = { shortenLink, getShortLink };
