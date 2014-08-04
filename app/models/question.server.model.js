'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
  /**
 * Question Schema
 */
 exports.Comment = mongoose.model('Comment', CommentSchema);

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