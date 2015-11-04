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
        vm.candidates = ['CHAFEE', 'WEBB', 'O’MALLEY', 'SANDERS', 'CLINTON']
    }
})()