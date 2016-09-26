import { Router } from 'express';
import auth from './auth';
import misc from './misc';
import communities from './communities';
import events from './events';
import signup from './signup';

export default (opts) => {
  const router = new Router();

  router.use(misc(opts));
  router.use('/auth', auth(opts));
  router.use('/communities', communities(opts));
  router.use('/events', events(opts));
  router.use('/signup', signup());

  return router;
};