var mongoose = require('mongoose');
var Schema = mongoose.Schema


var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
 });
mongoose.model('User', UserSchema);


