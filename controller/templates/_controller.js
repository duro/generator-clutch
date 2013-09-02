var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var <%= controllerClassName %> = new Controller();

<%= controllerClassName %>.index = function() {
  this.title = '';
  this.render();
};

module.exports = <%= controllerClassName %>;
