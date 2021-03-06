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
                controllers.background = JSON.parse(attrs.class).image;
                controllers.getEntities(attrs.class);

            },
        };
    }

    spoutController.$inject = ['spoutP5'];

    function spoutController(spoutP5) {
        var vm = this;
        vm.getEntities = function (candidate) {
            vm.spout = new spoutP5.Spout(candidate);
            vm.p5 = new p5(vm.spout.sketch);
        }

    }
})();