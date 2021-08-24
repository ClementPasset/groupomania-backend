const { Post } = require('../sequelize').models;

exports.addPost = (req, res, next) => {
    let post = {
        content: req.body.content,
        imgURL: req.body.imgURL,
        UserId: req.body.userId
    }

    Post.create({ ...post })
        .then(() => res.status(201).json({ message: 'Post créé.' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(500).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(data => res.status(200).json({ ...data.dataValues }))
        .catch(error => res.status(500).json({ error }));
}