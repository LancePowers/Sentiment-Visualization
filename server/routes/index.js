var express = require('express');
var router = express.Router();
var request = require('request');
//var config = require('../_config.js')



router.post('/analysis', function (req, res) {


    request.post('http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities', {
            form: {
                apikey: (process.env.KEY || config.ALCHEMY_KEY),
                sentiment: 1,
                text: req.body.text,
                outputMode: 'json'
            }
        },
        function (err, response) {
            res.send(response.body);
        })

})

module.exports = router;