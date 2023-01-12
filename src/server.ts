import express from 'express';
import "express-async-errors";
import { router } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import "./shared/container";
import { AppError } from './errors/AppError';

const port = 3333;
const app = express();

app.use(express.json());

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((err: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({message: err.message});
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error: ${err.message}`
  });
})

app.listen(port, () => console.log(`Server is running on ${port} `));