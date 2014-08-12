'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Question = mongoose.model('Question'),
	Comment = mongoose.model('Comment'),
	Vote = mongoose.model('Vote'),
	Vote_Down = mongoose.model('Vote_Down'),
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

/**
 * Update a vote
 */
exports.vote = function(req, res){
	var question = req.question;
	var comment = req.comment;
	var vote = new Vote(req.body);
	console.log('body');
	console.log(req.body);
	console.log('body end');
	vote.user = req.user;
	var hasvoted = false;
	console.log('old comment');
	console.log(comment);
	console.log('old  done');
	for(var i = 0; i < comment.votes.length; i++) {
        if (comment.votes[i].user.toString() === req.user._id.toString()) {
        	// comment.votes[i] = vote;
        	comment.votes.splice(i, 1);
        	console.log('should replace');
          	hasvoted = true;
           	break;
        }
    }
    //push the new vote into the comment
	comment.votes.push(vote);
	console.log('new comment');
	console.log(comment);
	console.log('new comment done');

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

exports.rem_vote = function(req, res){
	var question = req.question;
	var comment = req.comment;
	var vote = req.vote;
	console.log(vote);
	vote.remove();
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
	var question = req.question;
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
exports.list = function(req, res) { Question.find().sort('-created').populate('user', 'displayName').populate('comments.user', 'displayName').populate('votes.user', 'displayName').exec(function(err, questions) {
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
		Question.findById(id).populate('user', 'displayName').populate('comments.user', 'displayName').populate('votes.user', 'displayName').exec(function(err, question) {
		if (err) return next(err);
		if (! question) return next(new Error('Failed to load Question ' + id));
		req.question = question ;
		next();
	});
};

exports.answerByID = function(req, res, next, id) { 
	if(req.question){
		req.comment = req.question.comments.id(id);
		next();
	}
	else{
		return next(new Error('Failed to load Comment ' + id));
	}
};

exports.voteByID = function(req, res, next, id) { 
	if(req.comment){
		req.vote = req.comment.votes.id(id);
		next();
	}
	else{
		return next(new Error('Failed to load Comment ' + id));
	}
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
	if (req.comment.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};