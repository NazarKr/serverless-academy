const client = require('../db');
const RequestError = require("../helpers/requestError");
const { successTemplate } = require("../utils/successTemplate")

const getCurrentUser = async (req, res) => {
    const userId = req.user;
    const userQuery = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [userId],
    };
    
    const user = await client.query(userQuery);
    if (!user.rows[0]) {
        throw RequestError(409, "Server error, user not found");
    }

    return res
        .status(200)
        .json(successTemplate({ id: userId, email: user.rows[0].email }))
};

module.exports = { getCurrentUser };