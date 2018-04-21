// parte cliente : version 2 (ANGULAR)
'use strict';

var app = angular.module('appSockets', []);

app.controller('messageController', messageController);

// factory that wraps the socket.io to be used correctly in angular
app.factory('socket', function($rootScope) {
    var socket = io.connect('http://localhost:8080', {
        'forceNew': true
    });
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});
// injection of scope and socket factory in the controller
messageController.$inject = ['$scope', 'socket'];

function messageController($scope, socket) {

    var msgControl = this;

    socket.on('messages', function(data) {
        console.log(data);
        msgControl.msgList = data;
    });

    $scope.$on('$destroy', function() {
        //socket.removeAllListeners();
        // or something likeapp.factory('socket', function ($rootScope) {
        socket.removeListener();
    });

    msgControl.addMessage = function() {
        var mensaje = {
            author: $scope.username,
            text: $scope.text
        };
        // envia el mensaje al servidor emitiendo el evento.
        socket.emit('new-message', mensaje);
    }
}
