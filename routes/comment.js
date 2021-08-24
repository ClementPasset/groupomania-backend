const router = require('express').Router({ mergeParams: true });
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.addComment);
router.get('/', auth, commentCtrl.getComments);
router.delete('/:id', auth, admin, commentCtrl.deleteComment);

module.exports = router;