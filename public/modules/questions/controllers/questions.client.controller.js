'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions', 'Answers',
	function($scope, $stateParams, $location, Authentication, Questions, Answers) {
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