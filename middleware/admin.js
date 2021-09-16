const { User } = require('../sequelize').models;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        let user = await User.findOne({ where: { id: userId } });
        if (user.dataValues.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'User is not an admin' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}