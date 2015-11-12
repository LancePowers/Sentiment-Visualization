(function () {

    'use strict';

    angular
        .module('app')
        .factory('sentiment', sentiment);

    sentiment.$inject = ['$http', 'parseP5']

    function sentiment($http, parseP5) {

        function parseDebate(candidate, debate) {
            debate.replace(/./g, '. ');
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
            candidate = JSON.parse(candidate)
            var comments = parseDebate(candidate.name, debate15);


            for (var i = 0; i < comments.length; i++) {
                var id = candidate.name + i;
                var req = {
                    method: 'POST',
                    url: '/api/analysis',
                    data: {
                        id: id,
                        text: comments[i]
                    }
                }
                $http(req)
                    .then(function (response) {
                        console.log(response.config.data.id);
                        parseP5.handle(response, spout, candidate.name);
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