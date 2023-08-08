/**
 * service router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::service.service', {
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
