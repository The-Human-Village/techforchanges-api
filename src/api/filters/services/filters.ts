/**
 * filters service
 */
import {
  ApplyFiltersResponseDTO,
  ApplyFiltersRequestDTO,
  GetFiltersRequestDTO,
} from "../dto";

const extractDimensionsAndCities = (
  entities,
  addCity: boolean = false
): {
  categories: {
    uid: string;
    title: string;
  }[];
  city: {
    uid: string;
    title: string;
  }[];
  [x: string]: {
    uid: string;
    title: string;
  }[];
} => {
  const categories = [];
  const city = [];
  const ret = {};

  for (const entity of entities) {
    if (addCity) {
      if (typeof entity.city === "string") {
        city.push({
          uid: entity.city,
          title: entity.city,
        });
      } else if (entity.city !== null) {
        city.push({
          uid: entity.city.uid,
          title: entity.city.title,
        });
      }
    }

    for (const dimension of entity.dimensions) {
      if (dimension.dimension_parent === null) {
        categories.push({
          uid: dimension.uid,
          locale_uid: dimension.locale_uid,
          title: dimension.title,
        });
      } else {
        if (!ret[dimension.dimension_parent.uid]) {
          ret[dimension.dimension_parent.title] = [];
        }

        ret[dimension.dimension_parent.title].push({
          uid: dimension.uid,
          locale_uid: dimension.locale_uid,
          title: dimension.title,
        });
        categories.push({
          uid: dimension.dimension_parent.uid,
          locale_uid: dimension.dimension_parent.locale_uid,
          title: dimension.dimension_parent.title,
        });
      }
    }
  }

  return {
    ...ret,
    categories,
    city: addCity ? city : undefined,
  };
};

