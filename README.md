# Cloud foundry abaplint backend

Use with [abaplint-abap-backend](https://github.com/abaplint/abaplint-abap-backend)

## Deploying to Cloud Foundry
- `cf login`
- `cf push`

`npm install`

`npm test`

`cf push`

Free CF trial at https://www.sap.com/cmp/td/sap-cloud-platform-trial.html

## Overview
![Components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/abaplint/abaplint-cloud-foundry/master/docs/components.iuml)

## Or start in docker on-premises

### Simple way

`docker run abaplint/abaplint-backend -p 3000:3000`

or for background

`docker run abaplint/abaplint-backend -p 3000:3000 -d`

your can change the port adding `-e "port=xxx"` param

### Building own container

See the content of `docker` directory. There are Dockerfile and docker-compose template. E.g. run `docker build -f docker/Dockerfile -t abaplint-backend .` to build your image from scratch.

TODO: https docker compose, logging advices
