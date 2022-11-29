import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { uploadImage } from '../services/upload.service';
import { upload } from '../middleware/multer';



const router = express.Router()
router.use(deserializeUser, requireUser)

router.post('/image', upload.single('upload') ,  uploadImage);

export default router;