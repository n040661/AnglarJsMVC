var ChooseAirportController = function ($scope, $http) {
    $scope.isSearch = false;
    $http.get('/api/HomeApi/ChooseAirport').success(function (data) {
        $scope.cities = data;
        console.log(data);
    }).error(function () {
        console.log("error");
    });

    $scope.choose = function (city,airport) {
        window.localStorage.setItem("selected_city", JSON.stringify(city));
        window.localStorage.setItem("selected_airport", JSON.stringify(airport));
        window.location.href = "/Product/Index";
    }

    $scope.search = function () {
        if ($scope.query.length>1) {
            $scope.isSearch = true;
        } else {
            $scope.isSearch = false;
        }
    }
};

hzc.controller('ChooseAirportController', ['$scope', '$http', ChooseAirportController]);