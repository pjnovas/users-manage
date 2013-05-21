
var expect = require('expect.js')
  , _ = require('underscore')
  , userManage = require('../lib')
  , express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
  , dbConfig = {
      name: "test_user_manage",
      host: "localhost"
    };

mongoose.connect('mongodb://' + dbConfig.host + '/'+ dbConfig.name);

describe('Users Manage', function(){

  it('should attach the providers to an express server', function(){

    var app = express();
    app.set('port', process.env.PORT || 3000);

    userManage.initialize(app, {
      "local": {
        "usernameField": "email",
        "passwordField": "password"
      },
      "facebook": {
          "clientID": "FACEBOOK_APP_ID"
        , "clientSecret": "FACEBOOK_APP_SECRET"
        , "callbackURL":  "http://local.host:3000/auth/facebook/callback"
      }
    });

    // were both providers added?
    var providers = app.get('providers');
    expect(providers.indexOf('local') > -1).to.be.ok();
    expect(providers.indexOf('facebook') > -1).to.be.ok();

    //has the routes for local?
    var found = _.findWhere(app.routes.get, { path: '/auth/local' });
    var foundCallback = _.findWhere(app.routes.get, { path: '/auth/local/callback'});

    expect(found).to.be.ok();
    expect(foundCallback).to.be.ok(); 

    //has the routes for facebook?
    var found = _.findWhere(app.routes.get, { path: '/auth/facebook' });
    var foundCallback = _.findWhere(app.routes.get, { path: '/auth/facebook/callback'});

    expect(found).to.be.ok();
    expect(foundCallback).to.be.ok(); 
  });

});