var mongodb        = require("mongodb"),
    util           = require("util"),
    metalog        = require("../lib/cube/metalog");

var test_db = { };

var test_collections = ["test_users", "test_events", "test_metrics"];

var options = exports.options = {
  "mongo-host":     "localhost",
  "mongo-port":     27017,
  "mongo-database": "cube_test"
};

exports.using_objects = function (clxn_name, test_objects){
  metalog.minor('cube_testdb', {state: 'loading test objects', test_objects: test_objects });
  return function(tdb){
    var that = this;
    tdb.db.collection(clxn_name, function(err, clxn){
      if (err) throw(err);
      that[clxn_name] = clxn;
      clxn.remove({ dummy: true }, {safe: true}, function(){
        clxn.insert(test_objects, { safe: true }, function(){
          that.callback(null);
        }); });
    });
  };
};

exports.batch = function(batch) {
  return {
    "": {
      topic: function() {
        connect();
        setup_db(this.callback);
      },
      "": batch,
      teardown: function(test) {
        if (test.client.isConnected()) {
          process.nextTick(function(){ test.client.close(); });
        };
      }
    }
  };
};

//
// db methods
//

function setup_db(cb){
  drop_collections(cb);
}

function connect(){
  metalog.minor('cube_testdb', { state: 'connecting to db', options: options });
  test_db.options = options;
  test_db.client  = new mongodb.Server(options["mongo-host"], options["mongo-port"], {auto_reconnect: true});
  test_db.db      = new mongodb.Db(options["mongo-database"], test_db.client, {});
}

function drop_collections(cb){
  metalog.minor('cube_testdb', { state: 'dropping test collections', collections: test_collections });
  test_db.db.open(function(error) {
    var collectionsRemaining = test_collections.length;
    test_collections.forEach(function(collection_name){
      test_db.db.dropCollection(collection_name,  collectionReady);
    });
    function collectionReady() {
      if (!--collectionsRemaining) {
        cb(null, test_db);
      }
    }
  });
}
