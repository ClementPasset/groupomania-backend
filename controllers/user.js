const { User } = require('../sequelize').models;
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
require('dotenv').config();

exports.signup = (req, res, next) => {
    let passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits();

    let { password, mail, firstName, lastName } = req.body;

    failedRules = passwordSchema.validate(password, { list: true });

    if (failedRules.length === 0) {
        let key = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_KEY);
        let iv = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_IV);

        bcrypt.hash(password, 10)
            .then(hash => {
                password = hash;
                mail = crypto.AES.encrypt(mail, key, { iv }).toString();
                User.create({ firstName, lastName, mail, password })
                    .then((user) => {
                        user = user.dataValues;
                        res.status(201).json({
                            userId: user.id,
                            token: 'Bearer ' + jwt.sign(
                                { userId: user.id },
                                process.env.JWT_KEY,
                                { expiresIn: '24h' }
                            )
                        })
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(400).json({ failedRules })
    }
}

exports.signin = (req, res, next) => {
    let { mail, password } = req.body;
    let key = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_KEY);
    let iv = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_IV);
    mail = crypto.AES.encrypt(mail, key, { iv }).toString();

    User.findOne({
        where: { mail: mail }
    })
        .then(user => {
            user = user.dataValues;
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Erreur d'authentification." });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: 'Bearer ' + jwt.sign(
                            { userId: user.id },
                            process.env.JWT_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(401).json({ error }));
        })
        .catch(error => res.status(401).json({ error }))
}