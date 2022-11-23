import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { restrictTo } from '../middleware/restrictTo';
import { getTagsHandler, createTagHandler, deleteTagHandler } from '../controllers/tags.controller';

const router = express.Router();
router.use(deserializeUser, requireUser, restrictTo('admin'));

router.get('/', getTagsHandler);
router.post('/create', createTagHandler);
router.delete('/delete/:id', deleteTagHandler);

export default router;