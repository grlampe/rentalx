import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import "reflect-metadata";
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { CreateUserController } from '@modules/account/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUsersController.handle);

usersRoutes.use(ensureAuthenticated);
usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarController.handle);

export { usersRoutes };