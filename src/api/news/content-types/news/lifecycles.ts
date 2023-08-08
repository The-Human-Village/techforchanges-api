import { LocaleUidUtils } from "../../../../common/locale-uid-utils";

export default {
  beforeCreate(event) {
    LocaleUidUtils.beforeCreateGenerateLocaleUid(event);
  },
};
