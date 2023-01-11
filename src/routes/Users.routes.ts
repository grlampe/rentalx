import { Router } from 'express';
import "reflect-metadata";
import { CreateUserController } from '../modules/account/useCases/createUser/CreateUserController';

const usersRoutes = Router();

const createUsersController = new CreateUserController();

usersRoutes.post('/', createUsersController.handle);

export { usersRoutes };