import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as config from 'config';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: config.get('allowedOrigins').split(','),
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
  }),
);
app.options(
  cors({
    origin: config.get('allowedOrigins'),
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
  }),
);

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// inicializa los modelos
require('./models');
import passportInitializer from './passport';
passportInitializer();

import routes from './routes';
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err.status = 404;

  return next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 400);

  if (err.type === 'VALIDATION_ERROR') {
    return res.send({
      error: 'VALIDATION_ERROR',
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof Error) {
    return res.send({
      error: err.message,
      stack: err.stack,
    });
  }

  return res.send(err);
});

export default app;
