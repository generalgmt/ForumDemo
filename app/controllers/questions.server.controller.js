'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Question = mongoose.model('Question'),
	Comment = mongoose.model('Comment'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Question already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Question
 */
exports.create = function(req, res) {
	var question = new Question(req.body);
	question.user = req.user;
	question.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

exports.create_ans = function(req, res) {
	var question =req.question;
	var comment = new Comment(req.body);
	comment.user = req.user;
	comment.user.displayName = req.user.displayName;
	question.comments.push(comment);
	question.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

/**
 * Show the current Question
 */
exports.read = function(req, res) {
	res.jsonp(req.question);
};

/**
 * Update a Question
 */
exports.update = function(req, res) {
	var question = req.question ;

	question = _.extend(question , req.body);

	question.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

exports.update_ans = function(req, res) {
	var question = req.question;
	var comment = req.comment;
	  comment = _.extend(comment , req.body);
	  console.log(comment);
	  question.save(function(err) {
	 	if (err) {
	 		return res.send(400, {
	 			message: getErrorMessage(err)
	 		});
	 	} else {
	 		res.jsonp(question);
	 	}
	 });
};


/**
 * Delete an Question
 */
exports.delete = function(req, res) {
	var question = req.question ;

	question.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(question);
		}
	});
};

exports.delete_ans = function(req, res) {
	var question = req.question;
	var comment = req.comment;
	console.log(comment);
    comment.remove();
    question.save(function(err){
    	if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
    	}
    	else{
    		res.jsonp(question);
    	}

    });

};

/**
 * List of Questions
 */
exports.list = function(req, res) { Question.find().sort('-created').populate('user', 'displayName').exec(function(err, questions) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(questions);
		}
	});
};

/**
 * Question middleware
 */
exports.questionByID = function(req, res, next, id) {
		Question.findById(id).populate('user', 'displayName').exec(function(err, question) {
		if (err) return next(err);
		if (! question) return next(new Error('Failed to load Question ' + id));
		req.question = question ;
		next();
	});
};

exports.answerByID = function(req, res, next, id) { 
	req.comment = req.question.comments.id(id);
	next();
};
/**
 * Question authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.question.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};

exports.hasAuthorization_ans = function(req, res, next) {
	if (req.comment.user.toString() !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};