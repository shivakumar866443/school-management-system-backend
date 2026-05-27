import { Router } from 'express';
import { showAdmin, showLogin } from '../controllers/admin.controller.js';

const router = Router();

router.get('/login', showLogin);
router.get('/', showAdmin);

export default router;
