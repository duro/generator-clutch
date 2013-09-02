'use strict';
var util      = require('util')
  , path      = require('path')
  , yeoman    = require('yeoman-generator')
  , github    = require('../lib/github');

var ClutchGenerator = module.exports = function ClutchGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    // Install root dependencies
    this.installDependencies({ bower: false, skipInstall: options['skip-install'] });

    // Install client statics dependencies
    this.destinationRoot(path.join(this.destinationRoot(), 'client/statics'));
    this.installDependencies({ bower: false, skipInstall: options['skip-install'] });

    // Switch back to root
    this.destinationRoot(path.join(this.destinationRoot(), '../../'));
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ClutchGenerator, yeoman.generators.Base);

ClutchGenerator.prototype.askFor = function askFor() {
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

ClutchGenerator.prototype.userInfo = function userInfo() {
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

ClutchGenerator.prototype.fetchBoilerplate = function fetchBoilerplate() {
  var self = this
    , done = this.async();

  this.remote('duro', 'clutch-boilerplate', function(err, remote) {
    self.sourceRoot(remote.cachePath);
    done();
  });
};

ClutchGenerator.prototype.buildSkeleton = function buildSkeleton() {
  var self = this;
  this.directory('.','.');
};
