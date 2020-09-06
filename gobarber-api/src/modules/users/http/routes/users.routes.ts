import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAnthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);

usersRouter.patch(
  '/avatar',
  ensureAnthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
