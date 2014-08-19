'use strict';

// Questions controller
angular.module('questions').controller('QuestionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Questions', 'Comments', 'Votes', 'Vote_Downs',
		function($scope, $stateParams, $location, Authentication, Questions, Comments, Votes, Vote_Downs) {
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
			}
			else {
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
			var comment = new Comments ({
				questionId: this.question._id,
				comment: this.comment
			});
			$scope.question.comments.push({comment: this.comment, user: Authentication.user.displayName, created: Date.now()});
			comment.$save(function(response) {
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.comment_state = false;
		};

		$scope.remove_ans = function(comm) {
			var comment = new Comments({
                 questionId: $scope.question._id,
                _id: comm._id,                
           	});

     	   comment.$remove(function(response) { 
     	   for (var i in $scope.question.comments) {
           	if ($scope.question.comments[i] === comm) {
                 $scope.question.comments.splice(i, 1);
             }
           }
	        }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				});

        };

		
        var hasUserVoted = function(comment, signed_in_user){
        	for(var vote in comment.votes){
        		if(vote.user === signed_in_user){
        			return true;

        		}
        		
        	}
        	return false;
        };

		
    	$scope.create_vote = function(comment, value) {
    		var vote = new Votes ({
				questionId: $scope.question._id,
				commentId: comment._id,
				vote: value
			});
			vote.$save(function(response) {
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.vote = '';		
		};
		
		$scope.remove_vote = function( vote_param ) {
			 var vote = new Votes({
              questionId: $scope.question._id,
              commentId: vote_param._id,             
        	});
			console.log(vote);
			console.log(vote_param.splice(1,1));
			vote_param.splice(1,1).$save(function(response) {
				$scope.question = response;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.countVotes = function(comment) {
			var count = 0;
			for(var i = 0; i < comment.votes.length; i++){
				count = count + comment.votes[i].vote;
			}
			return count;
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