angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tabsController.posts', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/posts.html',
        controller: 'postsCtrl'
      }
    }
  })

  .state('posts', {
    url: '/posts',
        templateUrl: 'templates/posts.html',
        controller: 'postsCtrl'
  })

  .state('addcoin', {
    url: '/addcoin',
        templateUrl: 'templates/AddCoin.html',
        
  })

  .state('TransferCoins', {
    url: '/TransferCoins',
        templateUrl: 'templates/transfer_coins.html',
        
  })

  

  .state('cartTabDefaultPage', {
    url: '/page3',
    templateUrl: 'templates/cartTabDefaultPage.html',
    controller: 'cartTabDefaultPageCtrl'
  })

  .state('tabsController.cloudTabDefaultPage', {
    url: '/page4',
    views: {
      'tab3': {
        templateUrl: 'templates/cloudTabDefaultPage.html',
        controller: 'cloudTabDefaultPageCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'app/login/login.html',
    controller: 'loginCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html'
    
  })

  .state('tabsController.postDetails', {
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/postDetails.html',
        controller: 'postDetailsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')



});
