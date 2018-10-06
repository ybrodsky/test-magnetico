const passport = require('passport');
import * as express from 'express';
import isAuthenticated from './middlewares/isAuthenticated';

const router = express.Router();

import auth from './routes/auth';
import rents from './routes/rents';
import appartments from './routes/appartments';

router.use([
  '/api/auth/me',
  '/api/rents',
  '/api/appartments',
], passport.authenticate('jwt', { session: false }), isAuthenticated);

router.use('/api/auth', auth);
router.use('/api/rents', rents);
router.use('/api/appartments', appartments);

export default router;
