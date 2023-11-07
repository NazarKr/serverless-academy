const jwt = require("jsonwebtoken");
const { errorTemplate } = require("../utils/errorTemplate")

const authMiddleware = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [tokenType, token] = authorization.split(" ");

    try {
        if (tokenType !== 'Bearer') {
            return res.status(401).json(errorTemplate("Token type error"));
        }

        if (!token) {
            return res.status(401).json(errorTemplate("Token is require"));
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json(errorTemplate(err.message));
            }

            req.user = user.id;
            next();
        })
    } catch (error) {
        return res.status(401).json(errorTemplate("Token is invalid"));
    }
};

module.exports = {authMiddleware}