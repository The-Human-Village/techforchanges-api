import { promises as fs } from "fs";
import { Strapi } from "@strapi/strapi";
import { LocaleUidUtils } from "./common/locale-uid-utils";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  async register({ strapi }) {
    const keys = Object.keys(strapi.dirs.app);

    for (const key of keys) {
      try {
        await fs.stat(strapi.dirs.app[key]);
      } catch (e) {
        strapi.dirs.app[key] = strapi.dirs.dist[key];
      }
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    await LocaleUidUtils.backfillLocaleUid(strapi);
  },
};
