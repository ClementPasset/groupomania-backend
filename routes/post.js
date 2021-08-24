const router = require('express').Router();
const auth = require('../middleware/auth');
const authorOrAdmin = require('../middleware/authorOrAdmin');
const author = require('../middleware/author');

const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.addPost);
router.delete('/:id', auth, authorOrAdmin, postCtrl.deletePost);
router.get('/:id', auth, authorOrAdmin, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.put('/:id', author, postCtrl.updatePost);

module.exports = router;