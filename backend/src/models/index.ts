import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import * as config from 'config';
import * as debug from 'debug';

const basename = path.basename(module.filename);
const Debug = debug('magnetico:sequelize');
const models: any = {};

if (!config.has('dbConfig')) {
  throw new Error('Falta la configuracion de la base "dbConfig"');
}

const dbConfig: any = config.get('dbConfig');

Debug('Inicializando sequelize');

const sequelize: Sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
const ext = process.env.NODE_ENV === 'production' ? '.js' : '.ts';

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === ext);
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.values(models).forEach((model: any) => {
  Debug(`Asociando ${model.name}...`);

  if (model.associate) {
    model.associate(models);
  }
});

// sequelize.sync();
models.sequelize = sequelize;

export default models;
