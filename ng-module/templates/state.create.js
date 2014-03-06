define(function(require, exports, module) {

  var <%= moduleName %>Create = module.exports = {

    /* --------------------------------------- */
    /* --( <%= moduleName %>: Create )-- */
    /* --------------------------------------- */

    url: '/create', // This will turn into /<%= moduleName %>/create

    // View Configurations
    views: {

      /* --------------------------------------- */
      /* --( Page Actions )-- */
      /* --------------------------------------- */

      'pageActions': {
        template: '<div uni-page-actions="actionConfig"></div>',
        controller: ['$scope', function($scope) {

          // Define our Action objects
          $scope.actionConfig = [
            {id: 'create', title: 'Create <%= moduleLabel %>', trigger: 'submitUserForm', icon: '<%= iconClass %>'},
            {id: 'cancel', title: 'Cancel', route: '/<%= moduleName %>', icon: 'remove-sign'}
          ];

          // Setup listener for save submit
          $scope.submitUserForm = function() {
            $scope.$parent.$broadcast('submitUser');
          };

        }]
      },

      /* --------------------------------------- */
      /* --( Main Page Content )-- */
      /* --------------------------------------- */

      'pageContent': {
        templateUrl: 'app/<%= moduleName %>/templates/form.html',
        controller: ['$scope', '$state',
          function($scope, $state) {

            // Define Page Title
            $scope.$root.pageTitle = 'Create New <%= moduleLabel %>';

            // Listen for other views that want to save a user
            $scope.$on('submitUser', function() {
              $scope.saveUser();
            });

            // Save User Handler
            $scope.saveUser = function() {
            };
          }
        ]
      }
    },
  };
});