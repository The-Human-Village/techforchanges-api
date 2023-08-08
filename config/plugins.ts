const aws_upload_provider = env => {
  return {
    provider: 'aws-s3',
    providerOptions: {
      baseUrl: env('HOST_URL', `${env('HOST')}:${env('PORT')}`),
      rootPath: 'uploads/',
      s3Options: {
        region: env('AWS_REGION'),
        params: {
          Bucket: env('AWS_BUCKET'),
        },
      },
    },
    actionOptions: {
      upload: {},
      uploadStream: {},
      delete: {},
    },
  };
};

const local_upload_provider = () => {
  return {
    providerOptions: {
      localServer: {
        maxage: 300000,
      },
    },
  };
};

export default ({ env }) => ({
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Tech For Changes API",
        description: "OpenAPI documentation for Human village landing page and Thrive app"
      },
      "x-strapi-config": {
        path: "/documentation",
        showGeneratedFiles: true,
        generateDefaultResponse: true,
        plugins: [
          "email",
          "upload",
          "users-permissions"
        ]
      }
    }
  },
  email: {
    config: {
      provider: 'amazon-ses',
      providerOptions: {
        key: env('AWS_SES_KEY'),
        secret: env('AWS_SES_SECRET'),
        amazon: `https://email.${env('AWS_REGION')}.amazonaws.com`,
      },
      settings: {
        defaultFrom: env('AWS_SES_FROM_EMAIL'),
        defaultReplyTo: env('AWS_SES_REPLY_TO_EMAIL'),
      },
    },
  },
  upload: {
    config: env.bool('LOCAL_UPLOAD', false) ? local_upload_provider() : aws_upload_provider(env),
  },
  'entity-relationship-chart': {
    enabled: true,
    config: {
      exclude: [
        'strapi::core-store',
        'webhook',
        'admin::permission',
        'admin::user',
        'admin::role',
        'admin::api-token',
        'plugin::upload.file',
        'plugin::i18n.locale',
        'plugin::users-permissions.permission',
        'plugin::users-permissions.role',
      ],
    }
  },
});
