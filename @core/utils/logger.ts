import pino from 'pino';

export const getLogger = (bindings: pino.Bindings = {}) => {
  const instance = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    browser: { asObject: true },
    transport: {
      target: 'pino-pretty',
      colorize: true,
    },
  });
  return instance.child(bindings);
};
