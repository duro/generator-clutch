/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var should  = require('should');

describe('controller sub-generator (with arg)', function(){

  var ctrlName = 'test'
    , testRoot = path.join(__dirname, 'temp');

  before(function (done) {
    this.controller = helpers.createGenerator('clutch:controller', [
      path.join(__dirname, '../controller')
    ], [ctrlName]);

    helpers.mockPrompt(this.controller, {
      'createTemplate': true
    });

    this.controller.run({}, function () {
      done();
    });
  });

  it('should have proper controller name', function(){
    this.controller.controllerName.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  })

});