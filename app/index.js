'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

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

ClutchGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

ClutchGenerator.prototype.app = function app() {
  this.directory('skeleton', '.');
  this.copy('_package.json', 'package.json');
};

ClutchGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
