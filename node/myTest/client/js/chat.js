'use strict';

var app = angular.module('appChat', []);
app.controller('chatController', chatController );

var port = '8080';
var host = 'localhost';
var URL = 'http://' + host + ':' + port;

// factory that wraps the socket.io to be used correctly in angular
app.factory('socket', function($rootScope) {
    var socket = io.connect(URL, {
        'forceNew': false,
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

  chatController.$inject =  ['$scope', 'socket'];

  function chatController($scope, socket) {

    // get elements
    var control = this;

    control.messages = [{
            message: "cookies??",
            id: 10,
            username: "pepe"
        },
        {
          message: "hellow ?",
          id : 2,
          username: "lola"
        }]

    var status = $scope.status;
   
  }
