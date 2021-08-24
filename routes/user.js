const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const userCtrl = require('../controllers/user');

router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);
router.delete('/:id', auth, userCtrl.delete);
router.get('/', auth, admin, userCtrl.getAll);

module.exports = router;