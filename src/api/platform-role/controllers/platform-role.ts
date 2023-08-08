/**
 * platform-role controller
 */

import { factories } from '@strapi/strapi'
import { ExampleService } from "../../../common/example-service";

export default factories.createCoreController('api::platform-role.platform-role', ({ strapi }) =>  ({
  async find(ctx) {
    const sanitizedQuery = await this.sanitizeQuery(ctx);

    return strapi.service<ExampleService>('api::platform-role.platform-role').find(sanitizedQuery);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service<ExampleService>('api::platform-role.platform-role').findOne(id, query);

    return this.transformResponse(entity);
  }
}));
