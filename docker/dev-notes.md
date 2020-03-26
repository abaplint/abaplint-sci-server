docker build -f docker/Dockerfile -t abaplint-backend . 
docker run -p 3000:3000 abaplint-backend

docker-compose -f docker/docker-compose.yml --project-directory . up

## Cool
- https://github.com/kevinpollet/typescript-docker-multi-stage-build
