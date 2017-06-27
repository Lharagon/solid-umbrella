var controller = require('./../controllers/controller.js');
var path = require('path');

function authenticate(req,res,next){
	if(req.session.currentUserId){
		next();
	}else{
		res.sendStatus(401);
	}
}

module.exports = function(app) {
	app.post('/api/login', controller.login);
	app.use(authenticate);
	app.get('/api/getCurrent', controller.current);
	app.get('/api/getOut', controller.logout);
	app.post('/api/createPoll', controller.createPoll);
	app.get('/api/getPolls', controller.getPolls);
	app.get('/api/getPollsPage/:id', controller.pollPage);
	app.get('/api/increase/:id', controller.increase);
	app.get('/api/deletePoll/:id', controller.deleteT);
	


	app.all('*', (req, res, next) => {
	  res.sendFile(path.resolve('./surveyApp/dist/index.html'))
	})

}