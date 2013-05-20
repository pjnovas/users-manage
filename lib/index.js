
var EventEmitter = require('events').EventEmitter
  , passport = require('passport')
  , User = require('./User');

var Users = module.exports = new EventEmitter();

Users.initialize = function (app, appKeys) {
  app.use(passport.initialize());
  app.use(passport.session());

  require('./User')(app);
  require('./auth')(app, appKeys);
};

