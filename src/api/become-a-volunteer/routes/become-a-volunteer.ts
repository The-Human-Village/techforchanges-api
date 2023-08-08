/**
 * become-a-volunteer router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::become-a-volunteer.become-a-volunteer', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
