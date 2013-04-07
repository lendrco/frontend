define(['router'], function(router) {
	var initialize = function() {
	    window.location.hash = 'index';
	    window.LendrcoRouter = new router();
	    Backbone.history.start();
	};

	return {
	    initialize: initialize
        };
    });

