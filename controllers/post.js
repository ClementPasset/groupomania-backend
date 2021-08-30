const { Post } = require('../sequelize').models;

exports.addPost = (req, res, next) => {
    let post = {
        title: req.body.title,
        content: req.body.content,
        imgURL: req.file ? req.file.filename : null,
        UserId: req.body.userId
    }
    console.log(post);

    Post.create({ ...post })
        .then(() => res.status(201).json({ message: 'The post has been created.' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(data => res.status(200).json({ data }))
        .catch(error => res.status(500).json({ error }));
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id } })
        .then(data => res.status(200).json({ ...data.dataValues }))
        .catch(error => res.status(500).json({ error }));
}

exports.deletePost = (req, res, next) => {
    Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Post has been deleted.' }))
        .catch(error => res.status(500).json({ error }));
}

exports.updatePost = (req, res, next) => {
    const { post } = req.body;
    Post.update({
        ...post
    }, { where: { id: req.params.id } })
        .then(data => {
            if (data[0] > 0) {
                res.status(200).json({ message: 'The post has been updated.' })
            } else {
                res.status(400).json({ message: 'The post has not been found.' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
