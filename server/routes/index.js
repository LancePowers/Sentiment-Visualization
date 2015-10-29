var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var config = require('../_config.js')

console.log(config.ALCHEMY_KEY);

router.get('/analysis', function (req, res) {
    request.post('http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities',        
                 {form: {
            apikey: config.ALCHEMY_KEY,
            sentiment: 1,
            text: req.body.text,
            outputMode: 'json'
        }},
    function (err, response) {
        res.send(response);
        console.log(response.body);
        console.log(err);
    })

})
module.exports = router;