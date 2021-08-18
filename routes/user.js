const router = require('express').Router();

const userCtrl = require('../controllers/user');

router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);

module.exports = router;