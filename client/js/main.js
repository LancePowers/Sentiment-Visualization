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

app.factory('alchemy', function ($http) {


    function a(candidate) {
        for (var i = 0; i < candidate.responses.length; i++) {
            console.log(candidate);
            var req = {
                method: 'GET',
                url: 'http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities',
                params: {
                    apikey: "9091af0333d153485f16109521984d39b19ba7ac",
                    sentiment: 1,
                    text: candidate.responses[i].text,
                    outputMode: 'json'
                }
            }
            console.log(req)

            $http(req)
                .then(function (response) {
                    this.analysis = response.data;
                    console.log(this);
                }.bind(this), function (response) {
                    console.log(self);
                    console.log({
                        'ERROR': response
                    });
                })
        }
    }

    return {
        alchemy: function (candidate) {
            return a(candidate);
        }
    }
});

http://localhost:3000/api/analysis