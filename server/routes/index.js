var express = require('express');
var router = express.Router();
var request = require('request');
//var config = require('../_config.js');
var mongoose = require('mongoose-q')(require('mongoose'), {
    spread: true
});
var Comment = require('../data/comment.js');




router.post('/analysis', function (req, res) {
    Comment.findQ({
            id: req.body.id
        })
        .then(function (result, error) {
            if (result.length) {
                console.log(result)
                res.send(result[0].response);
            } else {
                request.post('http://access.alchemyapi.com/calls/text/TextGetRankedNamedEntities', {
                        form: {
                            apikey: (process.env.KEY || config.ALCHEMY_KEY),
                            sentiment: 1,
                            text: req.body.text,
                            outputMode: 'json'
                        }
                    },
                    function (err, response) {
                        console.log(response);
                        new Comment({
                            id: req.body.id,
                            response: response.body
                        }).save();

                        res.send(response.body);
                    })
            }
            console.log('here')
        })
        .done()
})

module.exports = router;