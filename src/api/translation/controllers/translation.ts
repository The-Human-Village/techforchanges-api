/**
 * translation controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::translation.translation', ({ strapi }) =>  ({
  async find(ctx) {
    const list = await super.find(ctx);

    return {
      ...list,
      data: list.data.reduce((acc, value) => {
        acc[value.attributes.label] = {
          id: value.id,
          ...value.attributes,
          label: undefined,
        }

        return acc;
      }, {})
    };
  }
}));
