var mongoose = require('mongoose');
var Schema = mongoose.Schema


var PollSchema = new mongoose.Schema( {
	question: {type: String, required: true, minlength: 8},
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	options: [{type: Schema.Types.ObjectId, ref: 'Option'}]
	}, { timestamps: true })

mongoose.model('Poll', PollSchema);