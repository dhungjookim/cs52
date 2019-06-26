import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';
import signS3 from './services/s3';


const router = Router();


router.post('/signin', requireSignin, UserController.signin);
router.post('/signup', UserController.signup);
router.get('/sign-s3', signS3);


router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
router.route('/posts')
  .get(Posts.getPosts)
  .post(requireAuth, Posts.createPost);

router.route('/posts/:id')
  .put(requireAuth, Posts.updatePost)
  .get(Posts.getPost)
  .delete(requireAuth, Posts.deletePost);


export default router;
