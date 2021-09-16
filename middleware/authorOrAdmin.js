const { User, Post, Comment } = require('../sequelize').models;

module.exports = async (req, res, next) => {

    let matchingId = null;

    try {
        let user = await User.findOne({ where: { id: req.body.userId } })
            .then(user => user);

        if (req.params.commentId) {
            matchingId = await Comment.findOne({ where: { id: req.params.commentId } })
                .then(comment => comment.dataValues.UserId);
        } else if (req.params.postId) {
            matchingId = await Post.findOne({ where: { id: req.params.postId } })
                .then(post => post.dataValues.UserId);
        }

        if (user.isAdmin || user.id === matchingId) {
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (error) {
        res.status(403).json({ error: 'Accès impossible' });
    }

}