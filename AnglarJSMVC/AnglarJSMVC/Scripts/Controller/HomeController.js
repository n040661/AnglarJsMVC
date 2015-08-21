var HomeController = function ($scope, $http) {
    var city = JSON.parse(window.localStorage.getItem("selected_city"));
    var airport = JSON.parse(window.localStorage.getItem("selected_airport"));
    var area = JSON.parse(window.localStorage.getItem("selected_area"));
    $scope.type = 1;
    $scope.city = city;
    if (airport) {
        $scope.airport = airport;
    } else {
        $scope.airport = {};
        $scope.airport.Name = "请选择机场";
    }
    
    if (area) {
        $scope.area = area;
    }else if (city && city.Areas.length > 0) {
        $scope.area = city.Areas[0];
    } else {
        $scope.area = {};
        $scope.area.Name = "请选择区域";
    }
    
    $scope.search = function () {
        var url = hzc.helper.format("/Product/List/{0}/{1}?airport={2}&area={3}", $scope.type, $scope.city.City.ID, $scope.airport.ID, $scope.area.ID);
        window.location.href = url;
    };

    $scope.chooseAirport = function () {
        window.location.href = "/Product/ChooseAirport";
    }

    //$http.get('/api/HomeApi/1').success(function (data) {
    //    $scope.home = data;
    //}).error(function () {
    //    console.log("error");
    //});
};

hzc.controller('HomeController',['$scope', '$http',HomeController]);