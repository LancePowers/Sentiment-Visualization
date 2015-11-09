(function () {

    'use strict';

    angular
        .module('app')
        .factory('sentiment', sentiment);

    sentiment.$inject = ['$http', 'parse', 'parseP5']

    function sentiment($http, parse, parseP5) {

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
            var index = 0;
            setInterval(function () {
                for (var i = index; i < index + 10; i++) {
                    var id = candidate.name + i;
                    var req = {
                        method: 'POST',
                        url: 'https://spout-about.herokuapp.com/api/analysis',
                        data: {
                            id: id,
                            text: comments[i]
                        }
                    }
                    index++;
                    $http(req)
                        .then(function (response) {
                            parseP5.handle(response, spout, candidate.name);
                        })
                }
            }, 2000)
        }

        return {
            analyze: function (candidate, spout) {
                return analyzeText(candidate, spout);
            },
        }

    };

}())