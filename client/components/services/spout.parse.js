(function () {

    'use strict';

    angular
        .module('app')
        .factory('parseP5', parseP5);

    parseP5.$inject = []

    function parseP5() {

        var entities = [];
        var inProgress = false;
        var index = 0;
        var activeComment = {};

        function handle(response) {
            response.data.entities.forEach(function (entity) {
                if (entity.sentiment.type === 'negative' || entity.sentiment.type === 'positive') {
                    entities.push({
                        candidate: response.config.data.candidate,
                        word: entity.text,
                        color: createColor(entity.sentiment.type)
                    });
                }
            });
            if (!inProgress) {
                debateInit();
            }
        }

        function debateInit() {
            setInterval(function () {
                activeComment = entities[index];
                index++;
            }, 750);
            inProgress = true;
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
            handle: function (response) {
                return handle(response);
            },
            activeComment: function () {
                return activeComment
            }
        }

    };

}())