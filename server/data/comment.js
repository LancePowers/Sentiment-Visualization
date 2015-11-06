var mongoose = require('mongoose-q')(require('mongoose'), {
    spread: true
});
var Schema = mongoose.Schema;
var Comment = new Schema({
    id: String,
    response: Object
})
module.exports = mongoose.model('comments', Comment)