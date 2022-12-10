import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { updateProfileHandler, verifyUserHandler, setProfilePictureHandler, deleteProfilePictureHandler } from '../controllers/user.controller';
import { upload } from '../middleware/upload';
import { getExtrasHandler, buyCourseHandler } from '../controllers/user.extras.controller';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

router.get('/profile', getMeHandler);
router.post('/profile/update', updateProfileHandler);
router.get('/verify/:id/:token', verifyUserHandler);
router.post('/upload/avatar', upload.single('userImage'), setProfilePictureHandler);
router.delete('/delete/avatar', deleteProfilePictureHandler);
router.get('/extras', getExtrasHandler);
router.post('/extras/buy', buyCourseHandler);
export default router;

