/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var should  = require('should');

describe('clutch generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) return done(err);
      this.app = helpers.createGenerator('clutch:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var _this = this;

    var expected = [
      'package.json', '.editorconfig', '.jshintrc', '.travis.yml'
    ];

    helpers.mockPrompt(this.app, {
      'githubUser': 'duro',
      'appName': 'test-app',
      'appDescription': 'This is a test app'
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
