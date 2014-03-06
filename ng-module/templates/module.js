define(function(require, exports, module) {

  // Declare dependecies
  var angular = require('angular');
  <% if (includeUIRouter) { %>
  // Include Angular modules
  require('ui-router');
  <% } %>
  // Module definition
  var <%= moduleName %> = module.exports = angular.module('<%= pkg.name %>.<%= moduleName %>', [
    <% if (includeUIRouter) { %>'ui.router'<% } %>
  ])

  /**
   * Define User Module States
   */
  .config(function($stateProvider) {
    $stateProvider
      /**
       * <%= moduleName %>: Abstract
       */
      .state( 'page.<%= moduleName %>', {
        url: '/<%= moduleName %>',
        abstract: true,
        template: '<div axe-page></div>'
      })
      <% if (includeListView) { %>
      /**
       * <%= moduleName %>: List View
       */
      .state('page.<%= moduleName %>.list', require('./states/<%= moduleName %>.list'))
      <% } %>
      <% if (includeCreateView) { %>
      /**
       * <%= moduleName %>: Create View
       */
      .state('page.<%= moduleName %>.create', require('./states/<%= moduleName %>.create'))
      <% } %>
      <% if (includeEditView) { %>
      /**
       * <%= moduleName %>: Edit View
       */
      .state('page.<%= moduleName %>.edit', require('./states/<%= moduleName %>.edit'));
      <% } %>
  });

});