import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  MediaAttribute,
  SingleTypeSchema,
  SetPluginOptions,
  TextAttribute,
  UIDAttribute,
  ComponentAttribute,
  RichTextAttribute,
  TimeAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    flag: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiBecomeAPartnerBecomeAPartner extends SingleTypeSchema {
  info: {
    singularName: 'become-a-partner';
    pluralName: 'become-a-partners';
    displayName: 'Become a partner';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      SetMinMaxLength<{
        maxLength: 180;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::become-a-partner.become-a-partner',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::become-a-partner.become-a-partner',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::become-a-partner.become-a-partner',
      'oneToMany',
      'api::become-a-partner.become-a-partner'
    >;
    locale: StringAttribute;
  };
}

export interface ApiBecomeAVolunteerBecomeAVolunteer extends SingleTypeSchema {
  info: {
    singularName: 'become-a-volunteer';
    pluralName: 'become-a-volunteers';
    displayName: 'Become a volunteer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      SetMinMaxLength<{
        maxLength: 180;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::become-a-volunteer.become-a-volunteer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::become-a-volunteer.become-a-volunteer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::become-a-volunteer.become-a-volunteer',
      'oneToMany',
      'api::become-a-volunteer.become-a-volunteer'
    >;
    locale: StringAttribute;
  };
}

export interface ApiCityCity extends CollectionTypeSchema {
  info: {
    singularName: 'city';
    pluralName: 'cities';
    displayName: 'City';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    uid: UIDAttribute<'api::city.city', 'title'>;
    country: RelationAttribute<
      'api::city.city',
      'oneToOne',
      'api::country.country'
    >;
    geo_height: DecimalAttribute & RequiredAttribute;
    geo_width: DecimalAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::city.city', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::city.city', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiConfigurationConfiguration extends CollectionTypeSchema {
  info: {
    singularName: 'configuration';
    pluralName: 'configurations';
    displayName: 'Configuration';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    key: UIDAttribute;
    value: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::configuration.configuration',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::configuration.configuration',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCountryCountry extends CollectionTypeSchema {
  info: {
    singularName: 'country';
    pluralName: 'countries';
    displayName: 'Country';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    uid: UIDAttribute<'api::country.country', 'title'>;
    flag: MediaAttribute;
    mobile_prefix: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::country.country',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDimensionDimension extends CollectionTypeSchema {
  info: {
    singularName: 'dimension';
    pluralName: 'dimensions';
    displayName: 'Dimension';
    description: '';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    uid: UIDAttribute<'api::dimension.dimension', 'title'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    is_active: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<false>;
    icon: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    dimension_parent: RelationAttribute<
      'api::dimension.dimension',
      'oneToOne',
      'api::dimension.dimension'
    >;
    alt_icon: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      SetMinMaxLength<{
        maxLength: 200;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::dimension.dimension',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::dimension.dimension',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::dimension.dimension',
      'oneToMany',
      'api::dimension.dimension'
    >;
    locale: StringAttribute;
  };
}

export interface ApiFooterFooter extends SingleTypeSchema {
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    about_us_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    story_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    story_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    location_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    location_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    partners_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    partners_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    data_and_transparency_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    data_and_transparency_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    thrive_app_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    go_to_thrive_app_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    go_to_thrive_app_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    our_content_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    phone_number_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    youtube_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    linked_in_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    copy_rights_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacy_policy_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacy_policy_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    terms_of_use_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    terms_of_use_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookie_policy_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookie_policy_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    human_village_desc_label: TextAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    join_us_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    how_to_help_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    how_to_help_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    become_partner_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    become_partner_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    become_volunteer_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    become_volunteer_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    about_label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    about_url: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::footer.footer',
      'oneToMany',
      'api::footer.footer'
    >;
    locale: StringAttribute;
  };
}

export interface ApiLandingLanding extends SingleTypeSchema {
  info: {
    singularName: 'landing';
    pluralName: 'landings';
    displayName: 'Landing';
    description: 'Data for landing page';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    app: ComponentAttribute<'landing.thrive-app'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    location: ComponentAttribute<'landing.location'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    team: ComponentAttribute<'landing.team'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    story: ComponentAttribute<'landing.story'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    subtitle: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    gallery: ComponentAttribute<'landing.gallery'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    vision: ComponentAttribute<'landing.vision'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    partner: ComponentAttribute<'landing.partner-section'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    data_and_transparency: ComponentAttribute<'landing.data-and-transparency'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    mission: ComponentAttribute<'landing.mission'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    who_can_help: ComponentAttribute<'landing.app-who-is-it-for'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    partnership: ComponentAttribute<'landing.app-partnership'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    volunteering: ComponentAttribute<'landing.app-partnership'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    want_help_button_title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    need_help_button_title: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    navigation: ComponentAttribute<'landing.navigation', true> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    privacy_pollicy: ComponentAttribute<'landing.pp-cp-tou'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    cookie_policy: ComponentAttribute<'landing.pp-cp-tou'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    terms_of_use: ComponentAttribute<'landing.pp-cp-tou'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::landing.landing',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::landing.landing',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::landing.landing',
      'oneToMany',
      'api::landing.landing'
    >;
    locale: StringAttribute;
  };
}

export interface ApiLanguageLanguage extends CollectionTypeSchema {
  info: {
    singularName: 'language';
    pluralName: 'languages';
    displayName: 'Language';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    uid: UIDAttribute<'api::language.language', 'title'> & RequiredAttribute;
    abbreviation: StringAttribute;
    icon: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::language.language',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMemberMember extends CollectionTypeSchema {
  info: {
    singularName: 'member';
    pluralName: 'members';
    displayName: 'Member';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    first_name: StringAttribute;
    last_name: StringAttribute;
    sign_up_name: StringAttribute;
    city: RelationAttribute<'api::member.member', 'oneToOne', 'api::city.city'>;
    languages: RelationAttribute<
      'api::member.member',
      'oneToMany',
      'api::language.language'
    >;
    verified: BooleanAttribute & DefaultTo<false>;
    image: MediaAttribute;
    dimensions: RelationAttribute<
      'api::member.member',
      'oneToMany',
      'api::dimension.dimension'
    >;
    telephone_number: StringAttribute;
    email: EmailAttribute;
    platform_roles: RelationAttribute<
      'api::member.member',
      'oneToMany',
      'api::platform-role.platform-role'
    >;
    user: RelationAttribute<
      'api::member.member',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    uid: UIDAttribute<'api::member.member', 'first_name'>;
    active: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    contact_information_public: BooleanAttribute &
      RequiredAttribute &
      DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMissionMission extends CollectionTypeSchema {
  info: {
    singularName: 'mission';
    pluralName: 'missions';
    displayName: 'Mission';
    description: '';
  };
  options: {
    draftAndPublish: true;
    timestamps: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::mission.mission', 'title'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    preview_text: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    main_text: RichTextAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    header_image: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    requires_review: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<true>;
    dimensions: RelationAttribute<
      'api::mission.mission',
      'oneToMany',
      'api::dimension.dimension'
    >;
    reviewer: RelationAttribute<
      'api::mission.mission',
      'oneToOne',
      'api::member.member'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::mission.mission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::mission.mission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::mission.mission',
      'oneToMany',
      'api::mission.mission'
    >;
    locale: StringAttribute;
  };
}

export interface ApiNewsNews extends CollectionTypeSchema {
  info: {
    singularName: 'news';
    pluralName: 'multiple-news';
    displayName: 'News';
    description: '';
  };
  options: {
    draftAndPublish: true;
    timestamps: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::news.news', 'title'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    preview_text: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    main_text: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    header_image: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dimensions: RelationAttribute<
      'api::news.news',
      'oneToMany',
      'api::dimension.dimension'
    >;
    author: RelationAttribute<
      'api::news.news',
      'oneToOne',
      'api::member.member'
    >;
    requires_review: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<true>;
    reviewer: RelationAttribute<
      'api::news.news',
      'oneToOne',
      'api::member.member'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::news.news', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::news.news', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::news.news',
      'oneToMany',
      'api::news.news'
    >;
    locale: StringAttribute;
  };
}

export interface ApiOnboardingStepOnboardingStep extends CollectionTypeSchema {
  info: {
    singularName: 'onboarding-step';
    pluralName: 'onboarding-steps';
    displayName: 'Onboarding Step';
    description: '';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::onboarding-step.onboarding-step', 'title'> &
      RequiredAttribute;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    required: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<false>;
    icon: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    parent_step: RelationAttribute<
      'api::onboarding-step.onboarding-step',
      'oneToOne',
      'api::onboarding-step.onboarding-step'
    >;
    selection_options: RelationAttribute<
      'api::onboarding-step.onboarding-step',
      'oneToMany',
      'api::selection-option.selection-option'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::onboarding-step.onboarding-step',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::onboarding-step.onboarding-step',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::onboarding-step.onboarding-step',
      'oneToMany',
      'api::onboarding-step.onboarding-step'
    >;
    locale: StringAttribute;
  };
}

export interface ApiPlatformRolePlatformRole extends CollectionTypeSchema {
  info: {
    singularName: 'platform-role';
    pluralName: 'platform-roles';
    displayName: 'Platform role';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute;
    uid: UIDAttribute<'api::platform-role.platform-role', 'title'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::platform-role.platform-role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::platform-role.platform-role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSelectionOptionSelectionOption
  extends CollectionTypeSchema {
  info: {
    singularName: 'selection-option';
    pluralName: 'selection-options';
    displayName: 'Selection Option';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::selection-option.selection-option', 'title'> &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::selection-option.selection-option',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::selection-option.selection-option',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::selection-option.selection-option',
      'oneToMany',
      'api::selection-option.selection-option'
    >;
    locale: StringAttribute;
  };
}

export interface ApiServiceService extends CollectionTypeSchema {
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::service.service', 'title'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    available: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      DefaultTo<false>;
    header_image: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    open_from: TimeAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    open_to: TimeAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    address: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    post: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    country: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dimensions: RelationAttribute<
      'api::service.service',
      'oneToMany',
      'api::dimension.dimension'
    >;
    city: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    service_provider: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'api::service-provider.service-provider'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::service.service',
      'oneToMany',
      'api::service.service'
    >;
    locale: StringAttribute;
  };
}

export interface ApiServiceProviderServiceProvider
  extends CollectionTypeSchema {
  info: {
    singularName: 'service-provider';
    pluralName: 'service-providers';
    displayName: 'Service Provider';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: UIDAttribute<'api::service-provider.service-provider', 'title'> &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    description: RichTextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    logo: MediaAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    address: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    post: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    languages: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToMany',
      'api::language.language'
    > &
      RequiredAttribute;
    contacts: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToMany',
      'api::service-provider-contact.service-provider-contact'
    >;
    telephone_number: StringAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    email: EmailAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    dimensions: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToMany',
      'api::dimension.dimension'
    > &
      RequiredAttribute;
    verified: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<false>;
    active: BooleanAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      DefaultTo<false>;
    sign_up_message: TextAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    city: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToOne',
      'api::city.city'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::service-provider.service-provider',
      'oneToMany',
      'api::service-provider.service-provider'
    >;
    locale: StringAttribute;
  };
}

export interface ApiServiceProviderContactServiceProviderContact
  extends CollectionTypeSchema {
  info: {
    singularName: 'service-provider-contact';
    pluralName: 'service-provider-contacts';
    displayName: 'Service Provider Contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    first_name: StringAttribute & RequiredAttribute;
    last_name: StringAttribute & RequiredAttribute;
    uid: UIDAttribute<
      'api::service-provider-contact.service-provider-contact',
      'last_name'
    >;
    role: StringAttribute;
    languages: RelationAttribute<
      'api::service-provider-contact.service-provider-contact',
      'oneToMany',
      'api::language.language'
    >;
    image: MediaAttribute;
    telephone_number: StringAttribute;
    email: EmailAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service-provider-contact.service-provider-contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service-provider-contact.service-provider-contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTranslationTranslation extends CollectionTypeSchema {
  info: {
    singularName: 'translation';
    pluralName: 'translations';
    displayName: 'Translation';
    description: '';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    text: TextAttribute &
      SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    label: StringAttribute &
      RequiredAttribute &
      SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::translation.translation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::translation.translation',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    localizations: RelationAttribute<
      'api::translation.translation',
      'oneToMany',
      'api::translation.translation'
    >;
    locale: StringAttribute;
  };
}

export interface LandingAppHelp extends ComponentSchema {
  info: {
    displayName: 'App help';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    content: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 140;
      }>;
    link: StringAttribute & RequiredAttribute;
    hero_content: TextAttribute &
      SetMinMaxLength<{
        maxLength: 180;
      }>;
    read_more_button_title: StringAttribute;
    go_to_button_title: StringAttribute;
  };
}

export interface LandingAppHowToStep extends ComponentSchema {
  info: {
    displayName: 'App how to step';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 200;
      }>;
    order: IntegerAttribute &
      SetMinMax<{
        min: 1;
      }>;
    picture: MediaAttribute;
  };
}

export interface LandingAppHowTo extends ComponentSchema {
  info: {
    displayName: 'App how to';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'How To Use It'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    steps: ComponentAttribute<'landing.app-how-to-step', true>;
  };
}

export interface LandingAppOffer extends ComponentSchema {
  info: {
    displayName: 'App offer';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'What We Offer'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
  };
}

export interface LandingAppPartnershipCard extends ComponentSchema {
  info: {
    displayName: 'App partnership card';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 200;
      }>;
    image: MediaAttribute;
  };
}

export interface LandingAppPartnership extends ComponentSchema {
  info: {
    displayName: 'App partnership';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    cards: ComponentAttribute<'landing.app-partnership-card', true>;
  };
}

export interface LandingAppTestimonial extends ComponentSchema {
  info: {
    displayName: 'App testimonial';
  };
  attributes: {
    first_name: StringAttribute & RequiredAttribute;
    last_name: StringAttribute;
    video: MediaAttribute;
    from: StringAttribute;
  };
}

export interface LandingAppTestimonials extends ComponentSchema {
  info: {
    displayName: 'App testimonials';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Testimonials'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    items: ComponentAttribute<'landing.app-testimonial', true>;
  };
}

export interface LandingAppWhoIsItFor extends ComponentSchema {
  info: {
    displayName: 'App who is it for';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Who Is It For'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 400;
      }>;
  };
}

export interface LandingDataAndTransparency extends ComponentSchema {
  info: {
    displayName: 'Data and Transparency';
    description: '';
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      DefaultTo<'Data & Transparency'>;
    content: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    files: MediaAttribute;
  };
}

export interface LandingGalleryItem extends ComponentSchema {
  info: {
    displayName: 'Gallery item';
  };
  attributes: {
    media: MediaAttribute & RequiredAttribute;
    description: TextAttribute;
  };
}

export interface LandingGallery extends ComponentSchema {
  info: {
    displayName: 'Gallery';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Gallery'>;
    items: ComponentAttribute<'landing.gallery-item', true>;
  };
}

export interface LandingLocation extends ComponentSchema {
  info: {
    displayName: 'Location';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Location'>;
    number_organisations: StringAttribute & RequiredAttribute;
    number_cities: StringAttribute & RequiredAttribute;
    number_countries: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
  };
}

export interface LandingMission extends ComponentSchema {
  info: {
    displayName: 'Mission';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 400;
      }>;
    image: MediaAttribute;
  };
}

export interface LandingNavigation extends ComponentSchema {
  info: {
    displayName: 'Navigation';
  };
  attributes: {
    title: StringAttribute;
    url: StringAttribute;
  };
}

export interface LandingPartnerSection extends ComponentSchema {
  info: {
    displayName: 'Partner section';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Partners'>;
    content: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    hero_description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 200;
      }>;
    partners: ComponentAttribute<'landing.partners', true>;
  };
}

export interface LandingPartners extends ComponentSchema {
  info: {
    displayName: 'Partner';
    description: '';
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    logo: MediaAttribute;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
  };
}

export interface LandingPpCpTouItem extends ComponentSchema {
  info: {
    displayName: 'PP-CP-TOU item';
  };
  attributes: {
    title: StringAttribute;
    description: TextAttribute;
  };
}

export interface LandingPpCpTou extends ComponentSchema {
  info: {
    displayName: 'PP-CP-TOU';
    description: '';
  };
  attributes: {
    title: StringAttribute;
    description: TextAttribute;
    items: ComponentAttribute<'landing.pp-cp-tou-item', true>;
  };
}

export interface LandingStory extends ComponentSchema {
  info: {
    displayName: 'Story';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Story'>;
    part1: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 400;
      }>;
    part2: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 400;
      }>;
  };
}

export interface LandingTeamMember extends ComponentSchema {
  info: {
    displayName: 'Team member';
    description: '';
  };
  attributes: {
    first_name: StringAttribute & RequiredAttribute;
    last_name: StringAttribute;
    email: EmailAttribute;
    picture: MediaAttribute;
    description: TextAttribute;
    facebook: StringAttribute;
    twitter: StringAttribute;
    linked_in: StringAttribute;
    instagram: StringAttribute;
    position: StringAttribute;
    quote: TextAttribute;
  };
}

export interface LandingTeam extends ComponentSchema {
  info: {
    displayName: 'Team';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Team'>;
    description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 280;
      }>;
    number_employees: StringAttribute & RequiredAttribute;
    number_volunteers: StringAttribute & RequiredAttribute;
    members: ComponentAttribute<'landing.team-member', true> &
      RequiredAttribute;
  };
}

export interface LandingThriveApp extends ComponentSchema {
  info: {
    displayName: 'Thrive app';
    description: '';
  };
  attributes: {
    link: StringAttribute & RequiredAttribute;
    description: TextAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 340;
      }>;
    hero_description: TextAttribute &
      SetMinMaxLength<{
        maxLength: 180;
      }>;
    title: StringAttribute & RequiredAttribute & DefaultTo<'Thrive app'>;
    need_help: ComponentAttribute<'landing.app-help'>;
    want_help: ComponentAttribute<'landing.app-help'>;
    want_volunteer: ComponentAttribute<'landing.app-help'>;
    offer: ComponentAttribute<'landing.app-offer'> & RequiredAttribute;
    for_who: ComponentAttribute<'landing.app-who-is-it-for'>;
    how_to: ComponentAttribute<'landing.app-how-to'>;
    testimonials: ComponentAttribute<'landing.app-testimonials'>;
  };
}

export interface LandingVisionItem extends ComponentSchema {
  info: {
    displayName: 'Vision item';
    description: '';
  };
  attributes: {
    content: TextAttribute;
    order: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    position: EnumerationAttribute<['left', 'right']> &
      RequiredAttribute &
      DefaultTo<'right'>;
    enhanced: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    title: StringAttribute & RequiredAttribute;
    icon: MediaAttribute;
  };
}

export interface LandingVision extends ComponentSchema {
  info: {
    displayName: 'Vision';
    description: '';
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Vision'>;
    items: ComponentAttribute<'landing.vision-item', true>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::become-a-partner.become-a-partner': ApiBecomeAPartnerBecomeAPartner;
      'api::become-a-volunteer.become-a-volunteer': ApiBecomeAVolunteerBecomeAVolunteer;
      'api::city.city': ApiCityCity;
      'api::configuration.configuration': ApiConfigurationConfiguration;
      'api::country.country': ApiCountryCountry;
      'api::dimension.dimension': ApiDimensionDimension;
      'api::footer.footer': ApiFooterFooter;
      'api::landing.landing': ApiLandingLanding;
      'api::language.language': ApiLanguageLanguage;
      'api::member.member': ApiMemberMember;
      'api::mission.mission': ApiMissionMission;
      'api::news.news': ApiNewsNews;
      'api::onboarding-step.onboarding-step': ApiOnboardingStepOnboardingStep;
      'api::platform-role.platform-role': ApiPlatformRolePlatformRole;
      'api::selection-option.selection-option': ApiSelectionOptionSelectionOption;
      'api::service.service': ApiServiceService;
      'api::service-provider.service-provider': ApiServiceProviderServiceProvider;
      'api::service-provider-contact.service-provider-contact': ApiServiceProviderContactServiceProviderContact;
      'api::translation.translation': ApiTranslationTranslation;
      'landing.app-help': LandingAppHelp;
      'landing.app-how-to-step': LandingAppHowToStep;
      'landing.app-how-to': LandingAppHowTo;
      'landing.app-offer': LandingAppOffer;
      'landing.app-partnership-card': LandingAppPartnershipCard;
      'landing.app-partnership': LandingAppPartnership;
      'landing.app-testimonial': LandingAppTestimonial;
      'landing.app-testimonials': LandingAppTestimonials;
      'landing.app-who-is-it-for': LandingAppWhoIsItFor;
      'landing.data-and-transparency': LandingDataAndTransparency;
      'landing.gallery-item': LandingGalleryItem;
      'landing.gallery': LandingGallery;
      'landing.location': LandingLocation;
      'landing.mission': LandingMission;
      'landing.navigation': LandingNavigation;
      'landing.partner-section': LandingPartnerSection;
      'landing.partners': LandingPartners;
      'landing.pp-cp-tou-item': LandingPpCpTouItem;
      'landing.pp-cp-tou': LandingPpCpTou;
      'landing.story': LandingStory;
      'landing.team-member': LandingTeamMember;
      'landing.team': LandingTeam;
      'landing.thrive-app': LandingThriveApp;
      'landing.vision-item': LandingVisionItem;
      'landing.vision': LandingVision;
    }
  }
}
