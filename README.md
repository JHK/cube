# Cube

**Cube** is a system for collecting timestamped events and deriving metrics. By collecting events rather than metrics, Cube lets you compute aggregate statistics *post hoc*. It also enables richer analysis, such as quantiles and histograms of arbitrary event sets. Cube is built on [MongoDB](http://www.mongodb.org) and available under the [Apache License](/square/cube/blob/master/LICENSE).

Want to learn more? [See the wiki.](https://github.com/square/cube/wiki)

## Status

Cube is **not under active development, maintenance or support by Square** (or by its original author Mike Bostock). It has been deprecated internally for over a year. We keep it running for historical interest because it powers some interesting visualizations, but new production systems have replaced it for analytics purposes.

[Infochimps](https://github.com/infochimps-labs/cube) worked on a fork of Cube which diverged slightly from the Square version. Github user [Marsup](https://github.com/marsup/cube) has been working to [merge the two versions](https://github.com/square/cube/pull/129) with some success, but there are no plans to complete the merge or publish new versions under the original Square repository or npm package.

Please use the [cube-user](https://groups.google.com/forum/#!forum/cube-user) list on Google Groups for all further discussion of the Cube project.

## Docker

This branch supports building cube into a docker container. The dependencies are included as parts of them are not available in npm repositories anymore. This allows to create a container with the command:

`docker build -t cube .`

The image can be configured by changing the default values of those environment variables:

```bash
DB_HOST=localhost
DB_PORT=27017
DB_NAME=cube_development
PORT0=1080
PORT1=1180
FORKS=1
```

Finally the container can be started for example with:

`docker run -p 1080:1080 -e DB_HOST=mongodb cube bin/collector`
