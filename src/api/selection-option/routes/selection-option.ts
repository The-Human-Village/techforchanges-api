/**
 * selection-option router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::selection-option.selection-option', {
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
