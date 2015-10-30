var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var config = require('../_config.js')

console.log(config.ALCHEMY_KEY);

router.post('/analysis', function (req, res) {
    console.log(req.body.text)

    request.post('http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities', {
            form: {
                apikey: config.ALCHEMY_KEY,
                sentiment: 1,
                text: req.body.text,
                outputMode: 'json'
            }
        },
        function (err, response) {
            res.send(response);
        })

})

module.exports = router;