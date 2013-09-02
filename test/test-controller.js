/*global describe, beforeEach, it*/
'use strict';

var path    = require('path')
  , fs      = require('fs')
  , helpers = require('yeoman-generator').test
  , should  = require('should');

describe('controller sub-generator (with arg, no directory prefix)', function(){

  var ctrlName = 'witharg'
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
    this.controller.name.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  });

  it('should have created a template file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/templates/', ctrlName, 'index.html')
    );
  })

});

describe('controller sub-generator (with arg, and directory prefix)', function(){

  var ctrlName = 'dir/witharg'
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

  it('should have recieved controller name', function(){
    this.controller.name.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  });

  it('should have created a template file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/templates/', ctrlName, 'index.html')
    );
  })

});

describe('controller sub-generator (without arg, no directory prefix)', function(){

  var ctrlName = 'noarg'
    , testRoot = path.join(__dirname, 'temp');

  before(function (done) {
    this.controller = helpers.createGenerator('clutch:controller', [
      path.join(__dirname, '../controller')
    ]);

    helpers.mockPrompt(this.controller, {
      'createTemplate': true,
      'controllerName': ctrlName
    });

    this.controller.run({}, function () {
      done();
    });
  });

  it('should have recieved controller name', function(){
    this.controller.name.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  });

  it('should have created a template file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/templates/', ctrlName, 'index.html')
    );
  })

});

describe('controller sub-generator (without arg, directory prefix)', function(){

  var ctrlName = 'dir/noarg'
    , testRoot = path.join(__dirname, 'temp');

  before(function (done) {
    this.controller = helpers.createGenerator('clutch:controller', [
      path.join(__dirname, '../controller')
    ]);

    helpers.mockPrompt(this.controller, {
      'createTemplate': true,
      'controllerName': ctrlName
    });

    this.controller.run({}, function () {
      done();
    });
  });

  it('should have recieved controller name', function(){
    this.controller.name.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  });

  it('should have created a template file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/templates/', ctrlName, 'index.html')
    );
  })

});

describe('controller sub-generator (no template)', function(){

  var ctrlName = 'notemplate'
    , testRoot = path.join(__dirname, 'temp');

  before(function (done) {
    this.controller = helpers.createGenerator('clutch:controller', [
      path.join(__dirname, '../controller')
    ]);

    helpers.mockPrompt(this.controller, {
      'createTemplate': false,
      'controllerName': ctrlName
    });

    this.controller.run({}, function () {
      done();
    });
  });

  it('should have recieved controller name', function(){
    this.controller.name.should.equal(ctrlName);
  });

  it('should create proper controller file', function(){
    helpers.assertFile(
      path.join(testRoot, 'server/app/controllers', ctrlName + '_controller.js')
    );
  });

  it('should have NOT created a template file', function(){
    fs.existsSync(path.join(testRoot, 'server/templates/', ctrlName, 'index.html'))
      .should.not.exist;
  })

});