(function () {

    'use strict';

    angular
        .module('app')
        .factory('parse', parse);

    parse.$inject = []

    function parse($http, parse) {

        var entities = [];

        function handle(response) {
            console.log(response)
            response.data.entities.forEach(function (entity) {
                if (entity.sentiment.type === 'negative' || entity.sentiment.type === 'positive') {
                    entities.push({
                        label: entity.text,
                        size: createSize(entity.relevance),
                        color: createColor(entity.sentiment.type, entity.sentiment.score)
                    });
                }
            });
            console.log(entities)
        }

        function createSize(r) {
            if (r < 0.2) {
                return 1;
            } else if (r < 0.3) {
                return 2;
            } else if (r < 0.4) {
                return 3;
            } else if (r < 0.5) {
                return 4;
            } else if (r < 0.6) {
                return 1;
            } else if (r < 0.7) {
                return 2;
            } else if (r < 0.8) {
                return 3;
            } else if (r < 0.9) {
                return 4;
            } else {
                return 5;
            }
        }

        function createColor(type, score) {
            var numScore = Math.abs(parseFloat(score)).toFixed(2);
            if (type === 'negative') {
                return 'rgba(232,44,12,' + numScore + ')'
            } else {
                return 'rgba(27,181,27,' + numScore + ')'
            }

        }

        return {
            handle: function (text) {
                return handle(text);
            },
            entities: entities
        }

    };

}())