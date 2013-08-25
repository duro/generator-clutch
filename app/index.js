'use strict';
var util      = require('util');
var path      = require('path');
var yeoman    = require('yeoman-generator');
var GitHubApi = require('github');

var github = new GitHubApi({
  version: '3.0.0'
});

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var ClutchGenerator = module.exports = function ClutchGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ bower: false, skipInstall: options['skip-install'] });
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
  }];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.appName = props.appName;
    this.appDescription = props.appDescription;

    cb();
  }.bind(this));
};

ClutchGenerator.prototype.app = function app() {
  debugger;
};

ClutchGenerator.prototype.userInfo = function userInfo() {
  var self = this
    , done = this.async();

  githubUserInfo(this.githubUser, function (res) {
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

  this.directory('.','.', function(data, filePath, filename){
    // Transform the package.json
    if (filePath == path.join(self.sourceRoot(), 'package.json')) {
      data              = JSON.parse(data);
      data.name         = self.appName;
      data.author       = self.realname;
      data.description  = self.appDescription;
      return JSON.stringify(data, null, 2);
    }
    return data;
  });

};
