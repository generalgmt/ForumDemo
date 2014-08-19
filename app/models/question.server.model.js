'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var VoteSchema = new Schema({
	vote: {
		type: Number,
		default: 0,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Vote', VoteSchema);

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	comment: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	votes: {
		type: [VoteSchema],
		default: []
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
  
 exports.Comment = mongoose.model('Comment', CommentSchema);

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	question: {
		type: String,
		default: '',
		required: 'Please fill Question',
		trim: true
	},
	comments:[CommentSchema],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Question', QuestionSchema);


var MessageSchema = new Schema({
	message: {
		type: String,
		default: '',
		required: 'Please fill Question',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	vote: {
		type: Number,
		default: Date.now
	},
	
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Message', MessageSchema);


var ChatSchema = new Schema({
	nickname: {
		type: String,
		default: '',
		trim: true
	},
	messages:[MessageSchema],
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Chat', ChatSchema);
