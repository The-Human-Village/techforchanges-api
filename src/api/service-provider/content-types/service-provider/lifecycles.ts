import { LocaleUidUtils } from "../../../../common/locale-uid-utils";

export default {
  async beforeCreate(event) {
    LocaleUidUtils.beforeCreateGenerateLocaleUid(event);
  },
};
