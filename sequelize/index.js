const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.CONNEXION_STRING, { logging: false, charset: 'utf8' });

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a réussi.'))
    .catch(() => console.log('La connexion à la base de données a échoué.'));

require('./models/User')(sequelize);
require('./models/Post')(sequelize);
require('./models/Comment')(sequelize);

const { User, Post, Comment } = sequelize.models

User.hasMany(Post);
Post.belongsTo(User);

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

User.hasMany(Comment);
Comment.belongsTo(User);

if (process.env.NODE_ENV === 'dev') {
    sequelize.sync({ force: true })
        .then(() => {
            User.create({
                firstName: "Clément",
                lastName: "PASSET",
                mail: "SsUF70KFqa5NsUBAZcnldxKFuKtCqHvZUz0mBEudNsw=",
                password: "$2b$10$Kh/SFP4nozx3jCTsAaqvfuRg6Lkh2KbKqEmuLLPHbEEXJs2W3J.pq",
                isAdmin: true
            })
                .then(user => console.log(`L'utilisateur ${user.dataValues.firstName} ${user.dataValues.lastName} a bien été créé.`))
                .catch(err => console.log(err));

            setTimeout(() => {
                Post.create({
                    title: 'Article 1',
                    content: 'Premier article du site',
                    UserId: 1
                })
                    .then(() => console.log(`Le premier post a bien été créé.`))
                    .catch(err => console.log(err));
            }, 500)
            setTimeout(() => {
                Post.create({
                    title: 'Article 2',
                    content: 'Deuxième article du site',
                    UserId: 1
                })
                    .then(() => console.log(`Le deuxième post a bien été créé.`))
                    .catch(err => console.log(err));
            }, 1500)
        })
        .catch(err => console.log(err))
}

module.exports = sequelize;