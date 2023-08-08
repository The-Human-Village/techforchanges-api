/**
 * objects service
 */
import { GetObjectsRequestDTO, GetObjectsResponseDTO } from "../dto";

export default () => ({
  async getObjects(
    body: GetObjectsRequestDTO,
    populate: string | string[]
  ): Promise<GetObjectsResponseDTO> {
    return {
      news: await strapi.entityService.findMany("api::news.news", {
        filters: {
          locale_uid: {
            $in: body.UIDs,
          },
        },
        locale: body.locale,
        populate,
      }),
      members: await strapi.entityService.findMany("api::member.member", {
        filters: {
          uid: {
            $in: body.UIDs,
          },
        },
        locale: body.locale,
        populate,
      }),
      missions: await strapi.entityService.findMany("api::mission.mission", {
        filters: {
          locale_uid: {
            $in: body.UIDs,
          },
        },
        locale: body.locale,
        populate,
      }),
      services: await strapi.entityService.findMany("api::service.service", {
        filters: {
          locale_uid: {
            $in: body.UIDs,
          },
        },
        locale: body.locale,
        populate,
      }),
      dimensions: await strapi.entityService.findMany(
        "api::dimension.dimension",
        {
          filters: {
            locale_uid: {
              $in: body.UIDs,
            },
          },
          locale: body.locale,
          populate,
        }
      ),
      serviceProviders: await strapi.entityService.findMany(
        "api::service-provider.service-provider",
        {
          filters: {
            locale_uid: {
              $in: body.UIDs,
            },
          },
          locale: body.locale,
          populate,
        }
      ),
    };
  },
});
