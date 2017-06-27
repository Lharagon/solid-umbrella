var mongoose = require('mongoose');
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');
var Option = mongoose.model('Option');

module.exports = {
	login: function(req, res) {
		console.log('came into controller.login server')
		User.findOne(req.body, function(err, userFound) {
			if (userFound == null) {
				var newUser = new User(req.body);
				newUser.save(function(err, newUse) {
					if(err) {
						console.log(err);
					} else {
						req.session.currentUserId = newUse._id;
						console.log('new user was created')
						res.json(newUse)
					}
				})
			} else {
				req.session.currentUserId = userFound._id;
				console.log('existing user was loaded! ', userFound.name)
				res.json(userFound);
			}
		})
	},
	current: function(req, res) {
		User.findOne({_id: req.session.currentUserId}, function(err, currents) {
			if(err) {
				console.log('Error while getting current User ', err)
			} else {
				res.json(currents)
			}
		})
	},
	logout: function(req, res) {
		req.session.destroy();
		res.json({code: 'good'});
	},
	createPoll: function (req, res) {
		console.log(req.body.question)
		console.log(req.body.options)
		User.findOne({_id: req.session.currentUserId}, function(err, currentUser) {
			if (err) {
				console.log('Trouble finding current User')
			} else {
				for(var i = 0 ; i < 4; i++) {
					console.log('came into the loop')
					if (req.body.options[i].option.length < 3 || req.body.question.length < 8) {
						res.json({error: "Everything is required, question must me at least 8 characters, and options a min of 3."})
						return
					} else {
						console.log('Not Happening')
					}
				}
				console.log('hopped over the loop')
				var newPoll = new Poll({question: req.body.question, _user: currentUser._id});
				newPoll.save(function(err, thisPoll) {
					if(err) {
						console.log('error saving poll')
					} else {
						var option1 = new Option({option: req.body.options[0].option, _poll: thisPoll._id, });
						option1.save(function(err) {
							thisPoll.options.push(option1);
							thisPoll.save(function(err) {
								if (err) {
									res.json(err);
								} else { 
									var option2 = new Option({option: req.body.options[1].option, _poll: thisPoll._id, });
									option2.save(function(err) {
										thisPoll.options.push(option2);
										thisPoll.save(function(err) {
											if (err) {
												res.json(err);
											} else { 
												var option3 = new Option({option: req.body.options[2].option, _poll: thisPoll._id, });
												option3.save(function(err) {
													thisPoll.options.push(option3);
													thisPoll.save(function(err) {
														if (err) {
															res.json(err);
														} else { 
															var option4 = new Option({option: req.body.options[3].option, _poll: thisPoll._id, });
															option4.save(function(err) {
																thisPoll.options.push(option4);
																thisPoll.save(function(err) {
																	if (err) {
																		res.json(err);
																	} else { 
																		thisPoll._user = req.session.currentUserId;
																		thisPoll.save(function(err, brandNew) {
																			if(err) {
																				console.log('error pushing');
																			} else {
																				res.json(brandNew);
																			}
																		})
																	}
																})
															})	
														}	
													})
												})
											}
										})
									})
								}
							})
						})		
					}
				})
			}
		})			
										
												
						
						
						
						
					
	},
	getPolls: function(req, res) {

		Poll.find({}).populate('options').populate('_user').exec(function (err, pollList) {
			if (err) {
				console.log('error grabbing the polls in server')
			} else {
				res.json(pollList)
			}
		})
	},
	pollPage: function (req, res) {
		console.log(req.params.id)
		Poll.findOne({_id: req.params.id}).populate('options').populate('_user').exec( function (err, theOne) {
			if(err) {
				console.log(err);
			} else {
				res.json(theOne);
			}
		})
	},
	increase: function(req, res) {
		Option.findOne({_id: req.params.id}, function (err, option) {
			console.log(option.vote)
			option.vote += 1;
			option.save(function(err) {
				if (err) {
					console.log(err)
				} else {
					res.json(option)
				}
			})
		})
	},
	deleteT: function (req, res) {
		console.log('comes into deleteT server', req.params)
		Poll.remove({_id: req.params.id}, function(err) {
			if(err) {
				console.log('Error while deleting Err thing')
			} else {
				res.json({code: 'good'});
			}
		})
	}
	

}