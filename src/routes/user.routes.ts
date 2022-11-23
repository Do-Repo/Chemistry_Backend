import express from 'express';
import {
  getAllUsersHandler,
  getMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
import { updateProfileHandler, verifyUserHandler } from '../controllers/user.controller';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getAllUsersHandler);

router.get('/profile', getMeHandler);
router.post('/profile/update', updateProfileHandler);
router.get('/verify/:id/:token', verifyUserHandler);

export default router;

