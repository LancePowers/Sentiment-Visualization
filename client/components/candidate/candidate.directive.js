(function () {
    'use strict';
    angular.module('app.components.candidate')
        .directive('candidate', candidateDirective);

    function candidateDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/candidate/candidate.html',
            scope: {},
            controller: candidateController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    candidateController.$inject = [];

    function candidateController() {
        var vm = this;
        vm.showCandidate = false;
        vm.toggleHide = function () {
            vm.showCandidate = true;

            vm.candidates = [{
                name: 'CHAFEE',
                image: '/img/CHAFEE.png',
                position: {
                    x: 175,
                    y: 245
                }
            }, {
                name: 'WEBB',
                image: '/img/WEBB.jpg',
                position: {
                    x: 100,
                    y: 230
                }
            }, {
                name: 'O’MALLEY',
                image: '/img/OMALLEY.png',
                position: {
                    x: 250,
                    y: 200
                }
            }, {
                name: 'SANDERS',
                image: '/img/SANDERS.png',
                position: {
                    x: 200,
                    y: 250
                }
            }, {
                name: 'CLINTON',
                image: '/img/CLINTON.png',
                position: {
                    x: 200,
                    y: 205
                }
            }]
        }
    }
})()