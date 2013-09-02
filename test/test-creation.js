/*global describe, beforeEach, it*/
'use strict';

var path    = require('path')
  , helpers = require('yeoman-generator').test
  , should  = require('should')
  , _       = require('lodash');

before(function(done){
  helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    if (err) return done(err);
    this.app = helpers.createGenerator('clutch:app', [
      path.join(__dirname, '../app')
    ]);

    helpers.mockPrompt(this.app, {
      'githubUser': 'duro',
      'appName': 'test-app',
      'appDescription': 'This is a test app',
      'version': '0.666.0'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      done();
    });

  }.bind(this));
});

describe('clutch generator', function () {
  var expected = [
        'package.json', '.editorconfig', '.jshintrc', '.travis.yml', 'Gruntfile.js'
      ]
    , testRoot = path.join(__dirname, 'temp');

  it('creates expected files', function () {
    helpers.assertFiles(_.map(expected, function(file){
      return path.join(testRoot, file);
    }.bind(this)));
  });
});
