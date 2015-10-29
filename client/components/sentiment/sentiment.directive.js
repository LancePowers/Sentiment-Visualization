// A sentiment is a p5 illustration element with size === relevance, color === sentiment and name === keyword. 

(function () {
    'use strict ';
    angular.module('app.components.sentiment')
        .directive('gsSentiment', sentimentDirective);

    function sentimentDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/sentiment/sentiment.html',
            scope: {},
            controller: sentimentController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    sentimentController.$inject = ['alchemy'];

    function sentimentController(alchemy) {
        var vm = this;

        vm.people = [];

        vm.activate = activate;

        function activate() {
            getPeople();
        }

        function getPeople() {
            return alchemy.analyze(text)
                .then(function (data) {
                    vm.people = data;
                    logger.info('Activated People Grid');
                    return vm.people;
                });
        }

    }
})();