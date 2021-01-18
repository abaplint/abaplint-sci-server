# abaplint SCI Server

This project enables [abaplint](https://abaplint.org) to be run in the context of SAP Code Inspector (SCI), allowing immediate feedback to the ABAP developers in their standard editor, SE24 / SE80 / SE38 / ABAP in Eclipse. And also works seamlessly with other places where the code inspector is triggered like ABAP Test Cockpit (ATC).

## Overview

The integration requires two parts: The abaplint Server (this project) and the [abaplint Client](https://github.com/abaplint/abaplint-sci-client). When performing code checks through one of the supported editors or transactions, the abaplint Client will collect the necessary objects and dependencies and send them to the abaplint Server to be processed. The server responds with all of the abaplint findings, which are displayed like any other check results in the SAP tools.

![Components](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/abaplint/abaplint-sci-server/master/docs/components.iuml)

**Important:** The code under test leaves your ABAP system! Be sure to use a secure and controllable abaplint Server. For a test, you might use the common server at [http://sci.abaplint.org/](http://sci.abaplint.org/) (but please don't post any proprietary code).

## Deployment Options

The server is provided as a [NodeJs](https://nodejs.org) application and Docker image. It can therefore be deployed in several ways, for example:
- Using SAP Cloud Foundry
- Using Docker On-premise
- Using Azure Container Instance
- Using Kyma
- Using Helm

See [Deployment Options](./docs/deployment.md)

## Homepage

The homepage of your server will show the abaplint version, some details about the server environment, and a list of the most recent
abaplint API requests.

![abaplint Server homepage](./docs/abaplint-server.png)

## Development Notes

[Docker Development Notes](./docs/dev-notes.md)
