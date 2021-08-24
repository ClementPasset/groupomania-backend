const { User, Post } = require('../sequelize').models;

module.exports = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { id: req.body.userId } })
            .then(user => user);
        let post = await Post.findOne({ where: { id: req.params.id } })
            .then(post => post);
        if (user.id === post.UserId) {
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }

}