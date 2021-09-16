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
                id: 1,
                firstName: "Clément",
                lastName: "PASSET",
                mail: "SsUF70KFqa5NsUBAZcnldxKFuKtCqHvZUz0mBEudNsw=",
                password: "$2b$10$Kh/SFP4nozx3jCTsAaqvfuRg6Lkh2KbKqEmuLLPHbEEXJs2W3J.pq",
                profilePictureUrl: 'clement.jpg',
                isAdmin: true
            })
                .then(user => console.log(`L'utilisateur ${user.dataValues.firstName} ${user.dataValues.lastName} a bien été créé.`))
                .catch(err => console.log(err));
            User.create({
                id: 2,
                firstName: "John",
                lastName: "DOE",
                mail: "6Rki5nNPulD8WPITmmq/yA==",
                password: "$2b$10$ujOZKEyPiFb.jv8XPbJyb.IZqdQyFfmAwgglfEBShNgmtJCYbfKVu",
                lastLogin: '2021-07-13 05:48:22	'
            })
                .then(user => console.log(`L'utilisateur ${user.dataValues.firstName} ${user.dataValues.lastName} a bien été créé.`))
                .catch(err => console.log(err));

            setTimeout(() => {
                try {
                    Post.create({
                        id: 1,
                        title: 'Article 1',
                        content: 'Pie cotton candy candy canes candy tart candy canes icing. Tootsie roll candy canes tart pastry topping marshmallow sugar plum sweet roll muffin. Cheesecake oat cake donut icing bonbon.',
                        UserId: 2,
                        createdAt: '2021-08-30 09:00:00'
                    })
                    Post.create({
                        id: 2,
                        title: 'Article 2',
                        content: 'Dessert lollipop bonbon tootsie roll ice cream icing muffin muffin lemon drops. Tart sugar plum apple pie cotton candy dragée pudding pastry apple pie. Biscuit dragée chocolate shortbread jujubes bear claw chocolate carrot cake biscuit. Pastry chocolate bar muffin cupcake cake topping. Liquorice donut cotton candy gummi bears cake jelly-o bear claw pastry jujubes. Powder gingerbread marzipan jelly-o sweet roll sweet roll. Jelly soufflé danish muffin macaroon. Dragée gummies halvah cookie croissant marzipan. Cake shortbread gummi bears sugar plum wafer gummi bears gummies ice cream toffee. Sesame snaps chocolate danish apple pie pudding. Powder sugar plum liquorice macaroon tiramisu jelly shortbread. Tiramisu dessert pudding pie gingerbread chocolate bar.\nCake bear claw oat cake sweet tootsie roll wafer cookie sweet roll bear claw. Chupa chups powder powder liquorice cookie cotton candy. Dragée croissant cookie candy canes cupcake tiramisu chupa chups. Dessert cupcake apple pie chupa chups carrot cake macaroon pie tart. Jelly-o tart gingerbread candy canes apple pie chocolate bar cake donut. Gingerbread chocolate bar jelly dessert candy tootsie roll cupcake. Pudding jujubes pastry chupa chups soufflé. Sesame snaps carrot cake topping shortbread lollipop donut jelly oat cake. Gummies jujubes dessert lollipop candy. Bear claw pastry icing sweet roll cheesecake sesame snaps macaroon. Pastry liquorice jelly icing icing carrot cake halvah tootsie roll. Pastry cheesecake cupcake muffin croissant sweet donut chocolate cake. Lemon drops dragée pie cotton candy carrot cake apple pie. Macaroon sweet jelly beans gingerbread biscuit.\nPowder lollipop cake fruitcake danish chocolate cake gingerbread jelly chocolate. Chocolate cake bear claw bonbon shortbread chocolate cake bonbon danish. Pie oat cake apple pie fruitcake cake brownie. Liquorice ice cream pudding cheesecake fruitcake cake soufflé. Carrot cake chocolate cake halvah cupcake gingerbread sweet roll chocolate cake tiramisu. Halvah apple pie cheesecake candy canes icing powder pie sesame snaps macaroon. Carrot cake cotton candy gummies cake sugar plum topping gummi bears. Carrot cake chupa chups marzipan donut jelly. Cheesecake sesame snaps cheesecake dragée wafer sweet. Dragée sweet roll brownie cake brownie marzipan chupa chups pastry. Fruitcake chocolate liquorice jujubes cake biscuit gummi bears ice cream. Sesame snaps jelly-o lemon drops sweet roll cake cheesecake cake.\nGingerbread oat cake dessert jelly beans biscuit. Chocolate jelly-o pudding brownie jujubes gummi bears. Gingerbread jelly beans marshmallow chocolate tiramisu chocolate cake jelly-o. Chocolate bar liquorice apple pie sesame snaps gummies wafer gingerbread. Icing oat cake jelly-o pastry chocolate cake gummies pastry. Brownie lollipop pie jelly-o sesame snaps. Marshmallow sweet gummi bears caramels cupcake liquorice donut. Bear claw donut bear claw fruitcake topping sugar plum. Danish tiramisu halvah wafer carrot cake jujubes. Chocolate cake halvah ice cream donut donut. Lemon drops powder dessert pudding chocolate cake bear claw. Cake chupa chups apple pie toffee jujubes candy canes jujubes. Gummies danish sesame snaps oat cake cheesecake jujubes topping donut.\nCaramels brownie dragée powder pudding wafer gingerbread. Sugar plum lemon drops croissant sweet roll jelly marzipan liquorice soufflé macaroon. Brownie jelly dessert jelly-o chocolate cake cake. Cheesecake jelly-o chocolate cake candy canes icing. Muffin powder apple pie toffee lollipop marshmallow. Gummi bears candy canes halvah marzipan chocolate bar gummi bears wafer. Gingerbread dessert liquorice chocolate bar donut soufflé cake sweet roll. Wafer cheesecake ice cream gummies bear claw. Chocolate cake muffin donut tart cake cake chocolate. Soufflé tootsie roll oat cake cotton candy gingerbread gummies jelly beans cheesecake. Jelly-o caramels cake marzipan dragée. Gingerbread pudding dessert sweet roll jelly apple pie jelly beans candy canes. Chocolate cotton candy chocolate bar macaroon apple pie marzipan.',
                        UserId: 1,
                        createdAt: '2021-09-01 09:00:00',
                        imgURL: 'firstPostPicture.jpg'
                    })
                    Comment.create({
                        id: 1,
                        content: "Pie cotton candy candy canes candy tart candy canes icing. Tootsie roll candy canes tart pastry topping marshmallow sugar plum sweet roll muffin. Cheesecake oat cake donut icing bonbon.",
                        createdAt: '2021-09-02 09:00:00',
                        reported: false,
                        PostId: 2,
                        UserId: 2
                    })
                    Comment.create({
                        id: 2,
                        content: "Tootsie roll sweet candy canes chocolate jujubes icing. Lollipop sugar plum tiramisu tiramisu bonbon jelly beans cookie. Gingerbread tootsie roll gummi bears chupa chups liquorice. Soufflé bonbon cotton candy jelly beans brownie dragée marshmallow.\nCheesecake apple pie brownie lollipop pie. Chocolate bar chocolate bar lemon drops candy jelly-o pudding cupcake pudding pastry. Toffee apple pie pie tiramisu cupcake sugar plum liquorice pastry.\nPie biscuit brownie sugar plum candy biscuit chocolate cake cookie. Danish tiramisu chocolate bar lemon drops carrot cake gummies bear claw. Jelly-o lollipop brownie jelly-o dessert icing cotton candy. Sugar plum jelly gummi bears soufflé shortbread donut.",
                        createdAt: '2021-09-03 09:00:00',
                        reported: false,
                        PostId: 2,
                        UserId: 1
                    })
                    Comment.create({
                        id: 3,
                        content: "Commentaire signalé ... Pie cotton candy candy canes candy tart candy canes icing. Tootsie roll candy canes tart pastry topping marshmallow sugar plum sweet roll muffin. Cheesecake oat cake donut icing bonbon.",
                        createdAt: '2021-09-02 09:00:00',
                        reported: true,
                        PostId: 1,
                        UserId: 2
                    })
                }
                catch (err) {
                    console.log(err)
                }
            }, 1000);

        })
        .catch(err => console.log(err))
}

module.exports = sequelize;