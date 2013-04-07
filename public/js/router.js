define([
	'models/GlobalContext',
	'views/homepage/HeaderView',
	'views/homepage/HomeView',
	'utils/RegionManager',
	'utils/Formatter',
	'utils/HttpUtil'],
       function( GlobalContext, // context for all global value and status
		 HeaderView, 
		 HomeView, 
		 RegionManager, 
		 Formatter,
		 HttpUtil) 
       {
	   var router = Backbone.Router.extend({
	       context: null,
	       routes: {
		   "" : "index",
		   "index": "index",
	       },

	       initialize: function () 
	       {
		   this.context = new GlobalContext();
	       },

	       index: function() 
	       {
		   if(typeof this.headerView != "undefined"){
		       this.headerView.close();
		   }
		   this.headerView = new HeaderView({model:this.context});
		   $('.header').html(this.headerView.render().el);
		   var view = new HomeView({model:this.context});
		   RegionManager.show(view);
	       }

	   });

	   return router;
       });