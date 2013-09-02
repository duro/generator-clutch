'use strict';
var util      = require('util')
  , path      = require('path')
  , yeoman    = require('yeoman-generator')
  , _         = require('lodash');

_.str     = require('underscore.string')

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  if (args[0]) {
    this.controllerName = this.name = args[0];
  }
};

util.inherits(ControllerGenerator, yeoman.generators.Base);

ControllerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [];

  if (!this.name) {
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
      this.controllerName = this.name = props.controllerName;
    }
    this.createTemplate = props.createTemplate;
    cb();
  }.bind(this));
};

ControllerGenerator.prototype.processName = function processName() {
  var nameArray = this.controllerName.split('/');

  this.controllerName       = nameArray.pop();
  this.dirPrefix            = nameArray.join('/');
};

ControllerGenerator.prototype.generateController = function generateController() {
  this.controllerFileName   = this.controllerName + '_controller.js';
  this.controllerClassName  = _.str.classify(this.name + '_controller');
  this.controllerDirPath    = path.join('server/app/controllers', this.dirPrefix);

  this.mkdir(this.controllerDirPath);
  this.template('_controller.js', path.join(this.controllerDirPath, this.controllerFileName));
};

ControllerGenerator.prototype.generateTemplate = function generateTemplate() {
  if (this.createTemplate) {
    this.templateDirPath = path.join('server/templates/', this.dirPrefix, this.controllerName);
    this.mkdir(this.templateDirPath);
    this.template('_template.html', path.join(this.templateDirPath, 'index.html'));
  }
};