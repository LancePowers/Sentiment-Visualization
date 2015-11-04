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

    formController.$inject = ['sentiment'];

    function formController(sentiment) {
        var vm = this;
        vm.hideForm = false;
        vm.getEntities = function () {
            sentiment.analyze(vm.singleSelect);
            vm.hideForm = true;
            vm.btn = true;
        }
    }
})();