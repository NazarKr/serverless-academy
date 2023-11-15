const bcrypt = require("bcrypt");

const isValidPassword = async (password, newPassword) => {
  return await bcrypt.compare(password, newPassword);
};

module.exports = { isValidPassword };
