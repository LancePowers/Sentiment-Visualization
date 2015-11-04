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
                    candidateComments.push(comment);
                }
            }

            return candidateComments;
        }

        function analyzeText(candidate, spout) {

            var comments = parseDebate(candidate, debate15);
            for (var i = 0; i < comments.length; i++) {
                var req = {
                    method: 'POST',
                    url: 'http://127.0.0.1:3000/api/analysis',
                    data: {
                        text: comments[i]
                    }
                }
                $http(req)
                    .then(function (response) {
                        parseP5.handle(response, spout, candidate);
                    })
            }
        }

        return {
            analyze: function (candidate, spout) {
                return analyzeText(candidate, spout);
            },
        }

    };

}())