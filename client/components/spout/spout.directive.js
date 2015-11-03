(function () {
    'use strict ';
    angular.module('app.components.spout')
        .directive('spout', spoutDirective);

    function spoutDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/spout/spout.html',
            scope: {},
            controller: spoutController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    spoutController.$inject = ['parse', 'spoutP5'];

    function spoutController(parse, spoutP5) {
        var vm = this;
        vm.test = 'test';
        vm.p5 = new p5(spoutP5.sketch);
    }
})();