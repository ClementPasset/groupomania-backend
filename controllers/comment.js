const { Post, Comment } = require('../sequelize').models;

exports.addComment = (req, res, next) => {
    let comment = {
        content: req.body.content,
        PostId: req.params.postId,
        UserId: req.body.userId
    }

    Comment.create({ ...comment })
        .then(() => res.status(201).json({ message: "Comment added." }))
        .catch(error => res.status(500).json({ error }));
}

exports.getComments = (req, res, next) => {
    Comment.findAll({ where: { PostId: req.params.postId } })
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(500).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(data => {
            if (data > 0) {
                res.status(200).json({ message: "Comment deleted." });
            } else {
                res.status(400).json({ message: "Comment not found." });
            }
        })
        .catch(error => res.status(500).json({ error }));
}
