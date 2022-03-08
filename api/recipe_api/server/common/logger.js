/* eslint-disable class-methods-use-this */
import pino from 'pino';

export const log = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  nestedKey: 'payload',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
});

class Logger {
  debug(message, obj, func) {
    const body = {
      type: 'debug',
      message,
      obj,
      function: func,
      application: 'recipe',
    };
    log.debug(body.message, body.obj);
  }

  info(message, obj, func) {
    const body = {
      type: 'info',
      obj,
      message,
      function: func,
      application: 'recipe',
    };
    log.info(body.message, body.obj);
  }

  error(message, obj, func, stack) {
    const body = {
      type: 'error',
      message,
      obj,
      stack,
      function: func,
      application: 'recipe',
    };
    log.error(body.message, body.obj, body.stack);
  }

  warning(message, func) {
    const body = {
      type: 'warning',
      message,
      function: func,
      application: 'recipe',
    };
    log.warn(body.message);
  }
}

export default new Logger();
