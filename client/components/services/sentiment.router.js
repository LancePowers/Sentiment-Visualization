(function () {

    'use strict';

    angular
        .module('app')
        .factory('sentiment', sentiment);

    sentiment.$inject = ['$http', 'parseP5']

    function sentiment($http, parseP5) {

        var candidates = ['O’MALLEY', 'CLINTON', 'WEBB', 'SANDERS', 'CHAFEE']

        function parseDebate(debate) {
            var entities = [];
            var comments = debate.split('\n');
            for (var i = 0; i < comments.length; i++) {
                candidates.forEach(function (candidate) {
                    if (comments[i].indexOf(candidate) !== -1) {
                        var text = comments[i].slice(comments[i].indexOf(candidate) + (candidate.length), comments[i].length);
                        entities.push({
                            position: i,
                            text: text,
                            candidate: candidate
                        })
                    }
                })
            }
            return entities;
        }

        function analyzeText() {
            var comments = parseDebate(debate15);
            console.log(comments)
            for (var i = 0; i < comments.length; i++) {
                var req = {
                    method: 'POST',
                    url: '/api/analysis',
                    data: comments[i]
                }
                $http(req)
                    .then(function (response) {
                        parseP5.handle(response);
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