const router = require("express").Router();
const UserController = require('../controllers/UserController.js');
const { googleAuth, isLogin } = require('../middlewares/auth');
const { googleSignUp } = require('../controllers/UserController.js');
const media = require('../helpers/media');

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.post('/gsignin',googleAuth, googleSignUp);
router.get('/verify', UserController.verify);

router.post('/upload', isLogin, media.multer.single('picturefile'), media.sendUploadToGCS, media.callback );

router.use('/users',isLogin, require('./UserRoutes.js'));
router.use('/articles',require('./ArticleRoutes.js'));
router.use('/comments',require('./CommentRoutes.js'));
router.use('/subscribes',require('./SubscibeRoutes.js'));

module.exports = router;
