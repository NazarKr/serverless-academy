const RequestError = require("../helpers/requestError");

const validateIpAddress = (req, res, next) => {
  const { ip } = req.body;
  if (!ip) {
    throw RequestError(409, "ip is required");
  }
  if (!ip.match(/^([0-9]{1,3}[.]){3}[0-9]{1,3}$/)) {
    throw RequestError(409, "wrong type of ip adress");
  }
  next();
};

module.exports = validateIpAddress;
