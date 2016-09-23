import { Router } from 'express';
import homepage from './homepage';
import auth from './auth';
import community from './community';
import event from './event';
import profile from './profile';
import signup from './signup';

export default (opts) => {
  const router = new Router();

  /*router.get('/', homepage);*/
  router.use('/auth', auth(opts));
/*  router.get('/', community);
  router.get('/', event);
  router.get('/', profile);
  router.get('/', signup);*/

  return router;
};
