FROM node:18.16.0-alpine as build

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1

ARG NODE_ENV=production
ARG STRAPI_ADMIN_BACKEND_URL
ENV STRAPI_ADMIN_BACKEND_URL $STRAPI_ADMIN_BACKEND_URL
ARG HOST_URL
ENV HOST_URL $HOST_URL

WORKDIR /opt/app

COPY ./ .

RUN yarn workspaces focus --production
RUN mkdir prod_modules && mv ./node_modules/* ./prod_modules

RUN yarn workspaces focus

RUN NODE_ENV=${NODE_ENV} yarn build

FROM node:18.16.0-alpine

RUN apk add vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app

COPY --from=build /opt/app/package.json ./
COPY --from=build /opt/app/yarn.lock ./
COPY --from=build /opt/app/prod_modules ./node_modules
COPY --from=build /opt/app/server.js ./
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/favicon.ico ./
COPY --from=build /opt/app/database ./database

EXPOSE 80

CMD ["node", "server"]
