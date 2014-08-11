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


//answers service used to communicate Questions REST endpoints
angular.module('questions').factory('Answers', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/answers/:answerId', { questionId: '@questionId', answerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//votes service used to communicate Questions REST endpoints
angular.module('questions').factory('Votes', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/answers/:answerId/votes/:id', { questionId: '@questionId', answerId: '@answerId', id:'@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
//votes service used to communicate Questions REST endpoints
angular.module('questions').factory('Vote_Downs', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/answers/:answerId/vote_downs/:id', { questionId: '@questionId', answerId: '@answerId', id:'@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
