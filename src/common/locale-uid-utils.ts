import { Strapi } from "@strapi/strapi";
import { ExampleService } from "./example-service";

export namespace LocaleUidUtils {
  export function beforeCreateGenerateLocaleUid(event) {
    const data = event.params.data;
    const localizations = data.localizations;

    if (!localizations?.length) {
      // this field is first for this locale
      data.locale_uid = data.uid;
    }
    // else: locale_uid will be autopopulated, because it is marked to be shared among locales
  }

  // locale_uid is a identifier that is the same for different localized versions of the same entity
  // when we create a new entity, it is copied from the uid field, and then it is applied to each new localized entitity (using beforeCreate hook)
  // this code backfills this property for all the entities that have been created before we had the beforeCreate hook
  // note: code is not optimal and runs a lot of queries - the assumption is that this is just a few entities and it will only run once (on first startup)
  export async function backfillLocaleUid(strapi: Strapi) {
    // backfill these entities
    const entityTypes = [
      "api::dimension.dimension",
      "api::mission.mission",
      "api::news.news",
      "api::service.service",
      "api::service-provider.service-provider",
    ];

    for (const entityType of entityTypes) {
      console.log("== Backfill locale id uid", entityType, "==");
      await backfillLocaleUidForEntityType(strapi, entityType);
    }
  }

  async function backfillLocaleUidForEntityType(
    strapi: Strapi,
    entityType: string
  ) {
    let entitiesWithoutLocaleId: Entity[] = [];

    do {
      entitiesWithoutLocaleId = await getEntitiesWithoutLocaleUid(
        strapi,
        entityType
      );

      for (const entity of entitiesWithoutLocaleId) {
        const localeUid = getLocaleUid(entity);

        console.log(
          "Backfill locale uid",
          entityType,
          entity.uid,
          entity.id,
          "->",
          localeUid
        );

        try {
          await strapi.entityService.update(entityType, entity.id, {
            data: {
              locale_uid: localeUid,
            },
          });
        } catch (e) {
          console.error("Backill update error", e);
          return;
        }
      }
    } while (entitiesWithoutLocaleId.length > 0);
  }

  interface Entity {
    id: number;
    uid: string;
    locale: string;
    localizations: Entity[];
  }

  async function getEntitiesWithoutLocaleUid(
    strapi: Strapi,
    entityType: string
  ): Promise<Entity[]> {
    const pageSize = 25;
    try {
      const queryResponse = await strapi
        .service<ExampleService>(entityType)
        .find({
          publicationState: "preview",
          filters: { locale_uid: { $null: true } },
          locale: "all",
          populate: ["localizations"],
          pagination: {
            page: 1,
            pageSize,
          },
        });

      return queryResponse?.results ?? [];
    } catch (e) {
      console.error("getEntitiesWithoutLocaleUid: error when querying", e);
    }

    return [];
  }

  function getLocaleUid(entity: Entity) {
    const priorityLocale = "en";

    // put together all localized versions of this entity
    const allLocalizations = [entity, ...entity.localizations];

    // sort localizations by priority and take the most priority one
    allLocalizations.sort((l1, l2) => {
      if (l1.locale === priorityLocale) {
        return -1;
      }

      if (l2.locale === priorityLocale) {
        return 1;
      }

      return l1.locale < l2.locale ? -1 : 1;
    });

    return allLocalizations[0].uid;
  }
}
