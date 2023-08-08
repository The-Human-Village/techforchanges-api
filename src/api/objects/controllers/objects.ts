import utils from '@strapi/utils';
import { GetObjectsRequestDTO } from "../dto";
import { ExampleService } from "../../../common/example-service";
const { ValidationError } = utils.errors;

/**
 * A set of functions called "actions" for `objects`
 */

const parseGetObjectsBody = (ctx): GetObjectsRequestDTO => {
  if (!ctx.request.body) {
    throw new ValidationError('Request body is required');
  }

  const body = ctx.request.body;
  const locale = ctx.request.query?.locale ?? "en";

  const errors: {
    property: string,
    error: string,
  }[] = [];

  if (!body.UIDs || body.UIDs.length <= 0) {
    errors.push({
      property: 'UIDs',
      error: 'is required',
    });
  } else if (body.UIDs.some((uid) => typeof uid !== 'string')) {
    errors.push({
      property: 'UIDs',
      error: 'must be strings',
    });
  }
  if (errors.length > 0) {
    throw new ValidationError(`${errors.map(err => err.property).join(', ')} have errors`, errors);
  }

  return {
    UIDs: body.UIDs,
    locale
  };
}

export default {
  getObjects(ctx) {
    if (!ctx.request.query) {
      throw new ValidationError('Request query is required');
    }

    const query = ctx.request.query;

    return strapi.service<ExampleService>('api::objects.objects').getObjects(parseGetObjectsBody(ctx), query.populate);
  },
};
