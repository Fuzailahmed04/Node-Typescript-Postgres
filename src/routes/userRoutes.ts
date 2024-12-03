import { Router } from 'express';
import { getAllUsers } from '../controllers/userController';
import { addUser } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateMiddleware';
import { userValidationSchemas } from '../validation/user.validation';

const router = Router();

router.get('/users', getAllUsers);
router.post('/user', validateRequest(userValidationSchemas.createUser), addUser );
export default router;
