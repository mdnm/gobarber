import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordsRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsRouter.post('/forgot', forgotPasswordController.create);
passwordsRouter.post('/reset', resetPasswordController.create);

export default passwordsRouter;
