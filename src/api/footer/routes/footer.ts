/**
 * footer router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::footer.footer', {
  only: ['find'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
