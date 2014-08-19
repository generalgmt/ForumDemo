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
		.put(users.requiresLogin, questions.update)
		.delete(users.requiresLogin, questions.hasAuthorization, questions.delete);

	app.route('/questions/:questionId/comments')
		.post(users.requiresLogin, questions.create_ans);

	app.route('/questions/:questionId/comments/:commentId')
		.put(users.requiresLogin, questions.hasAuthorization_ans, questions.update_ans)
		.delete(users.requiresLogin, questions.hasAuthorization_ans, questions.delete_ans);

	app.route('/questions/:questionId/comments/:commentId/votes')
		.post(users.requiresLogin, questions.vote);
	
	app.route('/questions/:questionId/comments/:commentId/votes/:voteId')
		.delete(users.requiresLogin, questions.rem_vote);
	
	// Finish by binding the Question middleware
	app.param('questionId', questions.questionByID);

	app.param('commentId', questions.commentByID);

	app.param('voteId', questions.voteByID);
};