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


//comments service used to communicate Questions REST endpoints
angular.module('questions').factory('Comments', ['$resource',
	function($resource) {
		return $resource('questions/:questionId/comments/:id', { questionId: '@questionId', id: '@_id'
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
		return $resource('questions/:questionId/comments/:commentId/votes/:id', { questionId: '@questionId', commentId: '@commentId', id:'@_id'
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
		return $resource('questions/:questionId/comments/:commentId/vote_downs/:id', { questionId: '@questionId', commentId: '@commentId', id:'@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
