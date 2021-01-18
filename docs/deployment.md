## Deployment

### Deployment on Cloud Foundry

Get the **free** [SAP Cloud Foundry Trial](https://www.sap.com/cmp/td/sap-cloud-platform-trial.html).

- `cf login`
- `npm install`
- `npm test`
- `npm run build`
- `cf push`

> :bulb: If you are using Git for Windows, you can run it via Git Bash.

### Deployment on Docker Image

A docker image is available on [Docker Hub](https://hub.docker.com/r/abaplint/abaplint-backend). See [Docker Deployment](./docker.md) for details.

### Deployment on Azure Container Instance

You can configure a Github action to automatically create an abaplint Server running in an [Azure Container Instance](./azure.md).

### Kyma

See [Kyma](./kyma.md).

### Helm

Example config, [https://github.com/heliconialabs/sci.abaplint.app](https://github.com/heliconialabs/sci.abaplint.app).

### Environment params

The server checks the following env params
- PORT - port to listen at
- VERBOSE - set 1 to output more verbose logs

It also support `.env` file. You can specify e.g. `PORT=8080` there instead of using variables or command line. Env file must not be pushed to the git repo.