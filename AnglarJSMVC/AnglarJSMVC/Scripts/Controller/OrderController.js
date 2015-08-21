var app = angular.module("app",[]);
var OrderListController = function ($scope, $http) {
    $http.get("/api/OrderApi/List").success(function (data) {
        console.log(data);
        $scope.ordersList = data;
        }).error(function() {
        console.log("error");
        });
};
app.controller('OrderListController', ['$scope', '$http', OrderListController]);



