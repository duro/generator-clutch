var GitHubApi = require('github');

var github = new GitHubApi({
  version: '3.0.0'
});

exports.githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};