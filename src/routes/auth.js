import { Router } from 'express'
import { check } from 'express-validator';
import { Login, Register, Renew } from '../controllers/auth.js';
import { checkToken, errorsValidation } from '../middlewares/validation.js';

// ROUTE: /api/auth
const router = Router();

router.get(
    '/renew',
    [
        checkToken
    ],
    Renew
);

router.post(
    '/login',
    [
        check('email', 'El email y la contraseña son obligatorios').isEmail(),
        check('password', 'El email y la contraseña son obligatorios').isLength({ min: 6 }),
        errorsValidation
    ],
    Login
)

router.post(
    '/register',
    [
        check('name', 'Campo obligatorio').not().isEmpty(),
        check('email', 'Campo obligatorio').not().isEmpty(),
        check('password', 'Campo obligatorio').not().isEmpty(),
        errorsValidation
    ],
    Register
)

export default router
