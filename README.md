# Pop up plan service

Backend for the pop-up plan project.

## How to run using Docker

1. production:

- `make build-prod`
- `make run-prod`

2. development:

- `make build`
- `make run`

## Hot reload

Hot reload is supported using nodemon package, there is a file `nodemon.json` which can be found in root of the project which has some configs for hot reloading.

[More info about how to enable hot reloading for typescript code.](https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f)
