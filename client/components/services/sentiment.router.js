(function () {

    'use strict';

    angular
        .module('app')
        .factory('sentiment', sentiment);

    sentiment.$inject = ['$http', 'parse', 'parseP5']

    function sentiment($http, parse, parseP5) {

        function parseDebate(candidate, debate) {
            var candidateComments = [];
            var comments = debate.split('\n');

            for (var i = 0; i < comments.length; i++) {
                if (comments[i].indexOf(candidate) !== -1) {
                    var start = candidate.length + comments[i].indexOf(candidate);
                    var comment = comments[i].slice(start, -1);
                    console.log(comment);
                    candidateComments.push(comment);
                }
            }
            return candidateComments;
        }

        function analyzeText(text) {
            if (text === '08') {
                var debate = debate08;
            } else if (text === '15') {
                var debate = debate15;
            }
            var comments = parseDebate('CLINTON:', debate);
            console.log(comments)
            for (var i = 0; i < comments.length; i++) {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/api/analysis',
                    data: {
                        text: comments[i]
                    }
                }
                console.log(req)
                $http(req)
                    .then(function (response) {
                        parseP5.handle(response);
                        parse.handle(response);
                    })
            }
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