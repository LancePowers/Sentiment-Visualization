// A sentiment is a p5 illustration element with size === relevance, color === sentiment and name === label. 
(function () {
    'use strict ';
    angular.module('app.components.sentiment')
        .directive('sentiment', sentimentDirective);

    function sentimentDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/sentiment/sentiment.html',
            scope: {},
            controller: sentimentController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    sentimentController.$inject = ['parse'];

    function sentimentController(parse) {
        var vm = this;
        vm.entities = parse.entities;
    }
})();