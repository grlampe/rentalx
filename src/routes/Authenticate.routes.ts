import { Router } from 'express';
import "reflect-metadata";
import { AuthenticateUserController } from '../modules/account/useCases/authenticateUser/AuthenticateUserController';

const authenticateUserRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUserRoutes.post('/sessions', authenticateUserController.handle);

export { authenticateUserRoutes };