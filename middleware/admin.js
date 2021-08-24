const { User } = require('../sequelize').models;

module.exports = (req, res, next) => {
    User.findOne({
        where: {
            id: req.body.userId
        }
    })
        .then(data => {
            if (data) {
                const isAdmin = data.dataValues.isAdmin;
                if (isAdmin) {
                    next()
                } else {
                    res.status(403).json({ message: 'User is not an admin.' })
                }
            } else {
                res.status(401).json({ message: 'User ID not found in database.' })
            }
        })
        .catch(error => res.status(500).json({ error }))

}