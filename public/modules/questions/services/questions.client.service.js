'use strict';

//Questions service used to communicate Questions REST endpoints
angular.module('questions').factory('Questions', ['$resource',
	function($resource) {
		return $resource('questions/:questionId', { questionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


//Answers service used to communicate Questions REST endpoints
angular.module('questions').factory('Answers', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/answers/:answerId', { questionId: '@questionId', answersId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Answers service used to communicate Questions REST endpoints
angular.module('questions').factory('Votes', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/answers/:answerId/vote/:voteId', { questionId: '@questionId', answersId: '@answerid', vote: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
