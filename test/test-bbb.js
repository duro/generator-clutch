/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var should  = require('should');
var _       = require('lodash');

describe('bbb subgenerator', function(){
  var expected = [
        ".bowerrc",
        "bower.json",
        "app/config.js",
        "app/app.js",
        "app/main.js"
      ]
    , appName = 'testApp'
    , testRoot = path.join(__dirname, 'temp/client/apps/', appName)
    , promptConfig = {
        'githubUser': 'duro',
        'appDescription': 'This is a test app',
        'version': '0.666.0'
      };

  before(function (done) {
    this.bbb = helpers.createGenerator('clutch:bbb', [
      path.join(__dirname, '../bbb')
    ], [appName]);

    helpers.mockPrompt(this.bbb, promptConfig);

    this.bbb.options['skip-install'] = true;
    this.bbb.run({}, function () {
      done();
    });
  });

  it('creates expected files', function(){
    helpers.assertFiles(_.map(expected, function(file){
      return path.join(testRoot, file);
    }.bind(this)));
  });

  it('modifed the package.json properly', function(){
    var pkg = JSON.parse(this.bbb.read(path.join(testRoot, 'package.json')));
    pkg.should.have.property('name').and.equal(appName);
    pkg.should.have.property('description').and.equal(promptConfig.appDescription);
    pkg.should.have.property('version').and.equal(promptConfig.version);
  })
});