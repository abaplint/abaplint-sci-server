## Commands
docker build -f docker/Dockerfile -t abaplint-backend .
docker run -p 3000:3000 abaplint-backend

docker-compose -f docker/docker-compose.yml --project-directory . up

## Useful

- `docker rm $(docker ps -qa --no-trunc --filter "status=exited")` - remove stopped containers
- `docker image prune` - remove dangling images (no tag)
- `docker image prune -a` - remove all unused images

## Cool
- https://github.com/kevinpollet/typescript-docker-multi-stage-build

## Docker best practices
- https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
- maybe integrate better server closing: https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/bin/www or use `stoppable` package ?
- https://www.slideshare.net/Docker/dcsf-19-nodejs-rocks-in-docker-for-dev-and-ops
