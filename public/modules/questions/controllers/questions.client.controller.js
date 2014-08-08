'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions', 'Answers', 'Votes',
	function($scope, $stateParams, $location, Authentication, Questions, Answers, Votes) {
		$scope.authentication = Authentication;
		$scope.comment_state = false;
		// Create new Question
		$scope.create = function() {
			// Create new Question object
			var question = new Questions ({
				question: this.question
			});

			// Redirect after save
			question.$save(function(response) {
				$location.path('questions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.question = '';
		};
		$scope.create_ans = function() {
			// Create new Question object
			var comment = new Answers ({
				questionId: this.question._id,
				comment: this.comment
			});
			this.question.comments.push({comment: this.comment, user: Authentication.user.displayName, created: Date.now()});
			// Redirect after save
			comment.$save(function(response) {
				// $location.path('questions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.comment = '';
		};

			$scope.create_vote = function() {
			// Create new Question object
			var vote = new Votes ({
				questionId: this.question._id,
				answerId: this.answer._Id,
				vote: this.vote
			});
			this.comment.votes.push({vote: this.vote, user: Authentication.user.displayName, created: Date.now()});
			// Redirect after save
			vote.$save(function(response) {
				// $location.path('questions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.vote = '';
		};
		// Remove existing Question
		$scope.remove = function( question ) {
			if ( question ) { question.$remove();

				for (var i in $scope.questions ) {
					if ($scope.questions [i] === question ) {
						$scope.questions.splice(i, 1);
					}
				}
			} else {
				$scope.question.$remove(function() {
					$location.path('questions');
				});
			}
		};
				$scope.remove_ans = function( question ) {
			if ( question ) { comment.$remove();

				for (var i in $scope.comments ) {
					if ($scope.comments [i] === comment ) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comments.$remove(function() {
					$location.path('questions');
				});
			}
		};

				$scope.remove_vote = function( question ) {
			if ( vote ) { vote.$remove();

				for (var i in $scope.comments ) {
					if ($scope.votes [i] === question ) {
						$scope.votes.splice(i, 1);
					}
				}
			} else {
				$scope.vote.$remove(function() {
					$location.path('questions');
				});
			}
		};

		// Update existing Question
		$scope.update = function() {
			var question = $scope.question ;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Questions
		$scope.find = function() {
			$scope.questions = Questions.query();
		};

		// Find existing Question
		$scope.findOne = function() {
			$scope.question = Questions.get({ 
				questionId: $stateParams.questionId
			});
		};
		 $scope.show_comment = function(){
        $scope.comment_state = $scope.comment_state === false ? true: false;
      };
	}
]);