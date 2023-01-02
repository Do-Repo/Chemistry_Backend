import express from 'express';
import { requireUser } from '../middleware/requireUser';
import { deserializeUser } from '../middleware/deserializeUser';
import { createPaymentIntent } from '../controllers/payment.controller';

const router = express.Router();
router.use(deserializeUser, requireUser)

router.post('/create', createPaymentIntent);

export default router;