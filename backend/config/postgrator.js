const Postgrator = require('postgrator');
const config = require('config').get('dbConfig');
const mysql2 = require('mysql2/promise');
const Debug = require('debug')('magnetico:migrations');

const DB_DATABASE = config.database;
const DB_USER = config.username;
const DB_PASS = config.password;
const DB_HOST = config.host;
const DB_PORT = 3306;

const postgrator = new Postgrator({
  migrationDirectory: './migrations',
  driver: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASS,
});

const migrate = async () => {
  try {
    await truncateDatabase();
    const migrated = await postgrator.migrate();

    migrated.forEach((m) => Debug(`Migrated ${m.filename}`));
  } catch (err) {
    throw err;
  }
}

const truncateDatabase = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT,
    });

    await connection.query(`DROP DATABASE IF EXISTS ${DB_DATABASE}`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}`);
    await connection.end();
  } catch (err) {
    throw err;
  }
}

module.exports = {
  migrate,
  truncateDatabase,
}
