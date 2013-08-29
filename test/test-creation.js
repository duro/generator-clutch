/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var should  = require('should');

before(function(done){
  helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
    if (err) return done(err);

    this.app = helpers.createGenerator('clutch:app', [
      '../../app'
    ]);

    helpers.mockPrompt(this.app, {
      'githubUser': 'duro',
      'appName': 'test-app',
      'appDescription': 'This is a test app'
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
  ];

  it('creates expected files', function () {
    helpers.assertFiles(expected);
  });
});

describe('bbb subgenerator', function(){
  var expected = [
      ".bowerrc",
      "bower.json",
      "app/config.js",
      "app/app.js",
      "app/main.js"
    ];

  before(function (done) {
    this.bbb = helpers.createGenerator('clutch:bbb', [
      '../../bbb'
    ], ['testApp']);
    this.bbb.options['skip-install'] = true;
    this.bbb.run({}, function () {
      done();
    });
  });

  it('creates expected files', function(){
    helpers.assertFiles(expected);
  });
});
