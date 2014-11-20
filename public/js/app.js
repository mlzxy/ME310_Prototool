var app = angular.module('app', ['ui.router', 'btford.socket-io']);


app.factory('mySocket', function(socketFactory) {
    var myIoSocket = io('http://localhost:8080');

    var mySocket = socketFactory({
        ioSocket: myIoSocket
    });
    return mySocket;
});


app.controller('mainCtrl', function($scope, $state, mySocket) {
    $scope.yourName = "";
    $scope.infoList = ["It works! Welcome! \n"];


    $scope.setName = function(childName) {
        $scope.yourName = childName;
        $scope.infoList[0] = $scope.infoList[0] + $scope.yourName;


        mySocket.emit('adduser', {
            name: $scope.yourName
        });
        mySocket.on($scope.yourName, function(data) {
            $scope.infoList.push(data);
        });
        $state.go('s2');
    };
});




app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('s1', {
            url: "/",
            views: {
                'Meow': {
                    templateUrl: "setName.html"
                }
            }
        })
        .state('s2', {
            url: "/info",
            views: {
                'Meow': {
                    templateUrl: "infoList.html"
                }
            }
        });
});