export default () => ({
  async applyFilters(
    body: ApplyFiltersRequestDTO,
    populate: string | string[]
  ): Promise<ApplyFiltersResponseDTO> {
    return {
      news: body.returnNews
        ? await strapi.entityService.findMany("api::news.news", {
            filters: {
              dimensions: {
                locale_uid: {
                  $in: body.dimensionUIDs,
                },
              },
            },
            locale: body.locale,
            populate,
          })
        : [],
      members: body.returnMembers
        ? await strapi.entityService.findMany(
            // add
            "api::member.member",
            {
              filters:
                body.dimensionUIDs &&
                body.dimensionUIDs.length > 0 &&
                body.cities &&
                body.cities.length > 0
                  ? {
                      dimensions: {
                        locale_uid: {
                          $in: body.dimensionUIDs,
                        },
                      },
                      city: {
                        uid: {
                          $in: body.cities,
                        },
                      },
                    }
                  : body.dimensionUIDs && body.dimensionUIDs.length > 0
                  ? {
                      dimensions: {
                        locale_uid: {
                          $in: body.dimensionUIDs,
                        },
                      },
                    }
                  : {
                      city: {
                        uid: {
                          $in: body.cities,
                        },
                      },
                    },
              populate,
              locale: body.locale,
            }
          )
        : [],
      missions: body.returnMissions
        ? await strapi.entityService.findMany("api::mission.mission", {
            filters: {
              dimensions: {
                locale_uid: {
                  $in: body.dimensionUIDs,
                },
              },
            },
            populate,
            locale: body.locale,
          })
        : [],
      services: body.returnServices
        ? await strapi.entityService.findMany("api::service.service", {
            filters:
              body.dimensionUIDs &&
              body.dimensionUIDs.length > 0 &&
              body.cities &&
              body.cities.length > 0
                ? {
                    dimensions: {
                      locale_uid: {
                        $in: body.dimensionUIDs,
                      },
                    },
                    city: {
                      $in: body.cities,
                    },
                  }
                : body.dimensionUIDs && body.dimensionUIDs.length > 0
                ? {
                    dimensions: {
                      locale_uid: {
                        $in: body.dimensionUIDs,
                      },
                    },
                  }
                : {
                    city: {
                      $in: body.cities,
                    },
                  },
            populate,
            locale: body.locale,
          })
        : [],
      serviceProviders: body.returnServiceProviders
        ? await strapi.entityService.findMany(
            "api::service-provider.service-provider",
            {
              filters:
                body.dimensionUIDs &&
                body.dimensionUIDs.length > 0 &&
                body.cities &&
                body.cities.length > 0
                  ? {
                      dimensions: {
                        locale_uid: {
                          $in: body.dimensionUIDs,
                        },
                      },
                      cities: {
                        uid: {
                          $in: body.cities,
                        },
                      },
                    }
                  : body.dimensionUIDs && body.dimensionUIDs.length > 0
                  ? {
                      dimensions: {
                        locale_uid: {
                          $in: body.dimensionUIDs,
                        },
                      },
                    }
                  : {
                      cities: {
                        uid: {
                          $in: body.cities,
                        },
                      },
                    },
              populate,
              locale: body.locale,
            }
          )
        : [],
    };
  },
  async getFilters(body: GetFiltersRequestDTO): Promise<any> {
    const promises = [
      strapi.entityService.findMany("api::news.news", {
        filters: {
          locale_uid: {
            $in: body.newsUIDs,
          },
        },
        locale: body.locale,
        populate: ["dimensions", "dimensions.dimension_parent"],
      }),
      strapi.entityService.findMany("api::member.member", {
        filters: {
          uid: {
            $in: body.memberUIDs,
          },
        },
        locale: body.locale,
        populate: ["dimensions", "dimensions.dimension_parent", "city"],
      }),
      strapi.entityService.findMany("api::mission.mission", {
        filters: {
          locale_uid: {
            $in: body.missionUIDs,
          },
        },
        locale: body.locale,
        populate: ["dimensions", "dimensions.dimension_parent"],
      }),
      strapi.entityService.findMany("api::service.service", {
        filters: {
          locale_uid: {
            $in: body.serviceUIDs,
          },
        },
        locale: body.locale,
        populate: ["dimensions", "dimensions.dimension_parent"],
      }),
      strapi.entityService.findMany("api::service-provider.service-provider", {
        filters: {
          locale_uid: {
            $in: body.serviceProviderUIDs,
          },
        },
        locale: body.locale,
        populate: ["dimensions", "dimensions.dimension_parent", "city"],
      }),
    ];

    const [news, members, missions, services, serviceProviders] =
      await Promise.all(promises);

    const { categories: newsCategories, ...newsRest } =
      extractDimensionsAndCities(news);

    const {
      categories: membersCategories,
      city: memberCity,
      ...memberRest
    } = extractDimensionsAndCities(members, true);

    const { categories: missionsCategories, ...missionRest } =
      extractDimensionsAndCities(missions);

    const {
      categories: servicesCategories,
      city: serviceCity,
      ...serviceRest
    } = extractDimensionsAndCities(services, true);

    const {
      categories: serviceProvidersCategories,
      city: serviceProviderCity,
      ...serviceProviderRest
    } = extractDimensionsAndCities(serviceProviders, true);

    const categories = [
      ...newsCategories,
      ...membersCategories,
      ...missionsCategories,
      ...servicesCategories,
      ...serviceProvidersCategories,
    ];

    const city = [...memberCity, ...serviceCity, ...serviceProviderCity];

    const rest: {
      [x: string]: { uid: string; title: string }[];
    } = {
      ...newsRest,
      ...memberRest,
      ...missionRest,
      ...serviceRest,
      ...serviceProviderRest,
    };

    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        rest[key] = Array.from(
          new Map(value.map((obj) => [obj.uid, obj])).values()
        );
      }
    }

    return {
      ...rest,
      categories: Array.from(
        new Map(categories.map((obj) => [obj.uid, obj])).values()
      ),
      city: Array.from(new Map(city.map((obj) => [obj.uid, obj])).values()),
    };
  },
});
