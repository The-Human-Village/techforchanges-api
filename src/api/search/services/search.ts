/**
 * search service
 */
import {SearchResponseDTO} from "../dto";

export default () => ({
  async search(searchString: string, populate: string | string[]): Promise<SearchResponseDTO> {
    const promises = [
      strapi.entityService.findMany(
        'api::news.news',
        {
          filters: {
            '$or': [
              {
                title: {
                  '$containsi': searchString
                }
              },
              {
                preview_text: {
                  '$containsi': searchString
                }
              },
              {
                main_text: {
                  '$containsi': searchString
                }
              },
            ],
          },
          populate,
        }
      ),
      strapi.entityService.findMany(
        'api::member.member',
        {
          filters: {
            '$or': [
              {
                first_name: {
                  '$containsi': searchString
                }
              },
              {
                last_name: {
                  '$containsi': searchString
                }
              },
              {
                telephone_number: {
                  '$containsi': searchString
                }
              },
              {
                email: {
                  '$containsi': searchString
                }
              },
            ],
          },
          populate,
        }
      ),
      strapi.entityService.findMany(
        'api::mission.mission',
        {
          filters: {
            '$or': [
              {
                title: {
                  '$containsi': searchString
                }
              },
              {
                preview_text: {
                  '$containsi': searchString
                }
              },
              {
                main_text: {
                  '$containsi': searchString
                }
              },
            ],
          },
          populate,
        }
      ),
      strapi.entityService.findMany(
        'api::service.service',
        {
          filters: {
            '$or': [
              {
                title: {
                  '$containsi': searchString
                }
              },
              {
                description: {
                  '$containsi': searchString
                }
              },
              {
                address: {
                  '$containsi': searchString
                }
              },
              {
                post: {
                  '$containsi': searchString
                }
              },
              {
                country: {
                  '$containsi': searchString
                }
              },
              {
                city: {
                  '$containsi': searchString
                }
              },
            ],
          },
          populate,
        }
      ),
      strapi.entityService.findMany(
        'api::service-provider.service-provider',
        {
          filters: {
            '$or': [
              {
                title: {
                  '$containsi': searchString
                }
              },
              {
                description: {
                  '$containsi': searchString
                }
              },
              {
                address: {
                  '$containsi': searchString
                }
              },
              {
                post: {
                  '$containsi': searchString
                }
              },
              {
                telephone_number: {
                  '$containsi': searchString
                }
              },
              {
                email: {
                  '$containsi': searchString
                }
              },
            ],
          },
          populate,
        }
      )
    ];

    const [news, members, missions, services, serviceProviders] = await Promise.all(promises);

    return {
      news,
      members,
      missions,
      services,
      serviceProviders,
    };
  }
});
