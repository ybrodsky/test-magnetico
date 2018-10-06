module.exports = {
  allowedOrigins: 'http://localhost:3000,http://localhost:3099',
  dbConfig: {
    username: 'root',
    password: 'tararira',
    database: 'magnetico',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    operatorsAliases: false,
  },
  server: {
    port: 3100,
    host: 'http://localhost',
  },
  jwtSecret: 'cuca',
}
