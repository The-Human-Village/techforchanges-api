/**
 * become-a-partner router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::become-a-partner.become-a-partner', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
