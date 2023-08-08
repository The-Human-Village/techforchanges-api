/**
 * dimension controller
 */

import { factories } from '@strapi/strapi'
import { ExampleService } from "../../../common/example-service";

export default factories.createCoreController('api::dimension.dimension', ({ strapi }) =>  ({
  async find(ctx) {
    const { query } = ctx.request;

    const sanitizedQuery = await this.sanitizeQuery(ctx);

    if (query.filters && query.filters['dimension_parent']) {
      if (!sanitizedQuery.filters['dimension_parent']) {
        sanitizedQuery.filters['dimension_parent'] = {};
      }
      for (const key of Object.keys(query.filters['dimension_parent'])) {
        const value = query.filters['dimension_parent'][key];

        if (!sanitizedQuery.filters['dimension_parent'][key]) {
          sanitizedQuery.filters['dimension_parent'][key] = {};
        }

        if (value instanceof Object) {
          for (const valKey of Object.keys(value)) {
            if (valKey === '$null' || valKey === '$notNull') {
              sanitizedQuery.filters['dimension_parent'][key][valKey] = value[valKey] === 'true';
            } else {
              sanitizedQuery.filters['dimension_parent'][key][valKey] = value[valKey];
            }
          }
        } else {
          sanitizedQuery.filters['dimension_parent'][key] = value;
        }
      }
    }

    const { results, pagination } = await strapi.service<ExampleService>('api::dimension.dimension').find(sanitizedQuery) as { results: any, pagination: any };

    return this.transformResponse(results, { pagination });
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service<ExampleService>('api::dimension.dimension').findOne(id, query);

    return this.transformResponse(entity);
  }
}));
