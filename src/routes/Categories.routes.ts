import { Router } from 'express';
import "reflect-metadata";
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle);

export { categoriesRoutes };