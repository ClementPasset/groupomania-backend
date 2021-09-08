const jwt = require('jsonwebtoken');
const { User } = require('../sequelize').models;
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        console.log('authMiddleware');
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        let user = await User.findOne({ where: { id: userId } });
        if (user) {
            next()
        } else {
            throw "Erreur d'authentification.";
        }
    } catch (error) {
        res.status(401).json({ error });
    }
}