const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup/', userCtrl.signup);
router.post('/signin/', userCtrl.signin);
router.delete('/:userId', auth, userCtrl.delete);
router.get('/:userId', auth, userCtrl.getOne);
router.get('/', auth, admin, userCtrl.getAll);
router.put('/:userId', auth, multer, userCtrl.update);

module.exports = router;