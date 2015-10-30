(function () {

    'use strict';

    angular
        .module('app')
        .factory('sentiment', sentiment);

    sentiment.$inject = ['$http', 'parse']

    function sentiment($http, parse) {

        function analyzeText(text) {
            console.log(text)
            var req = {
                method: 'POST',
                url: 'http://127.0.0.1:3000/api/analysis',
                data: {
                    text: text
                }
            }
            console.log(req)
            $http(req)
                .then(function (response) {
                    console.log(response.data)
                    parse.handle(sampleResponse);
                })
        }

        return {
            analyze: function (text) {
                return analyzeText(text);
            },
        }

    };

}())

//(function () {
//    'use strict';
//
//    angular
//        .module('app.core')
//        .factory('dataservice', dataservice);
//
//    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
//    /* @ngInject */
//    function dataservice($http, $q, exception, logger) {
//        var service = {
//            getPeople: getPeople,
//            getMessageCount: getMessageCount
//        };
//
//        return service;
//
//        function getMessageCount() {
//            return $q.when(72);
//        }
//
//        function getPeople() {
//            return $http.get('/api/people')
//                .then(success)
//                .catch(fail);
//
//            function success(response) {
//                return response.data;
//            }
//
//            function fail(e) {
//                return exception.catcher('XHR Failed for getPeople')(e);
//            }
//        }
//    }
//})();