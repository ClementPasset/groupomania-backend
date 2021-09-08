const { Post, User, Comment } = require('../sequelize').models;
const fs = require('fs');

exports.addPost = (req, res, next) => {
    console.log('addPost');
    let post = {
        title: req.body.title,
        content: req.body.content,
        imgURL: req.file ? req.file.filename : null,
        UserId: req.body.userId
    }

    Post.create({ ...post })
        .then(() => res.status(201).json({ message: 'The post has been created.' }))
        .catch(error => res.status(400).json({ error }));
}

exports.getAllPosts = async (req, res, next) => {
    console.log('getAllPosts');
    try {
        posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                { model: User, attributes: ['firstName', 'lastName'] },
                { model: Comment, attributes: ['id'] }
            ]
        })
        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error });
    }
}

exports.getOnePost = (req, res, next) => {
    console.log('getOnePost');
    Post.findOne({
        where: { id: req.params.id },
        include: [
            { model: Comment, include: { model: User }, order: [['createdAt', 'ASC']] },
            { model: User }
        ]
    })
        .then(data => res.status(200).json({ ...data.dataValues }))
        .catch(error => res.status(500).json({ error }));
}

exports.deletePost = async (req, res, next) => {
    console.log('deletePost');
    try {
        let post = await Post.findOne({ where: { id: req.params.id } });
        let image = post.dataValues.imgURL;
        fs.unlink(`images/${image}`, () => {
            post.destroy()
                .then(() => res.status(200).json({ message: 'Post supprimé' }))
                .catch(error => res.status(500).json({ error }));
        });

    } catch (error) {
        res.status(500).json({ error })
    }
}

exports.updatePost = (req, res, next) => {
    console.log('updatePost');
    let post = { ...req.body };
    if (req.file) {
        post = {
            ...post,
            imgURL: req.file.filename
        }
    }

    Post.findOne({ where: { id: post.id } })
        .then(data => {
            let postImg = data.dataValues.imgURL;
            fs.unlink(`images/${postImg}`);
        })
        .catch(error => res.status(404).json({ error }));

    Post.update({ ...post }, { where: { id: req.params.id } })
        .then(data => {
            if (data[0] > 0) {
                res.status(200).json({ message: 'The post has been updated.' })
            } else {
                res.status(400).json({ message: 'The post has not been found.' })
            }
        })
        .catch(error => res.status(500).json({ error }));
}
