var App = angular.module("PaginationDirectiveApp", []);

App.controller("PaginationCtrl", ['$scope', function ($scope) {
    $scope.range = 10;
    $scope.min = 0;
    $scope.max = 100;
    $scope.pageNumber = 1;

    $scope.verifyNumber = function($event){
        if($event.target.value < 0){
            $event.target.value  = -1 * $event.target.value;
        }
    }

    $scope.paginationCallback = function(pageNumber){
        $scope.pageNumber = pageNumber;
    }
}]);

App.directive('paginate', function () {
    var controller = ['$scope', function ($scope) {
            var defaultMin = 0;
            var defaultMax = 100;
            var defaultRange = 10;
            $scope.min = parseInt($scope.min || defaultMin);
            $scope.max = parseInt($scope.max || defaultMax);
            $scope.currMax;
            $scope.currMin = 0;
            $scope.pageArray = [];
            $scope.range = parseInt($scope.range || defaultRange);
            ($scope.max < $scope.range) ? ($scope.currMax = $scope.max) : ($scope.currMax = $scope.range);

            var buildPageArray = function (min, max) {
                var pageArray = [];
                for (var i = min; i < max; i++) {
                    pageArray.push(i + 1);
                }
                return pageArray;
            };

            var generatePageArray = function () {
                $scope.pageArray = buildPageArray($scope.min, $scope.currMax);
            };

            generatePageArray();

            $scope.changePage = function (rangeControl) {
                $scope.range = parseInt($scope.range);
                // rangeControl
                // 0 - first , 1 - Previous, 2 - Next, 3 - Last
                if (rangeControl == 0) {
                    // btn pressed = first
                    if ($scope.currMin == parseInt($scope.min)) {
                        return;
                    } else {
                        $scope.currMin = 0;
                        $scope.currMax = $scope.range;
                        $scope.pageArray = buildPageArray($scope.currMin, $scope.currMax);
                    }

                } else if (rangeControl == 1) {
                    // btn pressed = previous
                    if ($scope.currMin == parseInt($scope.min)) {
                        return;
                    } else {
                        $scope.currMin = $scope.currMin - $scope.range;
                        $scope.currMax = $scope.currMax - $scope.range;
                        $scope.pageArray = buildPageArray($scope.currMin, $scope.currMax);
                    }

                } else if (rangeControl == 2) {
                    // btn pressed = next
                    if ($scope.currMax == parseInt($scope.max)) {
                        return;
                    } else {
                        $scope.currMin = $scope.currMin + $scope.range;
                        $scope.currMax = $scope.currMax + $scope.range;
                        $scope.pageArray = buildPageArray($scope.currMin, $scope.currMax);
                    }


                } else {
                    // btn pressed = last
                    if ($scope.currMax == parseInt($scope.max)) {
                        return;
                    } else {
                        $scope.currMin = $scope.max - $scope.range;
                        $scope.currMax = $scope.max;
                        $scope.pageArray = buildPageArray($scope.currMin, $scope.currMax);
                    }

                }
            }

        }],
        link = function ($scope, element, attrs) {
            $scope.callbackFunction = function (currPage) {
                console.log('currPage', currPage);
                $scope.paginationCallback({
                    currPage: currPage
                });
            }

        },
        template = '<div class="pagination-wrap">' +
        '<span class="pagination-elm" data-ng-click="changePage(0)">First</span><span class="pagination-elm" data-ng-click="changePage(1)">Previous</span>' +
        '<span class="pagination-elm pages" data-ng-repeat="page in pageArray" data-ng-click="callbackFunction(currMin + $index)">{{page}}</span>' +
        '<span class="pagination-elm" data-ng-click="changePage(2)">Next</span><span class="pagination-elm" data-ng-click="changePage(3)">Last</span>' +
        '</div>';
    return {
        restrict: 'EA',
        scope: {
            min: "@",
            max: "@",
            range: "@",
            paginationCallback: "&"
        },
        controller: controller,
        template: template,
        link: link
    }
});
