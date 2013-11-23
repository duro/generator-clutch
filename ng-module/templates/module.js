define(function(require, exports, module) {

  // Declare dependecies
  var angular = require('angular');
  <% if (includeUIRouter) { %>
  // Include Angular modules
  require('ui-router');
  <% } %>
  // Module definition
  var <%= moduleName %> = module.exports = angular.module('<%= moduleName %>', [<% if (includeUIRouter) { %>'ui.router'<% } %>]);

});