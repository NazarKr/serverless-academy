const RequestError = require("../helpers/requestError");

const validateUrlAddress = (req, res, next) => {
  const { link } = req.body;
  if (!link) {
    throw RequestError(409, "link is required");
  }
  if (!link.match(/^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/)) {
    throw RequestError(409, "wrong type of url adress");
  }
  next();
};
module.exports = validateUrlAddress;
