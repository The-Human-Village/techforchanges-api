/**
 * onboarding-step controller
 */

import { factories } from '@strapi/strapi'
import { ExampleService } from "../../../common/example-service";

export default factories.createCoreController('api::onboarding-step.onboarding-step', ({ strapi }) =>  ({
  async find(ctx) {
    const sanitizedQuery = await this.sanitizeQuery(ctx);

    return strapi.service<ExampleService>('api::onboarding-step.onboarding-step').find(sanitizedQuery);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service<ExampleService>('api::onboarding-step.onboarding-step').findOne(id, query);

    return this.transformResponse(entity);
  }
}));
