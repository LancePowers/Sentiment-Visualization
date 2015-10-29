(function () {
    'use strict ';
    angular.module('app.components.form')
        .directive('formView', formDirective);

    function formDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/form/form-view.html',
            scope: {},
            controller: formController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    formController.$inject = [];

    function formController(alchemy) {
        var vm = this;
        vm.test = 'test'
    }
})();