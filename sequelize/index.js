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

sequelize.sync({ force: true });

module.exports = sequelize;