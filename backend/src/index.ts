#!/usr/bin/env node

import * as debug from 'debug';
import * as http from 'http';
import * as config from 'config';
import app from './app';

const Debug = debug('magnetico:server');
const { port, host } = config.get('server');
const env = process.env.NODE_ENV || 'development';

app.set('port', port);
app.set('env', env);

const server = http.createServer(app);

server.listen(port);
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  debug(`Listening on ${bind}`);
});

console.log(`Running on ${env} - ${host}, ${port}`);
