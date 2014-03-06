define(function(require, exports, module) {

  var <%= moduleName %>List = module.exports = {

    /* --------------------------------------- */
    /* --( <%= moduleName %>: List )-- */
    /* --------------------------------------- */

    url: '', // This will be the top-level route /<%= moduleName %>

    // View Configurations
    views: {

      /* --------------------------------------- */
      /* --( Page Actions )-- */
      /* --------------------------------------- */

      'pageActions': {
        template: '<div axe-page-actions="actionConfig"></div>',
        controller: ['$scope', function($scope) {
          $scope.actionConfig = [
            {id: 'create', title: 'Create New <%= moduleLabel %>', route: '/<%= moduleName %>/create', icon: '<%= iconClass %>'}
          ];
        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/<%= moduleName %>/templates/list.html',
        controller: [
          '$scope', 'Restangular', '$state',
          function($scope, Restangular,$state){

            // Define Page Title
            $scope.$root.pageTitle = '<%= moduleName %>';

          }
        ]
      }
    }
  };

});
