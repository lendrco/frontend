require.config({
	paths: {
	    jQuery: '/js/libs/jquery-1.8.2',
		Underscore: '/js/libs/underscore-1.4.2',
		Backbone: '/js/libs/backbone-0.9.2',
		text: '/js/libs/text',
		templates: '../templates'
		},

	    shim: {
	    jQuery: {
		exports: '$'
	    },
  	    Underscore: {
		exports: '_'
		    },
		'Backbone':{
		    deps: ['Underscore', 'jQuery'],
			exports: 'Backbone'
			},
		'Lendrco': ['Backbone', 'Underscore']
		}
    });

require(['Lendrco'], function(Lendrco) {
	Lendrco.initialize();
    });