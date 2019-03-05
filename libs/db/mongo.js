const config = require("config");
const mongoose  = require("mongoose");
const debug  = require("debug")

const { uri,options ,dbname } = config.get('mongo');
const doDebug = debug('Lib:mongo');
const Mongoose = debug('Lib:Mongoose');

doDebug('Connecting: %s %o', uri, JSON.stringify(options));
mongoose.set('debug', (coll, method, query, doc) => {
    Mongoose(coll, method, JSON.stringify(query), JSON.stringify(doc));
  });
mongoose.connect(uri,options ,err => {
  if(err)console.log("mongoose connect faild", err);
});

const db = mongoose.connection;
 
 db.on('open', () => {
    doDebug(`${uri} success`);
  });
  
  db.on('error', (err) => {
    doDebug(`mongodb error ${uri} error %o`, err);
  });
  
  db.on('connected', () => {
    doDebug(`${uri} connected`);
  });
  
  db.on('disconnect', () => {
    doDebug(`mongoose disconnected, retry after 5s`);
    return setTimeout(() => mongoose.connect(uri, options, doDebug), 5000);
  });
  
  db.on('reconnected', () => {
    doDebug(`${uri} reconnected`);
  });
  
  db.on('index', (err) => {
    if (err) doDebug(`${uri} index ${err}`);
  });

  db.uri = uri;
  db.dbname = dbname;
  module.exports = db;