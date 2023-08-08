/**
 * member controller
 */

import { factories } from '@strapi/strapi'
import { isObject } from 'lodash/fp';
import utils from '@strapi/utils';
import { ExampleService } from "../../../common/example-service";
const { ValidationError } = utils.errors;

const { parseBody } = require('@strapi/strapi/lib/core-api/controller/transform');

export default factories.createCoreController('api::member.member', ({ strapi }) =>  ({
  async create(ctx) {
    const { query } = ctx.request;

    const { data, files } = parseBody(ctx);

    if (!isObject(data)) {
      throw new ValidationError('Missing "data" payload in the request body');
    }

    const sanitizedInputData = await this.sanitizeInput(data, ctx);

    const errors: string[] = [];

    if ((data as any).languages) {
      sanitizedInputData.languages = (data as any).languages;
    } else {
      errors.push('languages must be defined.');
    }

    if ((data as any).dimensions) {
      sanitizedInputData.dimensions = (data as any).dimensions;
    } else {
      errors.push('dimensions must be defined.');
    }

    if ((data as any).city) {
      sanitizedInputData.city = (data as any).city;
    } else {
      errors.push('city must be defined.');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors.length > 1 ? `${errors.length} errors occurred` : errors[0], errors);
    }

    const entity = await strapi
      .service<ExampleService>('api::member.member')
      .create({
        ...query,
        data: {
          ...sanitizedInputData,
          verified: false,
        },
        files
      });

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse({
      ...entity,
      ...sanitizedEntity
    });
  },

  async find(ctx) {
    const sanitizedQuery = await this.sanitizeQuery(ctx);

    return strapi.service<ExampleService>('api::member.member').find(sanitizedQuery);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service<ExampleService>('api::member.member').findOne(id, query);

    return this.transformResponse(entity);
  }
}));
