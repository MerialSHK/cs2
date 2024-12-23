import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = Router();
const authController = new AuthController();

router.post('/callback', authController.handleCallback);
router.get('/user', auth, authController.getUser);
router.post('/logout', authController.logout);

export const authRoutes = router;