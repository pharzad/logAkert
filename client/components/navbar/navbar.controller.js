'use strict';

angular.module('portOfAdvsApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
    }, {
            'title': 'Search',
            'link': '/search/'
    }, {
            'title': 'Conflicts',
            'link': '/conflict/'
    }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });

angular.module('portOfAdvsApp')
    .controller('secondNavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Agents Status',
            'link': '/'
    }];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });
