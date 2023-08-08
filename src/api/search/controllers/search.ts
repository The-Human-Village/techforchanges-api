import utils from '@strapi/utils';
import { ExampleService } from "../../../common/example-service";
const { ValidationError } = utils.errors;

/**
 * A set of functions called "actions" for `search`
 */

export default {
  search(ctx) {
    let searchString = '';

    if (!ctx.request.query) {
      throw new ValidationError('Request query is required');
    }

    const query = ctx.request.query;

    if (typeof query.searchString !== 'string') {
      throw new ValidationError('"searchString" must be a string');
    } else {
      searchString = ctx.request.query.searchString
    }

    return strapi.service<ExampleService>('api::search.search').search(searchString, query.populate);
  }
};
