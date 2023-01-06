import express from 'express';
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import { createConnection } from "./database/data-source";

const port = 3333;
const app = express();

app.use(express.json());
app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

createConnection('database');

app.listen(port, () => console.log(`Server is running on ${port} `));