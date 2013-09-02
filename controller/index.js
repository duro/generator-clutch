'use strict';
var util      = require('util')
  , path      = require('path')
  , yeoman    = require('yeoman-generator')
  , _         = require('lodash');

_.str     = require('underscore.string')

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  this.controllerName = this.name;
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];

  if (!this.controllerName) {
    prompts.push({
      name: 'controllerName',
      message: 'What would you like to name your controller?'
    });
  }

  prompts.push({
    type: 'confirm',
    name: 'createTemplate',
    message: 'Should we create a corisponding template directory?',
    default: true
  });

  this.prompt(prompts, function (props) {
    if (!this.controllerName) {
      this.controllerName = props.controllerName;
    }
    this.createTemplate = props.createTemplate;
    cb();
  }.bind(this));
};

ControllerGenerator.prototype.generateController = function generateController() {
  var nameArray = this.controllerName.split('/');

  this.controllerName       = nameArray.pop();
  this.controllerFileName   = this.controllerName + '_controller.js';
  this.controllerClassName  = _.str.classify(this.controllerName + '_controller');
  this.controllerDir        = path.join('server/app/controllers', nameArray.join('/'));

  this.mkdir(this.controllerDir);
  this.template('_controller.js', path.join(this.controllerDir, this.controllerFileName));
  debugger;
};