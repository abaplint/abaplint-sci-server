FROM node:12-alpine

RUN apk add --no-cache git curl

COPY docker/docker-entrypoint.sh /usr/local/bin/
COPY ["package.json", "package-lock.json", "LICENSE", "./"]

RUN npm install --silent --no-progress

COPY ["src", "tsconfig.json", "./"]

RUN npm run build && \
    du -h -d 0 node_modules/ && \
    npm prune --production && \
    du -h -d 0 node_modules/ && \
    npm link

EXPOSE 3000

ENTRYPOINT ["docker-entrypoint.sh"]

# CMD ["abaplint"]
