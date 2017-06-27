var mongoose = require('mongoose');
var Schema = mongoose.Schema

var OptionSchema = new mongoose.Schema({ 
	option: {type: String, required: true, minlength: 3},
	_poll: {type: Schema.Types.ObjectId, ref: 'Poll'},
	vote: {type: Number, default:0}
})

mongoose.model('Option', OptionSchema);