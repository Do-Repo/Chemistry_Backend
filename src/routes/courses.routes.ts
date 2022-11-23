import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { getCourseHandler, addLikeHandler, removeLikeHandler, updateContentHandler, postCourseHandler, removeCourseHandler } from '../controllers/courses.controller';
import { createCourseSchema } from '../schema/courses.schema';
import { validate } from '../middleware/validate';

const router = express.Router();
router.use(deserializeUser, requireUser)

router.post('/create', validate(createCourseSchema) , postCourseHandler);
router.post('/like/:id', addLikeHandler);
router.post('/dislike/:id', removeLikeHandler);
router.post('/update/:id', updateContentHandler);
router.delete('/delete/:id', removeCourseHandler);
router.get('/:id', getCourseHandler);

export default router;