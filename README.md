# Strapi template

This is template for Strapi setups

### `develop`

To start local development you will firstly need to create a `.env` file from `.env.example` file.

Once you have `.env` file ready, run the following commands:

```shell
yarn workspaces focus # to install dependencies

docker compose up -d # to start Postgres database

# With auto reload
yarn develop

# Without auto reload
```

### `build`

To build the application run `yarn build`
