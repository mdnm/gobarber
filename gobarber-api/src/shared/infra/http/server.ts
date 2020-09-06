import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/upload';

import '@shared/container';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import HttpStatusCode from '@shared/enums/HttpStatusCode';

import routes from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsDirectory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('server started on port 3333');
});
