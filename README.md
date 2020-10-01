# abaplint SCI Server

This project enables [abaplint](https://abaplint.org) to be run in the context of SAP Code Inspector (SCI), allowing immediate feedback to the ABAP developers in their standard editor, SE24 / SE80 / SE38 / ABAP in Eclipse. And also works seamlessly with other places where the code inspector is triggered like ABAP Test Cockpit (ATC).

## Overview

The integration requires two parts: The abaplint Server (this project) and the [abaplint Client](https://github.com/abaplint/abaplint-sci-client). When performing code checks through one of the supported editors or transactions, the abaplint Client will collect the necessary objects and dependencies and send them to the abaplint Server to be processed. The server responds with all of the abaplint findings, which are displayed like any other check results in the SAP tools.

![Components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/abaplint/abaplint-cloud-foundry/master/docs/components.iuml)

## Deployment Options

The server is provided as a node application and docker image. It can therefore be deployed in several ways, for example:
- Using SAP Cloud Foundry
- Using Azure Container Instance
- Using Docker On-premise

### Deployment on Cloud Foundry
- `cf login`
- `npm install`
- `npm test`
- `npm run build`
- `cf push`

Free CF trial at https://www.sap.com/cmp/td/sap-cloud-platform-trial.html

### Deployment on Azure Container Instance 

You can configure a Github action to automatically create an abaplint Server running in an [Azure Container Instance](./docs/azure.md).

### Deployment on Docker Image

A complete docker image is available on [Docker Hub](https://hub.docker.com/r/abaplint/abaplint-backend).

#### Simple Way

`docker run abaplint/abaplint-backend -p 3000:3000`

or for background

`docker run abaplint/abaplint-backend -p 3000:3000 -d`

You can change the port adding `-e "port=xxx"` parameter.

#### Building Own Container

See the content of `docker` directory. There are Dockerfile and docker-compose template. E.g. run `docker build -f docker/Dockerfile -t abaplint-backend .` to build your image from scratch.

*TODO: https docker compose, logging advices*

#### Environment Variables

The package respects `.env` file (must not be committed to the repo though!). Here are the available variables:

- PORT - port to listen at
- ALB_SUPPRESS_FRONPAGE_LOG - disable frontpage log: set `1` to disable

### Development Notes

Useful scripts

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
  - `bin/docker-run.sh` - run the built above container

See also [Docker Dev Notes](./docs/dev-notes.md)
