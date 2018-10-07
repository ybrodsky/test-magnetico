## Requerimientos
- node >= 9
- mysql >= 5.7

## Instalacion y configuracion

### Backend
- `yarn` o `npm install`
- Configurar la configuracion de la base de datos en `backend/config/local.js` (ver archivo de ejemplo `local.js.example`)
- (Opcional) Configurar las demas variables de entorno en `backend/config/(development.js | test.js)`.
- Correr el script de migracion de la base de datos: `yarn migrate` o `npm run migrate`
- Iniciar: `yarn start:dev` | `npm run start:dev`. Puerto por defecto 3100 (ver `config/development.js`)

### Frontend
- `yarn` o `npm install`
- Configurar si se desea las variables en `.env.development`
- `yarn start` | `npm run start`. Puerto por defecto 3099

---------------------------------------------------------------

## Tests

### Backend
- `yarn` o `npm install`
- Configurar la configuracion de la base de datos en `backend/config/local.js` (ver archivo de ejemplo `local.js.example`)
- (Opcional) Configurar las demas variables de entorno en `backend/config/(development.js | test.js)`.
- `yarn test` o `npm run test`
- Reporte de covertura `yarn test:coverage` o `npm run test:coverage`. Output en `backend/coverage/index.html`

