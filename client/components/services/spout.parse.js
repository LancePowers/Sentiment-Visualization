(function () {

    'use strict';

    angular
        .module('app')
        .factory('parseP5', parseP5);

    parseP5.$inject = []

    function parseP5() {

        var entities = [];

        function handle(response, spout, candidate) {
            console.log(response.data)
            response.data.entities.forEach(function (entity) {
                if (entity.sentiment.type === 'negative' || entity.sentiment.type === 'positive') {
                    entities.push({
                        candidate: candidate,
                        label: entity.text,
                        color: createColor(entity.sentiment.type)
                    });
                }
            });
            spout.setEntities(entities);
        }

        function createColor(type) {
            if (type === 'negative') {
                return {
                    r: 232,
                    g: 44,
                    b: 12
                }
            } else {
                return {
                    r: 27,
                    g: 181,
                    b: 27
                }
            }

        }

        return {
            handle: function (response, spout, candidate) {
                return handle(response, spout, candidate);
            },
            entities: entities
        }

    };

}())