const router = require('express').Router({ mergeParams: true });
const auth = require('../middleware/auth');
const authorOrAdmin = require('../middleware/authorOrAdmin');

const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.addComment);
router.get('/reported', auth, commentCtrl.getReported);
router.put('/:commentId/report', auth, commentCtrl.report);
router.delete('/:commentId', auth, authorOrAdmin, commentCtrl.deleteComment);

module.exports = router;