'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var questions = require('../../app/controllers/questions');
	// Questions Routes
	app.route('/questions')
		.get(questions.list)
		.post(users.requiresLogin, questions.create);

	app.route('/questions/:questionId')
		.get(questions.read)
		.put(users.requiresLogin, questions.hasAuthorization, questions.update)
		.delete(users.requiresLogin, questions.hasAuthorization, questions.delete);

	app.route('/questions/:questionId/answers')
		.post(users.requiresLogin, questions.create_ans);

	app.route('/questions/:questionId/answers/:answerId')
		.put(users.requiresLogin, questions.hasAuthorization_ans, questions.update_ans)
		.delete(users.requiresLogin, questions.hasAuthorization_ans, questions.delete_ans);

	// app.route('/questions/:questionId/vote')
	// 		.put(users.requiresLogin, question.hasvoted, questions.update_vote)
	
	// app.route('/questions/:questionId/rem_vote')
	// 	.put(users.requiresLogin, question.hasvoted, questions.remove_vote)
	

	// app.route('/questions/:questionId/answers/:answersId/vote')
	//	.put(users.requiresLogin, question.hasvoted, questions.update_vote)
	
	// app.route('/questions/:questionId/answers/:answersId/rem_vote')
	// 	.put(users.requiresLogin, question.hasvoted, questions.remove_vote)
	
	// Finish by binding the Question middleware
	app.param('questionId', questions.questionByID);

	app.param('answerId', questions.answerByID);
};