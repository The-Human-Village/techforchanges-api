export default ({ env }) => ({
  url: `${env('HOST_URL', `http://${env('HOST', '0.0.0.0')}:${env.int('PORT', 1337)}`)}/admin`,
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
});
