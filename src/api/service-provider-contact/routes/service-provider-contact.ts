/**
 * service-provider-contact router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::service-provider-contact.service-provider-contact', {
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
