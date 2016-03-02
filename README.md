[![Build Status](https://travis-ci.org/telemark/tfk-saksbehandling-elev-varsel.svg?branch=master)](https://travis-ci.org/telemark/tfk-saksbehandling-elev-varsel)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-saksbehandling-elev-varsel
Saksbehandling omkring varsler til elevene i den videregående skole

## Innhold
- [Arbeidsflyt](docs/workflow.md)
- [Regler](docs/rules.md)

## Docker
Build

```sh
$ docker build -t tfk-saksbehandling-elev-varsel .
```

### Usage
```sh
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm tfk-saksbehandling-elev-varsel
```

This will start a container. Do the job. Stop the container and remove it.