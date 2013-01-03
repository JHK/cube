var cluster = require('cluster'),
    options = require("./collector-config"),
    cube = require("../"),
    server = cube.server(options);

var numCPUs = options.workers || require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  server.register = function(db, endpoints) {
    cube.collector.register(db, endpoints);
  };
  
  server.start();
}
