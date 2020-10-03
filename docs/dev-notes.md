## Docker Development Notes

### Useful scripts

- npm
  - `npm run run` - start server
  - `npm run lint` - lint code
  - `npm run build` - build typescript into `build` dir
  - `npm run dev` - start dev server (nodemon)
  - `npm run dev:debug` - start nodemon with debugger
  - `npm run test` - run tests
  - `npm run test:watch` - run tests in watch mode
  - `npm run start` - run built code with bare node - used for CF
- docker
  - `bin/docker-build.sh` - build docker container from command line (supposes bash environment)
  - `bin/docker-run.sh` - run the built above container, add `-d` arg to run detached
  - `bin/docker-test.sh` - test the container (must be built before) - requests /healthz API end point
  - `bin/docker-cleanup.sh` - cleanups docker stuff: removes inactive containers, untagged images (use with care)

### Manual commands

... Though prefer the scripts above.

- `docker build -f docker/Dockerfile -t abaplint-backend .` - build
- `docker run -p --rm 3000:3000 abaplint-backend` - run attached
- `docker run -p --rm -d 3000:3000 abaplint-backend` - run detached (in background)
- `docker-compose -f docker/docker-compose.yml --project-directory . up` - same but with the compose
- `docker-compose -d -f docker/docker-compose.yml --project-directory . up` - detached

- `docker ps` - running containers
- `docker ps -a` - all created container (including exited)
- `docker stop <id>` - stop specific container e.g. started detached
- `docker rm $(docker ps -qa --no-trunc --filter "status=exited")` - remove stopped containers
- `docker image prune` - remove dangling images (no tag)
- `docker image prune -a` - remove all unused images

### Cool

- https://github.com/kevinpollet/typescript-docker-multi-stage-build

### Best Practices

- https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
- maybe integrate better server closing: https://github.com/BretFisher/node-docker-good-defaults/blob/69c923bc646bc96003e9ada55d1ec5ca943a1b19/bin/www or use `stoppable` package ?
- https://www.slideshare.net/Docker/dcsf-19-nodejs-rocks-in-docker-for-dev-and-ops
