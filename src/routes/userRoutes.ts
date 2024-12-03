import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { addUser } from '../controllers/userController';

const router = Router();

router.get('/users', getAllUsers);
router.post('/user', addUser);

export default router;
