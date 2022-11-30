import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { updateProfileHandler, verifyUserHandler, setProfilePictureHandler, deleteProfilePictureHandler } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { upload } from '../middleware/upload';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

router.get('/profile', getMeHandler);
router.post('/profile/update', updateProfileHandler);
router.get('/verify/:id/:token', verifyUserHandler);
router.post('/upload/avatar', upload.single('userImage'), setProfilePictureHandler);
router.delete('/delete/avatar', deleteProfilePictureHandler);
export default router;

