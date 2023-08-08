/**
 * member router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::member.member', {
  except: ['update', 'delete'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    create: {
      auth: false,
      policies: [],
      middlewares: [],
    }
  },
});
