FROM ubuntu:trusty

ENV DB_HOST=localhost \
    DB_PORT=27017 \
    DB_NAME=cube_development \
    PORT0=1080 \
    PORT1=1180 \
    FORKS=1

RUN apt-get update && apt-get -qq -y install \
  python \
  python-bcrypt \
  nodejs \
  nodejs-legacy \
  > /dev/null \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD     ./    /app

ENTRYPOINT ["node"]
