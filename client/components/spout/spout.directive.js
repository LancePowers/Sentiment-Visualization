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
            bindToController: true,
            link: function (scope, element, attrs, controllers) {
                controllers.getEntities(attrs.class);
            },
        };
    }

    spoutController.$inject = ['parse', 'spoutP5', 'sentiment'];
    //pass in $attrs
    function spoutController(parse, spoutP5, sentiment) {
        var vm = this;
        vm.getEntities = function (candidate) {
            vm.spout = new spoutP5.Spout(candidate);
            sentiment.analyze(candidate, vm.spout);
            vm.spout.setCandidate(candidate);
            vm.p5 = new p5(vm.spout.sketch);
        }

    }
})();