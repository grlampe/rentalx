import { Router } from 'express';
import "reflect-metadata";
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post('/', createSpecificationController.handle);

specificationsRoutes.get('/', listSpecificationController.handle);

export { specificationsRoutes };