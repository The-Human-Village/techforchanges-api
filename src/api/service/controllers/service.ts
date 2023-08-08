/**
 * service controller
 */

import { factories } from '@strapi/strapi';
import { ExampleService } from "../../../common/example-service";

export default factories.createCoreController('api::service.service', ({ strapi }) =>  ({
  async find(ctx) {
    const sanitizedQuery = await this.sanitizeQuery(ctx);

    return strapi.service<ExampleService>('api::service.service').find(sanitizedQuery);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service<ExampleService>('api::service.service').findOne(id, query);

    return this.transformResponse(entity);
  }
}));
