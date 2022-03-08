import Express from 'express';
import * as path from 'path';
import helmet from 'helmet';
import referrerPolicy from 'referrer-policy';
import cors from 'cors';
import logger from './logger';

const OpenApiValidator = require('express-openapi-validator');

const app = new Express();
const spec = path.join(__dirname, 'swagger', 'Api.yaml');

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(Express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      Express.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      }),
    );
    app.use(helmet());
    app.use(cors());
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          'default-src': ["'self'"],
          'script-src': ["'self'", "'unsafe-inline'"],
          'style-src': ["'self'", "'unsafe-inline'"],
          'font-src': ["'self'"],
          'img-src': ["'self'", 'online.swagger.io', 'data:'],
        },
      }),
    );
    app.use(referrerPolicy({ policy: 'same-origin' }));
    app.use(helmet.frameguard({ action: 'sameorigin' }));
    app.disable('x-powered-by');
    app.use('/api/v1/recipe/spec', Express.static(spec));
    app.use(Express.static(`${root}/public`));
    app.use(
      OpenApiValidator.middleware({
        apiSpec: spec,
        validateResponses: false, // <-- to validate responses
      }),
    );

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      // 7. Customize errors
      logger.error(err); // dump error to console for debug
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    });
  }

  router(routes) {
    routes(app);
    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  listen(port = process.env.PORT) {
    app.listen(port, () => {
      logger.info('Start avvenuto correttamente!');
    });
    return app;
  }
}
