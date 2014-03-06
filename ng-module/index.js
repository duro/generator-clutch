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
  this.moduleName   = this.name;

  this.on('end', function () {
    // Set destination root back to project root to help with testability
    this.destinationRoot('../../');
  });
};

util.inherits(NgModuleGenerator, yeoman.generators.NamedBase);

NgModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
    type: 'confirm',
    name: 'includeUIRouter',
    message: 'Should I include ui.router as a dependency?',
    default: true
  },{
    type: 'confirm',
    name: 'includeListView',
    message: 'Should I include list view?',
    default: true
  },{
    type: 'confirm',
    name: 'includeCreateView',
    message: 'Should I include create view?',
    default: true
  },{
    type: 'confirm',
    name: 'includeEditView',
    message: 'Should I include edit view?',
    default: true
  },{
    name: 'iconClass',
    message: 'Icon CSS Class'
  }, {
    name: 'moduleLabel',
    message: 'Module Label'
  }];



  this.prompt(prompts, function (props) {
    this.includeUIRouter     = props.includeUIRouter;
    this.includeListView     = props.includeListView;
    this.includeCreateView   = props.includeCreateView;
    this.includeEditView     = props.includeEditView;
    this.iconClass           = props.iconClass;
    this.moduleLabel         = props.moduleLabel;
    cb();
  }.bind(this));
};

NgModuleGenerator.prototype.create = function create() {
  this.mkdir(this.destPath);
  this.destinationRoot(path.join(this.destinationRoot(), this.destPath));

  this.template('module.js', this.name + '.js');


  if (this.includeCreateView || this.includeEditView || this.includeListView) {
    this.mkdir('states');
    this.mkdir('templates');

    if (this.includeListView) {
      this.template('state.list.js', 'states/' + this.name + '.list.js');
      this.template('state.list.html', 'templates/list.html');
    }
    if (this.includeCreateView) {
      this.template('state.create.js', 'states/' + this.name + '.create.js');
    }
    if (this.includeEditView) {
      this.template('state.edit.js', 'states/' + this.name + '.edit.js');
    }
    if (this.includeCreateView || this.includeEditView) {
      this.template('state.form.html', 'templates/form.html');
    }

  }
};