'use strict';
var util    = require('util')
  , yeoman  = require('yeoman-generator')
  , github  = require('../lib/github')
  , path    = require('path')
  , inflect = require('inflect');

var BBBGenerator = module.exports = function BBBGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  if (!this.name) {
    this.log.error('You have to provide a name for the subgenerator.');
    process.exit(1);
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.appName  = this.name;
  this.destPath = util.format('client/apps/%s', this.appName);
};

util.inherits(BBBGenerator, yeoman.generators.NamedBase);

BBBGenerator.prototype.askFor = function askFor() {
  //var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

//  var prompts = [{
//    name: 'githubUser',
//    message: 'Tell me again your username on Github?',
//    default: 'someuser'
//  }];
//
//  this.prompt(prompts, function (props) {
//    this.githubUser = props.githubUser;
//    this.appName = props.appName;
//
//    cb();
//  }.bind(this));
};

BBBGenerator.prototype.createDestFolder = function createDestFolder() {
  this.mkdir(this.destPath);
  this.destinationRoot(path.join(this.destinationRoot(), this.destPath));
}

BBBGenerator.prototype.fetchBoilerplate = function fetchBoilerplate() {
  var self = this
    , done = this.async();

  this.remote('backbone-boilerplate', 'backbone-boilerplate', 'wip', function(err, remote) {
    self.sourceRoot(remote.cachePath);
    done();
  });
};

BBBGenerator.prototype.buildApp = function buildSkeleton() {
  var self = this;

  this.directory('.','.', function(data, filePath, filename){
    return data;
  });

};
