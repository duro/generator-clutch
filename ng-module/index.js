'use strict';
var util    = require('util')
  , yeoman  = require('yeoman-generator')
  , github  = require('../lib/github')
  , path    = require('path')
  , inflect = require('inflect');

var NgModuleGenerator = module.exports = function NgModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  if (!this.name) {
    this.log.error('You have to provide a name for the module. yo clutch:ng-module [name]');
    process.exit(1);
  }

  this.destPath     = util.format('app/%s', this.name);
  this.pkg          = JSON.parse(this.readFileAsString(path.join(this.destinationRoot(), 'package.json')));
  this.moduleName   = this.pkg.name + '.' + this.name;

  this.on('end', function () {
    // Set destination root back to project root to help with testability
    this.destinationRoot('../../');
  });
};

util.inherits(NgModuleGenerator, yeoman.generators.NamedBase);

NgModuleGenerator.prototype.create = function create() {
  this.mkdir(this.destPath);
  this.destinationRoot(path.join(this.destinationRoot(), this.destPath));

  this.template('module.js', this.name + '.js');
};