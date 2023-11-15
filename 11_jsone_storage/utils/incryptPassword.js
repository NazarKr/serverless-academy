const bcrypt = require("bcrypt");

const incryptPassword = async (newPassword) => {
  return await bcrypt.hash(newPassword, 8);
};

module.exports = { incryptPassword };
