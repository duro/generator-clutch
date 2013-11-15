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

    // Set destination root back to project root to help with testability
    this.destinationRoot('../../');
  });

  this.appName  = this.name;
  this.destPath = util.format('client/%s', this.appName);
};

util.inherits(BBBGenerator, yeoman.generators.NamedBase);

BBBGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'githubUser',
    message: 'Tell me again your username on Github?',
    default: 'someuser'
  },{
    name: 'appDescription',
    message: 'Give this app a description',
  },{
    name: 'version',
    message: 'What is the starting version number for this app you\'d like to use?',
    default: '0.1.0'
  }];

  this.prompt(prompts, function (props) {
    this.githubUser     = props.githubUser;
    this.appDescription = props.appDescription;
    this.version        = props.version;

    cb();
  }.bind(this));
};

BBBGenerator.prototype.userInfo = function userInfo() {
  var self = this
    , done = this.async();

  github.githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    self.realname = res.name;
    self.email = res.email;
    self.githubUrl = res.html_url;
    done();
  });
};

BBBGenerator.prototype.createDestFolder = function createDestFolder() {
  this.mkdir(this.destPath);
  this.destinationRoot(path.join(this.destinationRoot(), this.destPath));
};

BBBGenerator.prototype.fetchBoilerplate = function fetchBoilerplate() {
  var self = this
    , done = this.async();

  this.remote('duro', 'clutch-backbone-boilerplate', function(err, remote) {
    self.sourceRoot(remote.cachePath);
    done();
  });
};

BBBGenerator.prototype.buildApp = function buildSkeleton() {
  var self = this;
  this.directory('.','.');
};
