## Deployment on Docker Image

A docker image is available on [Docker Hub](https://hub.docker.com/r/abaplint/abaplint-backend). See [Docker Deployment](./docs/docker.md) for details.

### Simple Way

`docker run abaplint/abaplint-backend -p 3000:3000`

or for background

`docker run abaplint/abaplint-backend -p 3000:3000 -d`

You can change the port adding `-e "port=xxx"` parameter.

### Building Own Container

See the content of `docker` directory. There are Dockerfile and docker-compose template. E.g. run `docker build -f docker/Dockerfile -t abaplint-backend .` to build your image from scratch.

*TODO: https docker compose, logging advices*

### Environment Variables

The package respects `.env` file (must not be committed to the repo though!). Here are the available variables:

- PORT - port to listen at
- ALB_SUPPRESS_FRONPAGE_LOG - disable frontpage log: set `1` to disable

