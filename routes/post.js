const router = require('express').Router();
const auth = require('../middleware/auth');
const authorOrAdmin = require('../middleware/authorOrAdmin');

const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.addPost);
router.get('/:id', auth, authorOrAdmin, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);

module.exports = router;