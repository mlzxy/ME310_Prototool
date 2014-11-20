var app = angular.module('app', []);

app.controller('mainCtrl', function($scope, $http) {
    $http({
        url: "/api/getusers",
        method: "GET"
    }).success(function(data) {
        // $scope.userList = data;
        $scope.formList = [];
        for (var v in data) {
            $scope.formList.push({
                formname: data[v],
                username: data[v]
            });
        }
    });

    var transform = function(data) {
        return $.param(data);
    };


    $scope.submit = function(form) {
        $http.post('/api/send',
            form, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                transformRequest: transform
            }).success(function() {
            $('#panel').text("send Success\n");
        }).error(function() {
            $('#panel').text("send failure\n");
        });
    };
});