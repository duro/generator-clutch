'use strict';
var util      = require('util')
  , path      = require('path')
  , yeoman    = require('yeoman-generator')
  , github    = require('../lib/github');

var BBBControllerGenerator = module.exports = function BBBControllerGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {

  });
};

util.inherits(BBBControllerGenerator, yeoman.generators.Base);

BBBControllerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'someuser'
  },{
    name: 'appName',
    message: 'What would you like to call your app?'
  },{
    name: 'appDescription',
    message: 'How your you describe your project?'
  },{
    name: 'version',
    message: 'What is the starting version number you\'d like to use?',
    default: '0.1.0'
  }];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.appName = props.appName;
    this.appDescription = props.appDescription;
    this.version = props.version;

    cb();
  }.bind(this));
};