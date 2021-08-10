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

    let { password, email, firstName, lastName } = req.body;

    failedRules = passwordSchema.validate(password, { list: true });

    if (failedRules.length === 0) {
        let key = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_KEY);
        let iv = crypto.enc.Hex.parse(process.env.MAIL_ENCRYPTION_IV);

        bcrypt.hash(password, 10)
            .then(hash => {
                password = hash;
                email = crypto.AES.encrypt(email, key, { iv }).toString();
                User.create({ firstName, lastName, email, password })
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(400).json({ failedRules })
    }

}