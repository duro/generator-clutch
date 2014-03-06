define(function(require, exports, module) {

  var <%= moduleName %>Edit = module.exports = {

    /* --------------------------------------- */
    /* --( <%= moduleName %>: Create )-- */
    /* --------------------------------------- */

    url: '/edit/:id', // This will turn into /users/edit/:id

    // Data to retrieve before we set views
    resolve: {
      user: ['Restangular', '$stateParams',
        function(Restangular, $stateParams) {
          return Restangular.one('<%= moduleName %>', $stateParams.id).get();
        }
      ]
    },

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
            {id: 'edit', title: 'Save <%= moduleLabel %>', trigger: 'submitUserForm', icon: '<%= iconClass %>'},
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
        controller: ['$scope', 'Restangular', '$state', 'user',
          function($scope, Restangular, $state, user) {

            // Define Page Title
            $scope.$watchCollection('user', function () {
              $scope.$root.pageTitle = 'Edit - ' + (user.firstName || '') + ' ' + (user.lastName || '');
            });

            // Store our user on the scope
            $scope.user = user;

            // Listen for other views that want to save a user
            $scope.$on('submitUser', function() {
              $scope.saveUser();
            });

            // Save user handler
            $scope.saveUser = function() {
            };
          }
        ]
      }
    }
  };
});