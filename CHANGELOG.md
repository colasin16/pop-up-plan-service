# Changelog

All changes are be kept here.

## [0.3.0]

## [0.3.0] - 2022-05-04

### Added

- `/plans/:planId` API has been added.

## [0.3.0] - 2022-05-03

### Added

- JWT token support added, including detecting userId from token, expiration time ('1800s') and login API excluded from forcing to have
`Authorization: Bearer` in header.

## [0.3.0] - 2022-04-18

### Fixed

- Fix issue related to usr id while creating a new user.

## [0.3.0] - 2022-03-31

### Added

- create user endpoint was added.

## [0.3.0] - 2022-03-19

### Added

- Add `Dockerfile` and `docker-compose` which containse `mongodb` container.
- Add hot reloading using `nodemon` for development purposes.
