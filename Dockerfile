ARG NODE_VERSION=fixme

FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV SHELL=/bin/sh

#########################################
FROM base AS depskeleton
WORKDIR /app

COPY ./.moon/docker/workspace .

RUN corepack enable

#########################################
FROM depskeleton AS proddeps
WORKDIR /app

RUN yarn workspaces focus -A --production

#########################################
FROM proddeps AS devdeps
WORKDIR /app

RUN apt update && apt install -y ca-certificates
RUN yarn --immutable

#########################################
FROM devdeps AS sources
WORKDIR /app

COPY ./.moon/docker/sources .

#########################################
FROM sources AS build
WORKDIR /app

ARG GRAPHQL_URL=fixme
ENV GRAPHQL_URL=${GRAPHQL_URL}
ARG SERVER_LOGOUT_URL=fixme
ENV SERVER_LOGOUT_URL=${SERVER_LOGOUT_URL}
ARG SERVER_LOGIN_URL=fixme
ENV SERVER_LOGIN_URL=${SERVER_LOGIN_URL}

RUN yarn moon :build

#########################################
FROM build AS test
WORKDIR /app

RUN yarn moon '#testable:test'

#########################################
FROM sources AS lint
WORKDIR /app

RUN yarn moon :lint

#########################################
FROM base AS runtime
WORKDIR /app

COPY --from=proddeps /app/node_modules ./node_modules
COPY ./.moon/docker/workspace/ .
COPY --from=build /app/dist/ ./
