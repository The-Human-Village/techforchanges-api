/**
 * service-provider router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::service-provider.service-provider', {
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
