const { Post, Comment, User } = require('../sequelize').models;

exports.addComment = (req, res, next) => {
    let comment = {
        content: req.body.content,
        PostId: req.params.postId,
        UserId: req.body.userId,
        reported: false
    }

    Comment.create({ ...comment })
        .then(() => res.status(201).json({ message: "Comment added." }))
        .catch(error => res.status(500).json({ error }));
}

exports.getReported = (req, res, next) => {
    Comment.findAll({ where: { reported: true }, include: [{ model: User, attributes: ['firstName', 'lastName'] }] })
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(500).json({ error }));
}

exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.commentId } })
        .then(data => {
            if (data > 0) {
                res.status(200).json({ message: "Comment deleted." });
            } else {
                res.status(400).json({ message: "Comment not found." });
            }
        })
        .catch(error => res.status(500).json({ error }));
}

exports.report = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.commentId } })
        .then(comment => {
            comment.update({ ...comment, reported: req.body.value })
                .then(() => res.status(200).json({ message: 'Commentaire signalé.' }))
        })
        .catch(error => res.status(500).json({ error }));
}