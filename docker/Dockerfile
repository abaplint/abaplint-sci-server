FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quiet
COPY ./public ./public
COPY ["tsconfig.json", "index.ts", "./"]
COPY ./src ./src
RUN npm run build


FROM node:12-alpine

RUN apk add --no-cache git tini

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /usr/src/app
RUN chown node:node .
USER node

COPY ["package*.json", "LICENSE", "./"]
RUN npm ci --quiet --only=production && npm cache clean --force --silent
COPY --from=builder /usr/src/app/build/ ./build

# HEALTHCHECK --interval=30s CMD node healthcheck.js ? or curl localhost/healthz = OK ?

ENTRYPOINT [ "/sbin/tini", "--", "node", "build/index.js" ]
