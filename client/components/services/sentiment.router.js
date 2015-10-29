app.factory('alchemy', function ($http) {
    function analyzeText(text) {
            var req = {
                method: 'POST',
                url: 'http://localhost:3000/api/analysis',
                params: {
                    text: text
                }
            }
            console.log(req)

            $http(req)
                .then(function (response) {
                    this.analysis = response.data;
                })
    }

    return {
        analyze: function (text) {
            return analyzeText(text);
        }
    }
});