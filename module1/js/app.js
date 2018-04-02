app = angular.module('LunchCheck', []).
controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    // click function
    $scope.checkClick = function() {

        $scope.message = 'Please enter data first';
        var allEmpty = true;
        var numberItems = 0;

        if ($scope.menu) {
            // Split a string into an array of substrings, separated by ','
            numberItems = $scope.menu.split(",");

            // checking for an 'empty' item as a bonus feature (ungraded).
            numberItems = numberItems.filter(function(element) {
                if (element !== '""' && element !== "''" && element !== "")
                    return true;
            });

            numberItems.forEach(function(element) {
                if (element !== '') allEmpty = false;
            });

            // By default AngularJS will trim input's content before binding it to the model
            if (numberItems.length === 0 || allEmpty) {
                $scope.message = 'Please enter data first';
            } else {

                //number of items in the textbox is less than or equal to 3 
                if (numberItems.length <= 3) {
                    $scope.message = 'Enjoy!';
                }
                //number of items in the textbox is greater than 3
                if (numberItems.length > 3) {
                    $scope.message = 'Too much!';
                }

            }
        }
    }
}