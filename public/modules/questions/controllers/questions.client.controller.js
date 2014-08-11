'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions', 'Answers', 'Votes', 'Vote_Downs',
		function($scope, $stateParams, $location, Authentication, Questions, Answers, Votes, Vote_Downs) {
		$scope.authentication = Authentication;
		$scope.comment_state = false;
		$scope.hasvoted = false;
		$scope.notvoted = false;
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

		$scope.update = function() {
			var question = $scope.question ;

			question.$update(function() {
				$location.path('questions/' + question._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.create_ans = function() {
			// Create new Answer object
			var comment = new Answers ({
				questionId: $scope.question._id,
				comment: $scope.comment
			});
			comment.$save(function(response) {
				// $location.path('questions/' + response._id);
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			$scope.comment_state = false;
		};

		$scope.remove_ans = function(comm) {
			var answer = new Answers({
                 questionId: $scope.question._id,
                _id: comm._id,                
           	});

     	   answer.$remove(function(response) { 
        	console.log(response);
           for (var i in $scope.question.comments) {
             if ($scope.question.comments[i] === comm) {
                 $scope.question.comments.splice(i, 1);
             }
           }
         }, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});

        };

		
        	$scope.create_vote = function(con) {
        	for(var q in $scope.question.user){	
	        	if ($scope.question.user[q] !== $scope.vote.user) {
					var vote = new Votes ({
						questionId: $scope.question._id,
						answerId: con._id,
						vote: $scope.vote = 1 
					});
					 console.log(vote);
					vote.$save(function(response) {
						// $location.path('questions/' + response._id);
						$scope.question = response;
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
					$scope.hasvoted = true;
					$scope.notvoted = false;
				}
				else{
					console.log('has voted');
				}
			}
			// Clear form fields		
		};

			$scope.creat_vote = function(con) {
        		// console.log('votes');
			var vote_down = new Vote_Downs ({
				questionId: $scope.question._id,
				answerId: con._id,
				vote: $scope.vote = 1 
			});
			 console.log(vote_down);
			vote_down.$save(function(response) {
				// $location.path('questions/' + response._id);
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields		
		};
		
		$scope.remove_vote = function( vote_param ) {
				console.log('remove');
				 var vote = new Votes({
                  questionId: $scope.question._id,
                  answerId: vote_param._id,             
            	});
				 console.log(vote);
				 console.log(vote_param.splice(1,1));
			vote_param.splice(1,1).$save(function(response) {
				// $location.path('questions/' + response._id);
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		// Update existing Question
		
		
		
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