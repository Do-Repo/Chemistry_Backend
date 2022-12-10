import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { getTagsHandler, createTagHandler, deleteTagHandler } from '../controllers/tags.controller';

const router = express.Router();
router.use(deserializeUser, requireUser);

router.get('/', getTagsHandler);
router.post('/create', createTagHandler);
router.delete('/delete/:id', deleteTagHandler);

export default router;