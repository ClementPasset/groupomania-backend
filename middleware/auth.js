const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        if (userId === req.body.userId) {
            next()
        } else {
            throw "Erreur d'authentification.";
        }
    } catch (error) {
        res.status(401).json({ error });
    }
}