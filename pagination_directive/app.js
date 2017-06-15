var App = angular.module("PaginationDirectiveApp", []);

App.controller("PaginationCtrl", ['$scope', function ($scope) {
    $scope.range = 10;
    $scope.min = 0;
    $scope.max = 100;

    $scope.verifyNumber = function($event){
        if($event.target.value < 0){
            $event.target.value  = -1 * $event.target.value;
        }
    }
}]);
