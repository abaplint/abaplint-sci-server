FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --quiet
COPY ["src", "tsconfig.json", "./"]
RUN npm run build


FROM node:12-alpine

RUN apk add --no-cache git
# RUN apk add --no-cache tini

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
RUN chown node:node .
USER node

COPY ["package*.json", "LICENSE", "./"]
RUN npm ci --quiet --only=production
COPY --from=builder /usr/src/app/build/ ./build

ENTRYPOINT ["node", "build/server.js"]
# ENTRYPOINT [ "/sbin/tini", "--", "node", "build/server.js" ]
EXPOSE 3000
