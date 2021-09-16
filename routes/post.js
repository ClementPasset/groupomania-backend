const router = require('express').Router();
const auth = require('../middleware/auth');
const authorOrAdmin = require('../middleware/authorOrAdmin');
const author = require('../middleware/author');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.addPost);
router.delete('/:postId', auth, authorOrAdmin, postCtrl.deletePost);
router.get('/:postId', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/user/:userId', auth, postCtrl.getUserPosts);
router.put('/:postId', auth, multer, author, postCtrl.updatePost);

module.exports = router;