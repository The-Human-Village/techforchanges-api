/**
 * landing router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::landing.landing', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
