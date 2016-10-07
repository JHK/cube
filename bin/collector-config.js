// Default configuration for development.
module.exports = {
  "mongo-host": process.env.DB_HOST,
  "mongo-port": process.env.DB_PORT,
  "mongo-database": process.env.DB_NAME,
  "mongo-username": null,
  "mongo-password": null,
  "http-port": process.env.PORT0,
  "udp-port": process.env.PORT1,
  "workers": process.env.FORKS
};
