/**
 * platform-role router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::platform-role.platform-role', {
  only: ['find', 'findOne'],
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
  },
});
